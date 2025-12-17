import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PostCard = ({ post, onLike }) => (
  <motion.article
    layout
    className="glass rounded-3xl p-4 sm:p-5 card-hover-soft flex flex-col gap-3"
  >
    <header className="flex items-start justify-between gap-3">
      <div>
        <p className="text-[11px] uppercase tracking-wide text-emerald-200/80">
          {post.anonymous ? 'Anonymous' : post.author?.name || 'Community member'}
        </p>
        <h3 className="mt-1 text-base sm:text-lg font-semibold text-slate-50">
          {post.title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-1.5 justify-end">
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full border border-emerald-200/40 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-100"
          >
            {tag}
          </span>
        ))}
      </div>
    </header>
    <p className="text-xs sm:text-sm text-slate-200/90 line-clamp-3">{post.content}</p>
    <footer className="mt-1 flex items-center justify-between text-[11px] sm:text-xs text-slate-300">
      <button
        type="button"
        className="relative inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-900/60 border border-white/5 like-pulse"
        onClick={() => (post._id?.startsWith('demo-') ? null : onLike?.(post._id))}
      >
        <svg
          className="w-3.5 h-3.5 text-rose-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <motion.path
            d="M12.1 5.1C10.3 3.3 7.4 3.4 5.7 5.1C3.9 6.9 3.9 9.7 5.7 11.5L12 17.8L18.3 11.5C20.1 9.7 20.1 6.9 18.3 5.1C16.6 3.4 13.7 3.3 11.9 5.1L12 5.2L12.1 5.1Z"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          />
        </svg>
        <span>{post.likes ?? 0} appreciated</span>
      </button>
      {post._id?.startsWith('demo-') ? (
        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full border border-sky-300/40 bg-sky-400/10 text-sky-100">
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              d="M6 9V15.5C6 15.78 6.22 16 6.5 16H14L18 19V6.5C18 6.22 17.78 6 17.5 6H9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{post.comments?.length || 0} reflections</span>
        </span>
      ) : (
        <Link
          to={`/forum/${post._id}`}
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full border border-sky-300/40 bg-sky-400/10 text-sky-100"
        >
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              d="M6 9V15.5C6 15.78 6.22 16 6.5 16H14L18 19V6.5C18 6.22 17.78 6 17.5 6H9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{post.comments?.length || 0} reflections</span>
        </Link>
      )}
    </footer>
  </motion.article>
);

export default PostCard;

