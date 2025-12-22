import mongoose from 'mongoose';

const gameScoreSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gameType: {
        type: String,
        required: true, // e.g., 'memory', 'reaction', 'math', 'breathing', 'focus'
        enum: ['memory', 'reaction', 'math', 'breathing', 'focus']
    },
    score: {
        type: Number,
        default: 0
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard', 'default'],
        default: 'default'
    },
    metadata: {
        type: Object, // Specifics like 'accuracy', 'avgTime', etc.
        default: {}
    }
}, {
    timestamps: true
});

export default mongoose.model('GameScore', gameScoreSchema);
