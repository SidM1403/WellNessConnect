import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/api.js';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';

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
      <div className="glass rounded-3xl p-6">
        <LoadingSkeleton />
      </div>
    );
  }

  if (!post) {
    return <p className="text-sm text-red-300">{error || 'Post not found.'}</p>;
  }

  return (
    <div className="space-y-5">
      <motion.article
        className="glass rounded-3xl p-5 sm:p-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-emerald-200/80">
              {post.anonymous ? 'Anonymous' : post.author?.name || 'Community member'}
            </p>
            <h1 className="mt-1 text-xl sm:text-2xl font-semibold text-slate-50">
              {post.title}
            </h1>
          </div>
          <button
            type="button"
            className="relative inline-flex items-center gap-1.5 rounded-full border border-rose-300/50 bg-rose-400/15 px-3 py-1 text-[11px] text-rose-100 like-pulse"
            onClick={handleLike}
            data-active={likeBusy ? 'true' : 'false'}
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="M12.1 5.1C10.3 3.3 7.4 3.4 5.7 5.1C3.9 6.9 3.9 9.7 5.7 11.5L12 17.8L18.3 11.5C20.1 9.7 20.1 6.9 18.3 5.1C16.6 3.4 13.7 3.3 11.9 5.1L12 5.2L12.1 5.1Z"
                fill="currentColor"
              />
            </svg>
            <span>{post.likes ?? 0} gentle likes</span>
          </button>
        </header>

        <p className="mt-4 text-sm text-slate-200/95 whitespace-pre-wrap">{post.content}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags?.map((t) => (
            <span
              key={t}
              className="inline-flex rounded-full border border-emerald-300/40 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-100"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.article>

      <motion.section
        className="glass rounded-3xl p-5 sm:p-6 space-y-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-100">Reflections</h2>
          <p className="text-[11px] text-slate-400">
            {post.comments?.length || 0} shared moments
          </p>
        </div>

        <form onSubmit={handleComment} className="space-y-2">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Gently share how this resonates with you…"
            className="w-full rounded-2xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-300/60 outline-none"
            rows={3}
          />
          <div className="flex items-center justify-between gap-2">
            {error && <p className="text-[11px] text-red-300">{error}</p>}
            <button
              type="submit"
              className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-400/90 px-3 py-1.5 text-[11px] font-semibold text-emerald-950 hover:bg-emerald-300 transition-colors"
            >
              <span>Send reflection</span>
            </button>
          </div>
        </form>

        <div className="mt-3 space-y-3">
          {(post.comments || []).map((c) => (
            <motion.div
              key={c._id || c.createdAt}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-white/5 bg-slate-950/60 px-3 py-2.5"
            >
              <p className="text-[11px] font-medium text-emerald-100">
                {c.user?.name || 'Member'}
              </p>
              <p className="mt-1 text-xs text-slate-200/95">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default PostDetails;


