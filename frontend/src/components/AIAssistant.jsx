import React, { useState, useRef, useEffect } from 'react';
import { chatAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function AIAssistant({ currentItinerary, onModifyItinerary }) {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Welcome to Lumina! ✈️ I am your real-time travel agent. You can ask me to modify your current itinerary on the fly! Try typing: "make it luxury" or "switch to eco-zen" or tap one of the quick suggestions below.'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Hide the initial speech bubble after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpeechBubble(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    try {
      // Use real backend AI endpoint for both registered and guest users
      const res = await chatAPI.sendMessage(text, currentItinerary);
      const { response: responseText, modifications } = res.data;

      setIsTyping(false);
      
      // If guest user, append a helpful tip occasionally
      let displayResponse = responseText;
      if (!isAuthenticated && Math.random() < 0.4) {
        displayResponse += "\n\n💡 Tip: Sign in to save this modified itinerary to your account!";
      }
      
      setMessages(prev => [...prev, { sender: 'ai', text: displayResponse }]);

      if (modifications && Object.keys(modifications).length > 0 && onModifyItinerary) {
        onModifyItinerary(modifications);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: "I'm having trouble connecting right now. Please try again in a moment."
      }]);
    }
  };

  const quickSuggestions = [
    { text: '🌿 Make it Eco-Zen', prompt: 'switch to sustainable eco-zen vibe' },
    { text: '✨ Upgrade to Luxury', prompt: 'upgrade to premium luxury settings' },
    { text: '📉 Reduce Budget', prompt: 'make it budget friendly' },
  ];

  return (
    <div className="fixed bottom-margin-mobile md:bottom-margin-page right-margin-mobile md:right-margin-page z-[60] flex flex-col items-end gap-3 font-body-md">
      {/* Speech Bubble Helper */}
      {showSpeechBubble && !isOpen && (
        <div className="glass-card px-6 py-4 rounded-[24px] shadow-xl border border-white/40 max-w-[240px] animate-ai-pulse relative mr-2">
          <p className="text-sm font-medium text-on-surface">How can I help you plan your next trip?</p>
          {/* Close tiny button */}
          <button 
            onClick={(e) => { e.stopPropagation(); setShowSpeechBubble(false); }}
            className="absolute top-1 right-2 text-on-surface-variant/50 hover:text-on-surface text-[10px]"
          >
            ×
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => {
          setIsOpen(!isOpen);
          setShowSpeechBubble(false);
        }}
        className={`w-16 h-16 rounded-full bg-primary shadow-lg flex items-center justify-center text-on-primary transition-all duration-300 hover:scale-110 active:scale-95 group ${
          isOpen ? 'rotate-90 bg-deep-void' : ''
        }`}
      >
        <span className="material-symbols-outlined text-[32px] flex items-center justify-center">
          {isOpen ? 'close' : 'smart_toy'}
        </span>
      </button>

      {/* Chat Drawer */}
      {isOpen && (
        <div className="glass-card w-[90vw] sm:w-[400px] h-[500px] rounded-[30px] shadow-2xl border border-white/30 flex flex-col overflow-hidden animate-[slideUp_0.3s_ease-out] mb-2 mr-2">
          {/* Header */}
          <div className="bg-primary p-4 text-on-primary flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[28px] bg-white/20 p-1.5 rounded-full">smart_toy</span>
              <div>
                <h4 className="font-bold text-sm leading-tight">Lumina Assistant</h4>
                <span className="text-[10px] text-primary-fixed/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  Online Travel Agent
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-on-primary/80 hover:text-on-primary p-1"
            >
              <span className="material-symbols-outlined">expand_more</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-container-low/30 scrollbar-thin">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`flex gap-2 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                {msg.sender === 'ai' && (
                  <span className="material-symbols-outlined text-[18px] text-primary bg-primary/10 p-1.5 rounded-full self-start shrink-0 flex items-center justify-center">
                    smart_toy
                  </span>
                )}
                <div className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-primary text-on-primary rounded-tr-none'
                    : 'bg-white/80 dark:bg-deep-void/60 text-on-surface border border-outline-variant/15 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* AI Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2 max-w-[80%]">
                <span className="material-symbols-outlined text-[18px] text-primary bg-primary/10 p-1.5 rounded-full self-start shrink-0 flex items-center justify-center animate-pulse">
                  smart_toy
                </span>
                <div className="bg-white/80 dark:bg-deep-void/60 text-on-surface border border-outline-variant/15 p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="p-3 border-t border-outline-variant/15 bg-white/30 dark:bg-deep-void/25 flex gap-2 overflow-x-auto scrollbar-none">
            {quickSuggestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(item.prompt)}
                className="px-3.5 py-1.5 bg-surface-container border border-outline-variant/40 hover:bg-surface-container-high transition-colors rounded-full text-xs font-semibold text-on-surface whitespace-nowrap"
              >
                {item.text}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-outline-variant/15 bg-white/80 dark:bg-deep-void/50 flex gap-2 items-center">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask AI to modify details..."
              className="flex-1 bg-surface-container-low border border-outline-variant/30 px-4 py-2.5 rounded-full text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary/45"
            />
            <button 
              onClick={() => handleSend()}
              className="w-10 h-10 rounded-full bg-primary hover:bg-primary/95 text-on-primary flex items-center justify-center shrink-0 active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px] flex items-center justify-center">send</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
