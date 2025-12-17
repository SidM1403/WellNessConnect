import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createSession, getSessions } from '../controllers/sessionController.js';
import { body } from 'express-validator';
import validate from '../middleware/validate.js';

const router = express.Router();

router.use(protect);
router.post(
  '/',
  [
    body('type').optional().isIn(['breath', 'meditation']),
    body('durationSeconds').optional().isInt({ min: 0 })
  ],
  validate,
  createSession
);
router.get('/', getSessions);

export default router;

