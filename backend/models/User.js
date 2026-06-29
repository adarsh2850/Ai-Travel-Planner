import mongoose from 'mongoose';
import crypto from 'crypto';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    avatar: {
      type: String,
      default: '',
    },
    savedTrips: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
      },
    ],
  },
  { timestamps: true }
);

// ── Password hashing (pre-save) ─────────────────────────────
// Use an async function without callback parameters for Mongoose v8/v9 promise-based middleware compatibility
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  try {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(this.password, salt, 64).toString('hex');
    this.password = `${salt}:${hash}`;
  } catch (err) {
    throw err;
  }
});

// ── Password verification ────────────────────────────────────
userSchema.methods.matchPassword = function (enteredPassword) {
  if (!this.password || !this.password.includes(':')) {
    return false;
  }
  const [salt, storedHash] = this.password.split(':');
  const derivedHash = crypto.scryptSync(enteredPassword, salt, 64).toString('hex');

  const storedBuffer = Buffer.from(storedHash, 'hex');
  const derivedBuffer = Buffer.from(derivedHash, 'hex');

  // timingSafeEqual throws an error if buffers have different lengths
  if (storedBuffer.length !== derivedBuffer.length) {
    return false;
  }

  // timingSafeEqual prevents timing-based attacks
  return crypto.timingSafeEqual(storedBuffer, derivedBuffer);
};

const User = mongoose.model('User', userSchema);
export default User;
