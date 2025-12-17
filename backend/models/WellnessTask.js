import mongoose from 'mongoose';

const wellnessTaskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    completedAt: { type: Date }
  },
  { timestamps: true }
);

const WellnessTask = mongoose.model('WellnessTask', wellnessTaskSchema);
export default WellnessTask;


