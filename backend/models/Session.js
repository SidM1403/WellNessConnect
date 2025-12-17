import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['breath', 'meditation'], default: 'breath' },
    durationSeconds: { type: Number, default: 0 },
    completedAt: { type: Date, default: Date.now }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const Session = mongoose.model('Session', sessionSchema);
export default Session;

