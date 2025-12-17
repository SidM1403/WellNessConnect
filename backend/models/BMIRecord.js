import mongoose from 'mongoose';

const bmiRecordSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    heightCm: { type: Number, required: true, min: 50, max: 250 },
    weightKg: { type: Number, required: true, min: 10, max: 350 },
    bmi: { type: Number, required: true, min: 5, max: 80 },
    category: {
      type: String,
      enum: ['underweight', 'normal', 'overweight', 'obese'],
      required: true
    }
  },
  { timestamps: true }
);

const BMIRecord = mongoose.model('BMIRecord', bmiRecordSchema);
export default BMIRecord;


