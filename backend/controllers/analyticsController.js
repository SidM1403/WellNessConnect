import Mood from '../models/Mood.js';
import Session from '../models/Session.js';
import Habit from '../models/Habit.js';

const startOfDay = (d = new Date()) => {
  const dt = new Date(d);
  dt.setUTCHours(0, 0, 0, 0);
  return dt;
};

export const moodAnalytics = async (req, res, next) => {
  try {
    const since = new Date();
    since.setDate(since.getDate() - 30);
    const data = await Mood.aggregate([
      { $match: { user: req.user._id, createdAt: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          avg: { $avg: '$value' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json({ trend: data });
  } catch (err) {
    next(err);
  }
};

export const activityAnalytics = async (req, res, next) => {
  try {
    const since = new Date();
    since.setDate(since.getDate() - 30);

    const sessions = await Session.aggregate([
      { $match: { user: req.user._id, completedAt: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$completedAt' } },
          totalDuration: { $sum: '$durationSeconds' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const habits = await Habit.find({ user: req.user._id });
    const habitCounts = {};
    habits.forEach((h) => {
      h.completions.forEach((c) => {
        const day = startOfDay(c).toISOString().slice(0, 10);
        habitCounts[day] = (habitCounts[day] || 0) + 1;
      });
    });
    const habitSeries = Object.entries(habitCounts)
      .map(([day, count]) => ({ _id: day, count }))
      .sort((a, b) => (a._id > b._id ? 1 : -1));

    res.json({ sessions, habits: habitSeries });
  } catch (err) {
    next(err);
  }
};

