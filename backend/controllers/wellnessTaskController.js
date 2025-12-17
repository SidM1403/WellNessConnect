import WellnessTask from '../models/WellnessTask.js';

export const createTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const task = await WellnessTask.create({
      user: req.user._id,
      title: title.trim()
    });
    return res.status(201).json({ task });
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await WellnessTask.find({ user: req.user._id }).sort({ createdAt: 1 });
    return res.json({ tasks });
  } catch (err) {
    next(err);
  }
};

export const toggleTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await WellnessTask.findOne({ _id: id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const nowCompleted = !task.completed;
    task.completed = nowCompleted;
    task.completedAt = nowCompleted ? new Date() : null;

    const saved = await task.save();
    return res.json({ task: saved });
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await WellnessTask.deleteOne({ _id: id, user: req.user._id });
    return res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};


