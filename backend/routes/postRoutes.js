import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getPosts, createPost, getPostById, addComment, likePost, deletePost } from '../controllers/postController.js';
import { body } from 'express-validator';
import validate from '../middleware/validate.js';

const router = express.Router();

router.get('/', getPosts);
router.post(
  '/',
  protect,
  [body('title').notEmpty(), body('content').notEmpty(), body('anonymous').optional().isBoolean()],
  validate,
  createPost
);
router.get('/:id', getPostById);
router.post('/:id/comment', protect, [body('text').notEmpty()], validate, addComment);
router.patch('/:id/like', protect, likePost);
router.delete('/:id', protect, deletePost);

export default router;

