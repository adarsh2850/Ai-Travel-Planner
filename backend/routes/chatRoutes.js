import express from 'express';
import { processMessage } from '../controller/chatController.js';

const router = express.Router();

// Chat is open to both guest and registered users
router.post('/message', processMessage);

export default router;
