import Trip from '../models/Trip.js';
import User from '../models/User.js';

/**
 * @route   GET /api/trips
 * @desc    Get all trips for the logged-in user
 * @access  Private
 */
export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: trips.length, trips });
  } catch (error) {
    console.error('Get trips error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching trips' });
  }
};

/**
 * @route   GET /api/trips/:id
 * @desc    Get a single trip by ID
 * @access  Private
 */
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user.id });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    res.status(200).json({ success: true, trip });
  } catch (error) {
    console.error('Get trip by ID error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching trip' });
  }
};

/**
 * @route   POST /api/trips
 * @desc    Save a new trip for the logged-in user
 * @access  Private
 */
export const saveTrip = async (req, res) => {
  try {
    const {
      destination,
      duration,
      vibe,
      budget,
      totalBudget,
      spentBudget,
      ecoScore,
      co2Saved,
      mapUrl,
      image,
      hotel,
      days,
      notes,
    } = req.body;

    if (!destination || !duration || !vibe || !budget) {
      return res.status(400).json({
        success: false,
        message: 'destination, duration, vibe and budget are required',
      });
    }

    const trip = await Trip.create({
      user: req.user.id,
      destination,
      duration,
      vibe,
      budget,
      totalBudget: totalBudget || 0,
      spentBudget: spentBudget || 0,
      ecoScore: ecoScore || 'A+',
      co2Saved: co2Saved || 0,
      mapUrl: mapUrl || '',
      image: image || '',
      hotel: hotel || null,
      days: days || [],
      notes: notes || '',
    });

    // Add trip reference to user's savedTrips array
    await User.findByIdAndUpdate(req.user.id, {
      $push: { savedTrips: trip._id },
    });

    res.status(201).json({ success: true, trip });
  } catch (error) {
    console.error('Save trip error:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }

    res.status(500).json({ success: false, message: 'Server error saving trip' });
  }
};

/**
 * @route   PUT /api/trips/:id
 * @desc    Update an existing trip
 * @access  Private
 */
export const updateTrip = async (req, res) => {
  try {
    // Ensure trip belongs to requesting user
    let trip = await Trip.findOne({ _id: req.params.id, user: req.user.id });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    // Only allow updating safe fields
    const allowedUpdates = [
      'destination', 'duration', 'vibe', 'budget',
      'totalBudget', 'spentBudget', 'ecoScore', 'co2Saved',
      'mapUrl', 'image', 'hotel', 'days', 'notes', 'isBookmarked',
    ];

    const updates = {};
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    trip = await Trip.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, trip });
  } catch (error) {
    console.error('Update trip error:', error);
    res.status(500).json({ success: false, message: 'Server error updating trip' });
  }
};

/**
 * @route   DELETE /api/trips/:id
 * @desc    Delete a trip
 * @access  Private
 */
export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user.id });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    await trip.deleteOne();

    // Remove reference from user
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { savedTrips: req.params.id },
    });

    res.status(200).json({ success: true, message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Delete trip error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting trip' });
  }
};

/**
 * @route   POST /api/trips/:id/bookmark
 * @desc    Toggle bookmark status of a trip
 * @access  Private
 */
export const toggleBookmark = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user.id });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    trip.isBookmarked = !trip.isBookmarked;
    await trip.save();

    res.status(200).json({ success: true, isBookmarked: trip.isBookmarked });
  } catch (error) {
    console.error('Bookmark toggle error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * @route   DELETE /api/trips
 * @desc    Delete all trips for the authenticated user
 * @access  Private
 */
export const clearTrips = async (req, res) => {
  try {
    await Trip.deleteMany({ user: req.user.id });
    await User.findByIdAndUpdate(req.user.id, {
      $set: { savedTrips: [] },
    });
    res.status(200).json({ success: true, message: 'All trips deleted successfully' });
  } catch (error) {
    console.error('Clear trips error:', error);
    res.status(500).json({ success: false, message: 'Server error clearing trips history' });
  }
};
