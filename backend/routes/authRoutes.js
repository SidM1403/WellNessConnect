import express from 'express';
import { register, login, currentUser, updateProfile, forgotPassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { body } from 'express-validator';
import validate from '../middleware/validate.js';

const router = express.Router();

router.post(
  '/register',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ],
  validate,
  register
);
router.post(
  '/login',
  [body('email').isEmail(), body('password').notEmpty()],
  validate,
  login
);
router.get('/me', protect, currentUser);
router.put('/update', protect, updateProfile);
router.post('/forgot', forgotPassword);

export default router;

