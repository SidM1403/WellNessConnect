import Mood from '../models/Mood.js';

export const createMood = async (req, res, next) => {
  try {
    const { value, note = '' } = req.body;
    const entry = await Mood.create({ user: req.user._id, value, note });
    res.status(201).json({ mood: entry });
  } catch (err) {
    next(err);
  }
};

export const getMoodHistory = async (req, res, next) => {
  try {
    const history = await Mood.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(60);
    res.json({ history });
  } catch (err) {
    next(err);
  }
};

