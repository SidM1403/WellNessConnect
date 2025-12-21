import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaComment, FaUserSecret, FaUser } from 'react-icons/fa';

const PostCard = ({ post, onLike }) => (
  <motion.article
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -5, shadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
    className="bg-white rounded-[2rem] p-6 border border-surface-200 shadow-sm transition-all duration-300"
  >
    <header className="flex items-start justify-between gap-3 mb-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${post.anonymous ? 'bg-surface-100 text-text-secondary' : 'bg-primary-50 text-primary-500'}`}>
          {post.anonymous ? <FaUserSecret /> : <FaUser />}
        </div>
        <div>
          <h3 className="font-bold text-text-primary text-lg leading-tight group-hover:text-primary-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-xs font-medium text-text-light mt-0.5">
            {post.anonymous ? 'Anonymous Member' : post.author?.name || 'Community Member'} • 2h ago
          </p>
        </div>
      </div>
    </header>

    <div className="mb-4">
      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full border border-surface-200 bg-surface-50 px-2.5 py-1 text-xs font-semibold text-text-secondary hover:bg-primary-50 hover:text-primary-600 transition-colors"
          >
            #{tag}
          </span>
        ))}
      </div>
      <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
        {post.content}
      </p>
    </div>

    <footer className="pt-4 border-t border-surface-100 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => (post._id?.startsWith('demo-') ? null : onLike?.(post._id))}
          className="flex items-center gap-2 text-sm font-medium text-text-light hover:text-coral-500 transition-colors group"
        >
          <div className="p-2 rounded-full group-hover:bg-coral-50 transition-colors">
            <FaHeart className={`w-4 h-4 ${post.liked ? 'text-coral-500' : ''}`} />
          </div>
          <span>{post.likes ?? 0}</span>
        </button>

        <Link
          to={`/forum/${post._id}`}
          className="flex items-center gap-2 text-sm font-medium text-text-light hover:text-primary-500 transition-colors group"
        >
          <div className="p-2 rounded-full group-hover:bg-primary-50 transition-colors">
            <FaComment className="w-4 h-4" />
          </div>
          <span>{post.comments?.length || 0}</span>
        </Link>
      </div>

      <Link
        to={`/forum/${post._id}`}
        className="text-xs font-semibold text-primary-600 hover:underline"
      >
        Read Discussion →
      </Link>
    </footer>
  </motion.article>
);

export default PostCard;


