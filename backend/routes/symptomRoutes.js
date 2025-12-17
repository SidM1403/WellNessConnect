import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createSymptomLog,
  getRecentSymptoms
} from '../controllers/symptomController.js';

const router = express.Router();

router.use(protect);
router.post('/', createSymptomLog);
router.get('/recent', getRecentSymptoms);

export default router;


