const LOCAL_INDIAN_IMAGES = {
  'agra': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1080&q=80',
  'taj mahal': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1080&q=80',
  'goa': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&q=80',
  'jaipur': 'https://images.unsplash.com/photo-1477584308802-e9c3788ee417?w=1080&q=80',
  'munnar': 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1080&q=80',
  'kerala': 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1080&q=80',
  'ladakh': 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1080&q=80',
  'leh': 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1080&q=80',
  'manali': 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1080&q=80',
  'udaipur': 'https://images.unsplash.com/photo-1595867818082-083862f3d630?w=1080&q=80',
  'varanasi': 'https://images.unsplash.com/photo-1561361062-798283e8e5da?w=1080&q=80',
  'mumbai': 'https://images.unsplash.com/photo-1562979314-bee7453e911c?w=1080&q=80',
  'delhi': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1080&q=80',
  'bangalore': 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1080&q=80',
  'bengaluru': 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1080&q=80',
  'srinagar': 'https://images.unsplash.com/photo-1566228015668-4c45dbc4e2db?w=1080&q=80',
  'kashmir': 'https://images.unsplash.com/photo-1566228015668-4c45dbc4e2db?w=1080&q=80',
  'rishikesh': 'https://images.unsplash.com/photo-1598977123418-45f04b615aa9?w=1080&q=80',
  'shimla': 'https://images.unsplash.com/photo-1589920392305-64d50c26aa75?w=1080&q=80',
  'hampi': 'https://images.unsplash.com/photo-1600100397990-a472097728a4?w=1080&q=80',
  'darjeeling': 'https://images.unsplash.com/photo-1557002666-61a8828a2a72?w=1080&q=80',
  'ooty': 'https://images.unsplash.com/photo-1590483861273-dbec96ff537a?w=1080&q=80',
  'pondicherry': 'https://images.unsplash.com/photo-1581362072978-24996dee7e91?w=1080&q=80',
  'puducherry': 'https://images.unsplash.com/photo-1581362072978-24996dee7e91?w=1080&q=80',
  'amritsar': 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=1080&q=80',
  'golden temple': 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=1080&q=80',
  'kolkata': 'https://images.unsplash.com/photo-1558431382-27e303142255?w=1080&q=80',
  'hyderabad': 'https://images.unsplash.com/photo-1605007493699-af65834f8a00?w=1080&q=80',
  'chennai': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1080&q=80'
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1080&q=80';

// Refinement engine to simplify query terms if specific hotel or activity names return 0 matches
const getFallbackQuery = (q) => {
  const lower = q.toLowerCase();
  
  if (
    lower.includes('hotel') || 
    lower.includes('resort') || 
    lower.includes('homestay') || 
    lower.includes('hostel') || 
    lower.includes('villa') || 
    lower.includes('palace') || 
    lower.includes('inn') || 
    lower.includes('house') || 
    lower.includes('stay') ||
    lower.includes('haveli')
  ) {
    if (
      lower.includes('palace') || 
      lower.includes('haveli') || 
      lower.includes('heritage') || 
      lower.includes('house') || 
      lower.includes('shahpura') || 
      lower.includes('alsisar') || 
      lower.includes('samode') || 
      lower.includes('rambagh') ||
      lower.includes('amarvilas')
    ) {
      return 'heritage hotel india';
    }
    if (lower.includes('resort') || lower.includes('retreat') || lower.includes('plantation')) {
      return 'luxury resort india';
    }
    if (lower.includes('hostel') || lower.includes('camp') || lower.includes('backpack')) {
      return 'hostel room';
    }
    return 'boutique hotel room';
  }
  
  if (lower.includes('walk') || lower.includes('trek') || lower.includes('forest') || lower.includes('reserve')) {
    return 'forest path';
  }
  if (lower.includes('boat') || lower.includes('kayak') || lower.includes('river') || lower.includes('lake')) {
    return 'boat lake';
  }
  if (lower.includes('cycle') || lower.includes('cycling') || lower.includes('bike')) {
    return 'cycling trail';
  }
  if (lower.includes('dinner') || lower.includes('lunch') || lower.includes('feast') || lower.includes('food')) {
    return 'indian restaurant';
  }

  if (lower.includes(',')) {
    const parts = lower.split(',');
    return parts[parts.length - 1].trim();
  }

  return 'india travel';
};

export const getDestinationImage = async (req, res) => {
  try {
    const query = req.query.query || req.query.destination;

    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Query parameter is required',
      });
    }

    const trimmedQuery = query.trim().toLowerCase();

    // 1. Try Unsplash Official API if Access Key is configured
    if (process.env.UNSPLASH_ACCESS_KEY) {
      try {
        let response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            trimmedQuery
          )}&client_id=${process.env.UNSPLASH_ACCESS_KEY}&per_page=1&orientation=landscape`
        );
        if (response.ok) {
          let data = await response.json();
          let results = data.results || [];
          if (results.length > 0) {
            return res.status(200).json({
              success: true,
              url: results[0].urls.regular,
              source: 'Unsplash API (Exact)',
            });
          }
          
          // Try refined fallback query
          const fallbackTerm = getFallbackQuery(trimmedQuery);
          if (fallbackTerm !== trimmedQuery) {
            response = await fetch(
              `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
                fallbackTerm
              )}&client_id=${process.env.UNSPLASH_ACCESS_KEY}&per_page=1&orientation=landscape`
            );
            if (response.ok) {
              data = await response.json();
              results = data.results || [];
              if (results.length > 0) {
                return res.status(200).json({
                  success: true,
                  url: results[0].urls.regular,
                  source: 'Unsplash API (Refined Fallback)',
                });
              }
            }
          }
        }
      } catch (err) {
        console.error('Error fetching from Unsplash Official API:', err);
      }
    }

    // 2. Try Wikimedia Commons API (Free, keyless, returns real images of places)
    try {
      const runWikimediaSearch = async (searchTerm) => {
        const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url&format=json&origin=*`;
        const response = await fetch(searchUrl);
        if (response.ok) {
          const data = await response.json();
          const pages = data.query?.pages || {};
          const urls = [];
          for (const pageId in pages) {
            const imgInfo = pages[pageId].imageinfo;
            if (imgInfo && imgInfo[0]?.url) {
              const fileUrl = imgInfo[0].url;
              if (!fileUrl.toLowerCase().endsWith('.svg')) {
                urls.push(fileUrl);
              }
            }
          }
          return urls;
        }
        return [];
      };

      let urls = await runWikimediaSearch(trimmedQuery);
      if (urls.length > 0) {
        return res.status(200).json({
          success: true,
          url: urls[0],
          source: 'Wikimedia Commons API (Exact)',
        });
      }

      // Try refined fallback query on Wikimedia
      const fallbackTerm = getFallbackQuery(trimmedQuery);
      if (fallbackTerm !== trimmedQuery) {
        urls = await runWikimediaSearch(fallbackTerm);
        if (urls.length > 0) {
          return res.status(200).json({
            success: true,
            url: urls[0],
            source: 'Wikimedia Commons API (Refined Fallback)',
          });
        }
      }
    } catch (err) {
      console.error('Error fetching from Wikimedia Commons API:', err);
    }

    // 3. Fallback to Local pre-mapped Indian destinations dictionary
    const matchKey = Object.keys(LOCAL_INDIAN_IMAGES).find(
      (key) => trimmedQuery.includes(key) || key.includes(trimmedQuery)
    );

    if (matchKey) {
      return res.status(200).json({
        success: true,
        url: LOCAL_INDIAN_IMAGES[matchKey],
        source: 'Local Fallback Map',
      });
    }

    // 4. Default Fallback
    res.status(200).json({
      success: true,
      url: DEFAULT_IMAGE,
      source: 'Global Default Fallback',
    });
  } catch (error) {
    console.error('Image controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search destination image',
      error: error.message,
    });
  }
};
