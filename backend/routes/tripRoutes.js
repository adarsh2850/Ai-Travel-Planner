import express from 'express';
import {
  getTrips,
  getTripById,
  saveTrip,
  updateTrip,
  deleteTrip,
  toggleBookmark,
  clearTrips,
} from '../controller/tripController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All trip routes require authentication
router.use(protect);

router.route('/')
  .get(getTrips)
  .post(saveTrip)
  .delete(clearTrips);

router.route('/:id').get(getTripById).put(updateTrip).delete(deleteTrip);
router.post('/:id/bookmark', toggleBookmark);

export default router;
