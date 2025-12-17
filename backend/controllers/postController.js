import Post from '../models/Post.js';

export const getPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', tag, author } = req.query;
    const query = {
      ...(tag ? { tags: tag } : {}),
      ...(author ? { author } : {}),
      ...(search ? { title: { $regex: search, $options: 'i' } } : {})
    };
    const posts = await Post.find(query)
      .populate('author', 'name role avatar')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Post.countDocuments(query);
    const safePosts = posts.map((p) => {
      const obj = p.toObject();
      if (obj.anonymous) obj.author = undefined;
      return obj;
    });
    res.json({ posts: safePosts, total });
  } catch (err) {
    next(err);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { title, content, tags = [], anonymous = false } = req.body;
    const post = await Post.create({
      author: req.user._id,
      title,
      content,
      tags,
      anonymous,
      likes: 0,
      comments: []
    });
    res.status(201).json({ post });
  } catch (err) {
    next(err);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name role avatar');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const obj = post.toObject();
    if (obj.anonymous) obj.author = undefined;
    res.json({ post: obj });
  } catch (err) {
    next(err);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.comments.push({ user: req.user._id, text: req.body.text });
    await post.save();
    res.status(201).json({ comments: post.comments });
  } catch (err) {
    next(err);
  }
};

export const likePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ likes: post.likes });
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (req.user.role !== 'admin' && post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
};

