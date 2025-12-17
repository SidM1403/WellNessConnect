// Vercel serverless function entry point
// This wraps the Express app for Vercel deployment
import app from '../backend/server.js';

// Export the Express app as a Vercel serverless function
export default app;
