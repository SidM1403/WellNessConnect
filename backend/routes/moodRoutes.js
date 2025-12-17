import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createMood, getMoodHistory } from '../controllers/moodController.js';
import { body } from 'express-validator';
import validate from '../middleware/validate.js';

const router = express.Router();

router.use(protect);
router.post('/', [body('value').isInt({ min: 1, max: 5 })], validate, createMood);
router.get('/history', getMoodHistory);

export default router;

