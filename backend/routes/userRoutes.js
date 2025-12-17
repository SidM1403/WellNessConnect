import express from 'express';
import { getUserById, deleteUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:id', protect, getUserById);
router.delete('/:id', protect, deleteUser);

export default router;

