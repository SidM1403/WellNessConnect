import mongoose from 'mongoose';

const symptomLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    symptoms: [
      {
        type: String,
        enum: ['fatigue', 'headache', 'stress', 'body_pain']
      }
    ],
    severity: { type: Number, min: 1, max: 10 }
  },
  { timestamps: true }
);

symptomLogSchema.index({ user: 1, date: 1 }, { unique: true });

const SymptomLog = mongoose.model('SymptomLog', symptomLogSchema);
export default SymptomLog;


