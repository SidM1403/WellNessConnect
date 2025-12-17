import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createHealthLog,
  getTodayHealthLog,
  updateHealthLog
} from '../controllers/healthLogController.js';

const router = express.Router();

router.use(protect);
router.post('/', createHealthLog);
router.get('/today', getTodayHealthLog);
router.put('/:id', updateHealthLog);

export default router;


