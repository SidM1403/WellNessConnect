import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { toggleHabit, getStreaks } from '../controllers/habitController.js';
import { body } from 'express-validator';
import validate from '../middleware/validate.js';

const router = express.Router();

router.use(protect);
router.post('/', [body('name').notEmpty(), body('completed').isBoolean()], validate, toggleHabit);
router.get('/streak', getStreaks);

export default router;

