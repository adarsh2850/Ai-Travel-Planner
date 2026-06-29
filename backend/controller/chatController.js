import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Reads from backend/.env
});

export const processMessage = async (req, res) => {
  try {
    const { message, currentItinerary } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const systemPrompt = `
You are an intelligent AI Travel Planner.

Your responsibilities:
- Answer all travel-related questions.
- Modify travel itineraries.
- Suggest destinations.
- Recommend hotels, restaurants, attractions and transportation.
- Optimize budget.
- Suggest luxury or budget options.
- Recommend activities.
- Keep responses short, professional and helpful.

Current Itinerary:
${JSON.stringify(currentItinerary || {}, null, 2)}

You MUST output your response in JSON format containing exactly these two keys:
1. "response": Your natural, conversational, and helpful text response to the user.
2. "modifications": If the user is requesting a change/modification to their current itinerary parameters, set this to an object with any changes. The keys can be:
   - "destination": string (new destination name, e.g. "Paris", "Tokyo", "London")
   - "duration": number (number of days, e.g. 5)
   - "vibe": string ("Eco-Zen", "Modern Luxury", "Vibrant Culture", or "Adventure & Sport")
   - "budget": string ("Economy", "Balanced", or "Premium")
   If no modifications are requested (e.g. they are just asking a general travel question, or chatting), set "modifications" to null or an empty object.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 700,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const responseText = completion.choices[0].message.content;
    let parsedResponse = { response: responseText, modifications: null };
    try {
      parsedResponse = JSON.parse(responseText);
    } catch (err) {
      console.error("Failed to parse JSON response from LLM:", err);
      // Fallback
      parsedResponse = { response: responseText, modifications: null };
    }

    res.status(200).json({
      success: true,
      response: parsedResponse.response || responseText,
      modifications: parsedResponse.modifications || null,
    });
  } catch (error) {
    console.error("Groq Error: Falling back to local rules engine. Error details:", error.message || error);
    
    let localResponseText = null;
    let localModifications = null;
    const lowerMsg = message.toLowerCase();
    
    const destMatch = lowerMsg.match(/(?:change|set|to|go to) (goa|jaipur|munnar|agra|delhi|mumbai|manali|ladakh)/i);
    const durMatch = lowerMsg.match(/(?:duration|days|days to|stay for) (\d+)/i);
    const vibeMatch = lowerMsg.match(/(?:vibe|style|theme) (eco-zen|modern luxury|vibrant culture|adventure & sport)/i);
    const budgetMatch = lowerMsg.match(/(?:budget|tier) (economy|balanced|premium)/i);

    if (destMatch || durMatch || vibeMatch || budgetMatch) {
      localModifications = {};
      let changesText = [];
      
      if (destMatch) {
        const dName = destMatch[1].charAt(0).toUpperCase() + destMatch[1].slice(1).toLowerCase();
        localModifications.destination = dName;
        changesText.push(`destination to ${dName}`);
      }
      if (durMatch) {
        const daysVal = parseInt(durMatch[1], 10);
        if (daysVal >= 1 && daysVal <= 30) {
          localModifications.duration = daysVal;
          changesText.push(`duration to ${daysVal} days`);
        }
      }
      if (vibeMatch) {
        let vName = vibeMatch[1].split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        if (vName.toLowerCase() === 'eco-zen') vName = 'Eco-Zen';
        localModifications.vibe = vName;
        changesText.push(`vibe to ${vName}`);
      }
      if (budgetMatch) {
        const bName = budgetMatch[1].charAt(0).toUpperCase() + budgetMatch[1].slice(1).toLowerCase();
        localModifications.budget = bName;
        changesText.push(`budget to ${bName}`);
      }
      
      localResponseText = `I have updated your itinerary parameters: set ${changesText.join(', ')}.`;
    } else {
      if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
        localResponseText = "Hello! I am your AI Travel Assistant. How can I help you customize your trip to Indian destinations?";
      } else {
        localResponseText = "I've received your query! You can ask me to change the destination, duration, vibe, or budget (e.g. 'change duration to 5 days' or 'vibe to Modern Luxury').";
      }
    }

    res.status(200).json({
      success: true,
      response: localResponseText,
      modifications: localModifications,
      fallback: true
    });
  }
};