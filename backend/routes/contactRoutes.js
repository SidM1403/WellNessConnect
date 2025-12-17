// backend/routes/contactRoutes.js
import express from 'express';
import { submitContactForm, getContactSubmissions, updateContactStatus } from '../controllers/contactController.js';
// In contactRoutes.js, update the import line:
import { protect, adminOnly as admin } from '../middleware/authMiddleware.js';
import { validateContact } from '../middleware/validateContact.js';

const router = express.Router();

// Public route for submitting contact form
router.post('/', validateContact, submitContactForm);

// Protected admin routes
router.use(protect);
router.use(admin);
router.get('/', getContactSubmissions);
router.put('/:id/status', updateContactStatus);

export default router;