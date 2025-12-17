import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/wellconnect';
  try {
    // Check if already connected (for serverless environments)
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB already connected');
      return;
    }
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error', err.message);
    // Don't exit in serverless environments
    if (process.env.VERCEL !== '1') {
      process.exit(1);
    }
    throw err;
  }
};

export default connectDB;

