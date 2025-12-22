import GameScore from '../models/GameScore.js';

// @desc    Save game score
// @route   POST /api/games/score
// @access  Private
export const saveScore = async (req, res) => {
    try {
        const { gameType, score, difficulty, metadata } = req.body;

        if (!gameType) {
            return res.status(400).json({ message: 'Game type is required' });
        }

        const newScore = await GameScore.create({
            user: req.user._id,
            gameType,
            score,
            difficulty: difficulty || 'default',
            metadata: metadata || {}
        });

        res.status(201).json(newScore);
    } catch (error) {
        console.error('Save score error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get leaderboard for a specific game
// @route   GET /api/games/:gameType/leaderboard
// @access  Private
export const getLeaderboard = async (req, res) => {
    try {
        const { gameType } = req.params;

        // Sorting: For 'reaction' game, lower is better. For others, higher is better.
        // This logic might need refinement based on exact game metrics, but assuming 'score' holds the primary metric.
        // If Reaction Time is stored as ms in 'score', we want ascending.
        // If Memory Game is points, we want descending.

        let sortOrder = -1; // Default descending (Higher is better)
        if (gameType === 'reaction') {
            sortOrder = 1; // Ascending (Lower is better)
        }

        const leaderboard = await GameScore.find({ gameType })
            .populate('user', 'name')
            .sort({ score: sortOrder })
            .limit(10);

        res.status(200).json(leaderboard);
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get user game stats
// @route   GET /api/games/user-stats
// @access  Private
export const getUserStats = async (req, res) => {
    try {
        const userId = req.user._id;

        // Aggregate stats per game type
        const stats = await GameScore.aggregate([
            { $match: { user: userId } },
            {
                $group: {
                    _id: '$gameType',
                    bestScore: { $max: '$score' }, // This assumes higher is better for all, needs conditional for reaction
                    // For reaction, we might need a separate query or smarter aggregation if mixed
                    gamesPlayed: { $sum: 1 },
                    lastPlayed: { $max: '$createdAt' }
                }
            }
        ]);

        res.status(200).json(stats);
    } catch (error) {
        console.error('User stats error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
