import mongoose from 'mongoose';

const preferenceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    darkMode: { type: Boolean, default: true }, // Always dark theme
    reducedMotion: { type: Boolean, default: false },
    layout: { type: String, default: 'balanced' }
  },
  { timestamps: true }
);

const Preference = mongoose.model('Preference', preferenceSchema);
export default Preference;

