import mongoose from 'mongoose';

const dailyHealthLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    sleepHours: { type: Number, min: 0, max: 24 },
    waterGlasses: { type: Number, min: 0, max: 40 },
    activityMinutes: { type: Number, min: 0, max: 1440 },
    energyLevel: { type: Number, min: 1, max: 5 }
  },
  { timestamps: true }
);

dailyHealthLogSchema.index({ user: 1, date: 1 }, { unique: true });

const DailyHealthLog = mongoose.model('DailyHealthLog', dailyHealthLogSchema);
export default DailyHealthLog;


