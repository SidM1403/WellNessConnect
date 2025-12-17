import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import {
  getOverview,
  getUserAnalytics,
  getWellnessTrends,
  getForumAnalytics,
  getAIAnalytics,
  getAllUsers,
  updateUserRole,
  updateUserStatus,
  getReportedPosts,
  deletePostAdmin,
  getAllPosts
} from '../controllers/adminController.js';
import { body } from 'express-validator';
import validate from '../middleware/validate.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(protect, adminOnly);

// Overview
router.get('/overview', getOverview);

// Analytics
router.get('/user-analytics', getUserAnalytics);
router.get('/wellness-trends', getWellnessTrends);
router.get('/forum-analytics', getForumAnalytics);
router.get('/ai-analytics', getAIAnalytics);

// User Management
router.get('/users', getAllUsers);
router.put('/users/:id/role', [body('role').isIn(['user', 'admin'])], validate, updateUserRole);
router.put('/users/:id/status', [body('status').isIn(['active', 'suspended'])], validate, updateUserStatus);

// Forum Management
router.get('/posts', getAllPosts);
router.get('/posts/reported', getReportedPosts);
router.delete('/posts/:id', deletePostAdmin);

export default router;
