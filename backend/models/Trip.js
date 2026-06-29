import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    time: String,
    title: { type: String, required: true },
    description: String,
    type: { type: String, enum: ['hotel', 'restaurant', 'transit', 'activity'], default: 'activity' },
    cost: { type: Number, default: 0 },
    ecoFriendly: { type: Boolean, default: false },
    ecoReason: String,
  },
  { _id: false }
);

const daySchema = new mongoose.Schema(
  {
    dayNumber: { type: Number, required: true },
    theme: String,
    activities: [activitySchema],
  },
  { _id: false }
);

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
      min: [1, 'Duration must be at least 1 day'],
      max: [30, 'Duration cannot exceed 30 days'],
    },
    vibe: {
      type: String,
      required: true,
      enum: ['Eco-Zen', 'Modern Luxury', 'Vibrant Culture', 'Adventure & Sport'],
    },
    budget: {
      type: String,
      required: true,
      enum: ['Economy', 'Balanced', 'Premium'],
    },
    totalBudget: { type: Number, default: 0 },
    spentBudget: { type: Number, default: 0 },
    ecoScore: { type: String, default: 'A+' },
    co2Saved: { type: Number, default: 0 },
    mapUrl: { type: String, default: '' },
    image: { type: String, default: '' },
    hotel: { type: mongoose.Schema.Types.Mixed },
    days: [daySchema],
    isBookmarked: { type: Boolean, default: false },
    notes: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

// Index for faster user-specific queries
tripSchema.index({ user: 1, createdAt: -1 });

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;
