import Preference from '../models/Preference.js';

export const getPreferences = async (req, res, next) => {
  try {
    const prefs =
      (await Preference.findOne({ user: req.user._id })) ||
      (await Preference.create({ user: req.user._id, darkMode: true }));
    // Ensure darkMode is always true
    if (prefs && !prefs.darkMode) {
      prefs.darkMode = true;
      await prefs.save();
    }
    res.json({ preferences: prefs });
  } catch (err) {
    next(err);
  }
};

export const updatePreferences = async (req, res, next) => {
  try {
    const { reducedMotion, layout } = req.body;
    // Force darkMode to always be true
    const prefs = await Preference.findOneAndUpdate(
      { user: req.user._id },
      { darkMode: true, reducedMotion, layout },
      { new: true, upsert: true }
    );
    res.json({ preferences: prefs });
  } catch (err) {
    next(err);
  }
};

