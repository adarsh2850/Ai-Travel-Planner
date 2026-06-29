import express from 'express';
import { getPublicConfig } from '../controller/configController.js';

const router = express.Router();

// Public route to fetch configuration variables
router.get('/', getPublicConfig);

export default router;
