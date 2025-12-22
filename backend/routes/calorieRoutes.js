import express from 'express';
import { calculateNeeds } from '../controllers/calorieController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/calculate', protect, calculateNeeds);

export default router;
