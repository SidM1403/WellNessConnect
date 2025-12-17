import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { getResources, createResource, deleteResource } from '../controllers/resourceController.js';
import { body } from 'express-validator';
import validate from '../middleware/validate.js';

const router = express.Router();

router.get('/', getResources);
router.post(
  '/',
  protect,
  adminOnly,
  [
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('type').isIn(['article', 'video', 'tip']),
    body('url').notEmpty(),
    body('category').notEmpty()
  ],
  validate,
  createResource
);
router.delete('/:id', protect, adminOnly, deleteResource);

export default router;

