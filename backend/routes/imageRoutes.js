import express from 'express';
import { getDestinationImage } from '../controller/imageController.js';

const router = express.Router();

// Public route for searching destination images
router.get('/search', getDestinationImage);

export default router;
