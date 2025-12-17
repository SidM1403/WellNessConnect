import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { body } from 'express-validator';
import validate from '../middleware/validate.js';
import { createAIChat, getAIHistory, deleteAIChat } from '../controllers/aiController.js';

const router = express.Router();

router.use(protect);
router.post(
  '/chat',
  [body('mode').isIn(['fitness', 'health']), body('message').isString().notEmpty()],
  validate,
  createAIChat
);
router.get('/history', getAIHistory);
router.delete('/history/:id', deleteAIChat);

export default router;


