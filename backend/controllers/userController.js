import User from '../models/User.js';
import Post from '../models/Post.js';

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 }).limit(20);
    res.json({ user, posts });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await User.findByIdAndDelete(req.params.id);
    await Post.deleteMany({ author: req.params.id });
    res.json({ message: 'User removed' });
  } catch (err) {
    next(err);
  }
};

