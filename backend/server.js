// Load environment variables first
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import moodRoutes from './routes/moodRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import habitRoutes from './routes/habitRoutes.js';
import preferenceRoutes from './routes/preferenceRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import healthLogRoutes from './routes/healthLogRoutes.js';
import symptomRoutes from './routes/symptomRoutes.js';
import wellnessTaskRoutes from './routes/wellnessTaskRoutes.js';
import bmiRoutes from './routes/bmiRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ status: 'ok', message: 'WellConnect API' }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/preferences', preferenceRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/health-log', healthLogRoutes);
app.use('/api/symptoms', symptomRoutes);
app.use('/api/tasks', wellnessTaskRoutes);
app.use('/api/bmi', bmiRoutes);
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

