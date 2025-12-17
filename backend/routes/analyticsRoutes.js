import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { moodAnalytics, activityAnalytics } from '../controllers/analyticsController.js';

const router = express.Router();
router.use(protect);
router.get('/mood', moodAnalytics);
router.get('/activity', activityAnalytics);

export default router;

