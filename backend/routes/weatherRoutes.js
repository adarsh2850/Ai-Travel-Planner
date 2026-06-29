import express from 'express';
import { getWeather } from '../controller/weatherController.js';

const router = express.Router();

// Public route for fetching weather data
router.get('/', getWeather);

export default router;
