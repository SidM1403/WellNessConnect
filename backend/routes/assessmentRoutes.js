import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { saveAssessmentResult, getUserAssessments } from '../controllers/assessmentController.js';

const router = express.Router();

router.use(protect);

router.post('/', saveAssessmentResult);
router.get('/', getUserAssessments);

export default router;
