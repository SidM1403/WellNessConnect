import express from 'express';
import { saveScore, getLeaderboard, getUserStats } from '../controllers/gameController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/score', protect, saveScore);
router.get('/:gameType/leaderboard', protect, getLeaderboard);
router.get('/user-stats', protect, getUserStats);

export default router;
