import Preference from '../models/Preference.js';

export const getPreferences = async (req, res, next) => {
  try {
    const prefs =
      (await Preference.findOne({ user: req.user._id })) ||
      (await Preference.create({ user: req.user._id }));
    res.json({ preferences: prefs });
  } catch (err) {
    next(err);
  }
};

export const updatePreferences = async (req, res, next) => {
  try {
    const { darkMode, reducedMotion, layout } = req.body;
    const prefs = await Preference.findOneAndUpdate(
      { user: req.user._id },
      { darkMode, reducedMotion, layout },
      { new: true, upsert: true }
    );
    res.json({ preferences: prefs });
  } catch (err) {
    next(err);
  }
};

