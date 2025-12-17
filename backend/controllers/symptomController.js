import SymptomLog from '../models/SymptomLog.js';

const startOfDay = (d = new Date()) => {
  const dt = new Date(d);
  dt.setHours(0, 0, 0, 0);
  return dt;
};

export const createSymptomLog = async (req, res, next) => {
  try {
    const { symptoms = [], severity } = req.body;
    const date = startOfDay();

    const cleanSymptoms = Array.isArray(symptoms)
      ? [...new Set(symptoms.filter(Boolean))]
      : [];

    const payload = {
      user: req.user._id,
      date,
      symptoms: cleanSymptoms,
      severity
    };

    const existing = await SymptomLog.findOne({ user: req.user._id, date });
    if (existing) {
      Object.assign(existing, payload);
      const saved = await existing.save();
      return res.status(200).json({ log: saved });
    }

    const log = await SymptomLog.create(payload);
    return res.status(201).json({ log });
  } catch (err) {
    next(err);
  }
};

export const getRecentSymptoms = async (req, res, next) => {
  try {
    const since = new Date();
    since.setDate(since.getDate() - 14);

    const logs = await SymptomLog.find({
      user: req.user._id,
      date: { $gte: since }
    }).sort({ date: -1 });

    return res.json({ logs });
  } catch (err) {
    next(err);
  }
};


