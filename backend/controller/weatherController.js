export const getWeather = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'City parameter is required',
      });
    }

    // 1. If OpenWeatherMap API key is provided, use it
    if (process.env.OPENWEATHER_API_KEY) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            city
          )}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
        );
        if (response.ok) {
          const data = await response.json();
          const temperature = Math.round(data.main.temp);
          const rawDescription = data.weather[0]?.main || 'Clear';
          const { description, icon } = mapOpenWeatherToDetails(rawDescription);

          return res.status(200).json({
            success: true,
            temperature,
            description,
            icon,
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind.speed * 3.6), // convert m/s to km/h
            source: 'OpenWeatherMap',
          });
        }
      } catch (err) {
        console.error('Error fetching from OpenWeatherMap, falling back to Open-Meteo:', err);
      }
    }

    // 2. Fallback to Open-Meteo (No API key required)
    const geocodeRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1&language=en&format=json`
    );

    if (!geocodeRes.ok) {
      throw new Error('Geocoding API request failed');
    }

    const geocodeData = await geocodeRes.json();
    if (!geocodeData.results || geocodeData.results.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Could not find coordinates for city: ${city}`,
      });
    }

    const { latitude, longitude, name: resolvedName } = geocodeData.results[0];

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    if (!weatherRes.ok) {
      throw new Error('Weather forecast API request failed');
    }

    const weatherData = await weatherRes.json();
    const current = weatherData.current_weather;

    if (!current) {
      throw new Error('No weather data returned');
    }

    const { description, icon } = mapWmoCodeToDetails(current.weathercode);

    res.status(200).json({
      success: true,
      resolvedCity: resolvedName,
      temperature: Math.round(current.temperature),
      description,
      icon,
      windSpeed: Math.round(current.windspeed),
      source: 'Open-Meteo',
    });
  } catch (error) {
    console.error('Weather controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch weather data',
      error: error.message,
    });
  }
};

// Helper: map OpenWeatherMap conditions to Material Symbols and readable descriptions
function mapOpenWeatherToDetails(mainCondition) {
  const cond = mainCondition.toLowerCase();
  if (cond.includes('clear')) {
    return { description: 'Sunny', icon: 'wb_sunny' };
  } else if (cond.includes('cloud')) {
    return { description: 'Partly Cloudy', icon: 'partly_cloudy_day' };
  } else if (cond.includes('rain') || cond.includes('drizzle')) {
    return { description: 'Rainy', icon: 'rainy' };
  } else if (cond.includes('snow')) {
    return { description: 'Snowy', icon: 'ac_unit' };
  } else if (cond.includes('thunderstorm')) {
    return { description: 'Thunderstorm', icon: 'thunderstorm' };
  } else if (cond.includes('fog') || cond.includes('mist') || cond.includes('haze')) {
    return { description: 'Foggy', icon: 'foggy' };
  }
  return { description: mainCondition, icon: 'wb_sunny' };
}

// Helper: map WMO codes to Material Symbols and readable descriptions
function mapWmoCodeToDetails(code) {
  switch (code) {
    case 0:
      return { description: 'Sunny', icon: 'wb_sunny' };
    case 1:
    case 2:
      return { description: 'Partly Cloudy', icon: 'partly_cloudy_day' };
    case 3:
      return { description: 'Overcast', icon: 'cloud' };
    case 45:
    case 48:
      return { description: 'Foggy', icon: 'foggy' };
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return { description: 'Rainy', icon: 'rainy' };
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return { description: 'Snowy', icon: 'ac_unit' };
    case 95:
    case 96:
    case 99:
      return { description: 'Thunderstorm', icon: 'thunderstorm' };
    default:
      return { description: 'Partly Cloudy', icon: 'partly_cloudy_day' };
  }
}
