import express from 'express';
import { signup, login, getMe, updateProfile } from '../controller/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes (require valid JWT)
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

export default router;
