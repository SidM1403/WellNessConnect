import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/api.js';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';
import { FaHeart, FaRegHeart, FaRegComment, FaUserCircle } from 'react-icons/fa';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [likeBusy, setLikeBusy] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/posts/${id}`);
      setPost(data.post);
    } catch (e) {
      setError('Unable to load post.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleLike = async () => {
    if (!post || likeBusy) return;
    setLikeBusy(true);
    const prevLikes = post.likes ?? 0;
    setPost((p) => ({ ...p, likes: prevLikes + 1 }));
    try {
      await api.patch(`/posts/${id}/like`);
    } catch {
      setPost((p) => ({ ...p, likes: prevLikes }));
    } finally {
      setLikeBusy(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !post) return;
    const optimisticComment = {
      _id: `temp-${Date.now()}`,
      text: commentText,
      user: { name: 'You' },
      createdAt: new Date().toISOString()
    };
    setPost((p) => ({ ...p, comments: [...(p.comments || []), optimisticComment] }));
    setCommentText('');
    try {
      await api.post(`/posts/${id}/comment`, { text: optimisticComment.text });
      load();
    } catch {
      setError('Could not add comment.');
      setPost((p) => ({
        ...p,
        comments: (p.comments || []).filter((c) => c._id !== optimisticComment._id)
      }));
    }
  };

  if (loading && !post) {
    return (
      <div className="pt-24 max-w-4xl mx-auto px-4">
        <div className="card-premium p-6">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 text-center">
        <p className="text-lg text-coral-500 font-medium">{error || 'Post not found.'}</p>
      </div>
    );
  }

  return (
    <div className="pt-24 max-w-4xl mx-auto px-4 pb-12 space-y-6">
      <motion.article
        className="card-premium p-6 sm:p-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-indigo-100 flex items-center justify-center text-primary-600 shadow-sm">
              <FaUserCircle className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-text-primary leading-tight">
                {post.title}
              </h1>
              <p className="mt-1 text-sm font-medium text-text-secondary flex items-center gap-2">
                <span>{post.anonymous ? 'Anonymous' : post.author?.name || 'Community member'}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="text-text-light">{new Date(post.createdAt).toLocaleDateString()}</span>
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            disabled={likeBusy}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${likeBusy
                ? 'bg-rose-50 text-rose-300 cursor-not-allowed'
                : 'bg-rose-50 text-rose-500 hover:bg-rose-100 hover:text-rose-600 shadow-sm hover:shadow-md'
              }`}
          >
            {likeBusy ? <FaHeart className="w-4 h-4 animate-pulse" /> : <FaRegHeart className="w-4 h-4" />}
            <span>{post.likes ?? 0} Likes</span>
          </motion.button>
        </header>

        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-text-primary leading-relaxed whitespace-pre-wrap">{post.content}</p>
        </div>

        {post.tags?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </motion.article>

      <motion.section
        className="card-premium p-6 sm:p-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-surface-200">
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500">
            <FaRegComment className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-text-primary">
            Reflections <span className="ml-2 text-sm font-normal text-text-light">({post.comments?.length || 0})</span>
          </h2>
        </div>

        <form onSubmit={handleComment} className="mb-8">
          <div className="relative">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your thoughts gently..."
              className="w-full min-h-[100px] p-4 rounded-xl bg-surface-50 border border-surface-200 text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-y"
            />
            <div className="absolute bottom-3 right-3 flex items-center justify-between gap-3">
              {error && <p className="text-xs text-coral-500 font-medium">{error}</p>}
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold shadow-lg shadow-primary-500/30 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Send Reflection
              </button>
            </div>
          </div>
        </form>

        <div className="space-y-4">
          {post.comments?.length === 0 ? (
            <p className="text-center text-text-light py-8 italic">No comments yet. Be the first to share your thoughts.</p>
          ) : (
            post.comments.map((c) => (
              <motion.div
                key={c._id || c.createdAt}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-surface-50 rounded-2xl p-5 border border-surface-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-500 text-xs font-bold">
                      {c.user?.name?.[0] || 'M'}
                    </div>
                    <p className="font-semibold text-text-primary text-sm">
                      {c.user?.name || 'Community Member'}
                    </p>
                  </div>
                  <span className="text-xs text-text-light">
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Just now'}
                  </span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed pl-10">{c.text}</p>
              </motion.div>
            ))
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default PostDetails;
