import Session from '../models/Session.js';

export const createSession = async (req, res, next) => {
  try {
    const { type = 'breath', durationSeconds = 0 } = req.body;
    const session = await Session.create({
      user: req.user._id,
      type,
      durationSeconds,
      completedAt: new Date()
    });
    res.status(201).json({ session });
  } catch (err) {
    next(err);
  }
};

export const getSessions = async (req, res, next) => {
  try {
    const sessions = await Session.find({ user: req.user._id })
      .sort({ completedAt: -1 })
      .limit(50);
    res.json({ sessions });
  } catch (err) {
    next(err);
  }
};

