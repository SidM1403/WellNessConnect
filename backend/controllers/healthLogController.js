import DailyHealthLog from '../models/DailyHealthLog.js';

const startOfDay = (d = new Date()) => {
  const dt = new Date(d);
  dt.setHours(0, 0, 0, 0);
  return dt;
};

export const createHealthLog = async (req, res, next) => {
  try {
    const { sleepHours, waterGlasses, activityMinutes, energyLevel } = req.body;
    const date = startOfDay();

    const payload = {
      user: req.user._id,
      date,
      sleepHours,
      waterGlasses,
      activityMinutes,
      energyLevel
    };

    const existing = await DailyHealthLog.findOne({ user: req.user._id, date });
    if (existing) {
      Object.assign(existing, payload);
      const saved = await existing.save();
      return res.status(200).json({ log: saved });
    }

    const log = await DailyHealthLog.create(payload);
    return res.status(201).json({ log });
  } catch (err) {
    next(err);
  }
};

export const getTodayHealthLog = async (req, res, next) => {
  try {
    const date = startOfDay();
    const log = await DailyHealthLog.findOne({ user: req.user._id, date });
    return res.json({ log: log || null });
  } catch (err) {
    next(err);
  }
};

export const updateHealthLog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { sleepHours, waterGlasses, activityMinutes, energyLevel } = req.body;

    const log = await DailyHealthLog.findOne({ _id: id, user: req.user._id });
    if (!log) return res.status(404).json({ message: 'Health log not found' });

    if (sleepHours !== undefined) log.sleepHours = sleepHours;
    if (waterGlasses !== undefined) log.waterGlasses = waterGlasses;
    if (activityMinutes !== undefined) log.activityMinutes = activityMinutes;
    if (energyLevel !== undefined) log.energyLevel = energyLevel;

    const saved = await log.save();
    return res.json({ log: saved });
  } catch (err) {
    next(err);
  }
};


