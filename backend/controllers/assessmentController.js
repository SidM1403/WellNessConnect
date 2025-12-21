import AssessmentResult from '../models/AssessmentResult.js';

// @desc    Save assessment result
// @route   POST /api/assessments
// @access  Private
export const saveAssessmentResult = async (req, res, next) => {
    try {
        const { assessmentId, title, score, maxScore, percentage, category } = req.body;

        // Create new assessment result
        const result = await AssessmentResult.create({
            user: req.user._id,
            assessmentId,
            title,
            score,
            maxScore,
            percentage,
            category
        });

        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

// @desc    Get user's assessment history
// @route   GET /api/assessments
// @access  Private
export const getUserAssessments = async (req, res, next) => {
    try {
        const assessments = await AssessmentResult.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        res.json(assessments);
    } catch (err) {
        next(err);
    }
};
