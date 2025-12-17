// backend/controllers/contactController.js
import Contact from '../models/Contact.js';
import { validationResult } from 'express-validator';

/**
 * @desc    Submit contact form
 * @route   POST /api/contact
 * @access  Public
 */
export const submitContactForm = async (req, res) => {
  console.log('Received contact form data:', req.body); // Log incoming request

  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }

  const { name, email, subject, message } = req.body;

  try {
    console.log('Creating contact with:', { name, email, subject, message });
    
    // Create and save contact
    const contact = new Contact({
      name,
      email,
      subject: subject || 'No Subject', // Ensure subject is never undefined
      message
    });

    const savedContact = await contact.save();
    console.log('Contact saved successfully:', savedContact);

    // Send success response
    return res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: savedContact
    });

  } catch (error) {
    console.error('Error saving contact:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save contact',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

/**
 * @desc    Get all contact form submissions
 * @route   GET /api/contact
 * @access  Private/Admin
 */
export const getContactSubmissions = async (req, res) => {
  try {
    const submissions = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch contact submissions',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

/**
 * @desc    Update contact submission status
 * @route   PUT /api/contact/:id/status
 * @access  Private/Admin
 */
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'in_progress', 'resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: new, in_progress, resolved'
      });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Contact status updated successfully',
      data: updatedContact
    });

  } catch (error) {
    console.error('Error updating contact status:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update contact status',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};