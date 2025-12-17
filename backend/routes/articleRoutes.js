import express from 'express';
import { searchArticles } from '../controllers/articleController.js';
import { articleRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public endpoint with lightweight rate limiting
router.get('/search', articleRateLimiter, searchArticles);

export default router;

