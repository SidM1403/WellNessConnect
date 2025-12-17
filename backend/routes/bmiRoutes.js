import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createBMIRecord, getLatestBMIRecord } from '../controllers/bmiController.js';

const router = express.Router();

router.use(protect);
router.post('/', createBMIRecord);
router.get('/latest', getLatestBMIRecord);

export default router;


