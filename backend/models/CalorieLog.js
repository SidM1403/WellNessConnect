import mongoose from 'mongoose';

const calorieLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    activity: { type: String, required: true },
    bmr: { type: Number, required: true },
    tdee: { type: Number, required: true }
}, {
    timestamps: true
});

export default mongoose.model('CalorieLog', calorieLogSchema);
