import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createTask,
  getTasks,
  toggleTask,
  deleteTask
} from '../controllers/wellnessTaskController.js';

const router = express.Router();

router.use(protect);
router.post('/', createTask);
router.get('/', getTasks);
router.patch('/:id/toggle', toggleTask);
router.delete('/:id', deleteTask);

export default router;


