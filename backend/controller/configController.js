export const getPublicConfig = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    });
  } catch (error) {
    console.error('Config controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch config details',
    });
  }
};
