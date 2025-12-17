import BMIRecord from '../models/BMIRecord.js';

const computeBMI = (heightCm, weightKg) => {
  const h = Number(heightCm) / 100;
  const w = Number(weightKg);
  if (!h || !w) return null;
  const bmi = w / (h * h);
  if (!Number.isFinite(bmi)) return null;
  return Number(bmi.toFixed(1));
};

const categorize = (bmi) => {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
};

export const createBMIRecord = async (req, res, next) => {
  try {
    const { heightCm, weightKg } = req.body;
    const bmi = computeBMI(heightCm, weightKg);
    if (!bmi) return res.status(400).json({ message: 'Invalid height or weight' });

    const category = categorize(bmi);

    const record = await BMIRecord.create({
      user: req.user._id,
      heightCm,
      weightKg,
      bmi,
      category
    });

    return res.status(201).json({ record });
  } catch (err) {
    next(err);
  }
};

export const getLatestBMIRecord = async (req, res, next) => {
  try {
    const record = await BMIRecord.findOne({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json({ record: record || null });
  } catch (err) {
    next(err);
  }
};


