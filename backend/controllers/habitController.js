import Habit from '../models/Habit.js';

const normalizeDate = (date = new Date()) => {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

const computeStreak = (dates) => {
  const set = new Set(dates.map((d) => normalizeDate(d).getTime()));
  let streak = 0;
  let cursor = normalizeDate().getTime();
  while (set.has(cursor)) {
    streak += 1;
    cursor -= 24 * 60 * 60 * 1000;
  }
  return streak;
};

export const toggleHabit = async (req, res, next) => {
  try {
    const { name, completed } = req.body;
    const today = normalizeDate();
    let habit = await Habit.findOne({ user: req.user._id, name });
    if (!habit) {
      habit = await Habit.create({ user: req.user._id, name, completions: [] });
    }
    const exists = habit.completions.some(
      (d) => normalizeDate(d).getTime() === today.getTime()
    );
    if (completed && !exists) habit.completions.push(today);
    if (!completed && exists) {
      habit.completions = habit.completions.filter(
        (d) => normalizeDate(d).getTime() !== today.getTime()
      );
    }
    await habit.save();
    res.json({ habit });
  } catch (err) {
    next(err);
  }
};

export const getStreaks = async (req, res, next) => {
  try {
    const habits = await Habit.find({ user: req.user._id }).sort({ updatedAt: -1 });
    const data = habits.map((h) => ({
      _id: h._id,
      name: h.name,
      streak: computeStreak(h.completions),
      completions: h.completions
    }));
    res.json({ habits: data });
  } catch (err) {
    next(err);
  }
};

