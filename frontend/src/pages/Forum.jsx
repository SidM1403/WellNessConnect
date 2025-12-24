import { useEffect, useState } from 'react';
import api from '../api/api.js';
import PostCard from '../components/PostCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaSearch, FaFilter, FaUsers } from 'react-icons/fa';

const tags = ['Mental', 'Fitness', 'Diet', 'Mindfulness', 'Therapy', 'Stress', 'Anxiety', 'Sleep'];

const fallbackPosts = [
  {
    _id: 'demo-post-1',
    title: 'How I use breathing to calm anxiety',
    content:
      'I realized that a simple box breathing technique (4-4-4-4) before every meeting has completely changed my stress levels. Has anyone else tried this?',
    tags: ['Mindfulness', 'Anxiety'],
    likes: 42,
    comments: [{ _id: 'demo-c1', text: 'Yes! It works wonders.', user: { name: 'Sarah' } }],
    author: { name: 'Alex M.' }
  },
  {
    _id: 'demo-post-2',
    title: 'Small habit changes for better sleep',
    content:
      'I started leaving my phone in the kitchen at night and reading deeper fiction books. My deep sleep score went up by 15% in a week.',
    tags: ['Sleep', 'Mental'],
    likes: 28,
    comments: [{ _id: 'demo-c2', text: 'Digital sunset is key.', user: { name: 'David' } }],
    author: { name: 'Jamie L.' }
  },
  {
    _id: 'demo-post-3',
    title: 'Dealing with imposter syndrome',
    content: 'It feels like everyone has it together except me. How do you all cope with feelings of inadequacy at work?',
    tags: ['Mental', 'Therapy'],
    likes: 35,
    comments: [],
    author: { name: 'Anonymous' },
    anonymous: true
  }
];

const Forum = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ search: '', tag: '' });
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', tags: [], anonymous: false });

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/posts', { params: filters });
      const incoming = data.posts || [];
      setPosts(incoming.length ? incoming : fallbackPosts);
    } catch {
      setPosts(fallbackPosts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [filters]);

  const create = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      await api.post('/posts', { ...form, tags: form.tags.filter(Boolean) });
      setForm({ title: '', content: '', tags: [], anonymous: false });
      setShowCreate(false);
      load();
    } catch (err) {
      console.error("Failed to post", err);
    }
  };

  const like = async (id) => {
    if (id?.startsWith('demo-')) return;
    await api.patch(`/posts/${id}/like`);
    load();
  };

  return (
    <div className="pt-28 pb-16 min-h-screen bg-surface-50 dark:bg-dark-surface-50">
      <div className="max-w-6xl mx-auto px-4">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-2"
            >
              <span className="p-2 bg-primary-100 text-primary-600 rounded-lg"><FaUsers /></span>
              <span className="text-sm font-bold tracking-wide text-primary-600 dark:text-dark-primary-600 uppercase">Community Forum</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary"
            >
              Join the conversation
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-3"
          >
            {user && (
              <button
                onClick={() => setShowCreate(!showCreate)}
                className="btn-primary flex items-center gap-2 shadow-lg shadow-primary-500/25"
              >
                <FaPlus className="text-sm" />
                <span>Start Discussion</span>
              </button>
            )}
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-dark-surface-100 p-5 rounded-3xl shadow-sm border border-surface-200 dark:border-dark-surface-200 sticky top-32">
              <h3 className="font-bold text-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
                <FaFilter className="text-primary-500" /> Filters
              </h3>

              <div className="space-y-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-3 text-text-light dark:text-dark-text-light" />
                  <input
                    placeholder="Search topics..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface-50 dark:bg-dark-surface-200 border border-surface-200 dark:border-dark-surface-200 text-sm focus:ring-2 focus:ring-primary-200 dark:focus:ring-dark-primary-200 focus:border-primary-400 dark:focus:border-dark-primary-400 outline-none transition-all"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-text-secondary dark:text-dark-text-secondary uppercase tracking-wider mb-2 block">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFilters({ ...filters, tag: '' })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.tag === '' ? 'bg-primary-500 text-white shadow-md' : 'bg-surface-100 dark:bg-dark-surface-200 text-text-secondary dark:text-dark-text-secondary hover:bg-surface-200 dark:hover:bg-dark-surface-300'
                        }`}
                    >
                      All
                    </button>
                    {tags.map(t => (
                      <button
                        key={t}
                        onClick={() => setFilters({ ...filters, tag: t })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.tag === t ? 'bg-primary-500 text-white shadow-md' : 'bg-surface-100 dark:bg-dark-surface-200 text-text-secondary dark:text-dark-text-secondary hover:bg-surface-200 dark:hover:bg-dark-surface-300'
                          }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-6">
            <AnimatePresence>
              {showCreate && (
                <motion.form
                  initial={{ opacity: 0, height: 0, mb: 0 }}
                  animate={{ opacity: 1, height: 'auto', mb: 24 }}
                  exit={{ opacity: 0, height: 0, mb: 0 }}
                  className="bg-white dark:bg-dark-surface-100 p-6 rounded-[2rem] shadow-lg border border-primary-100 dark:border-dark-primary-200 overflow-hidden"
                  onSubmit={create}
                >
                  <h3 className="font-bold text-lg text-text-primary dark:text-dark-text-primary mb-4">Create a new discussion</h3>
                  <div className="space-y-4">
                    <input
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-dark-surface-200 rounded-xl border border-surface-200 dark:border-dark-surface-200 focus:ring-2 focus:ring-primary-200 dark:focus:ring-dark-primary-200 outline-none transition-all"
                      placeholder="What's on your mind?"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      required
                    />
                    <textarea
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-dark-surface-200 rounded-xl border border-surface-200 dark:border-dark-surface-200 focus:ring-2 focus:ring-primary-200 dark:focus:ring-dark-primary-200 outline-none transition-all min-h-[100px]"
                      placeholder="Share your thoughts, experiences, or questions..."
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      required
                    />

                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map(t => (
                        <label key={t} className={`cursor-pointer px-3 py-1 rounded-full text-xs font-medium border transition-all ${form.tags.includes(t)
                          ? 'bg-primary-50 border-primary-200 text-primary-700'
                          : 'bg-white dark:bg-dark-surface-100 border-surface-200 dark:border-dark-surface-200 text-text-secondary dark:text-dark-text-secondary hover:border-primary-200 dark:hover:border-dark-primary-200'
                          }`}>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={form.tags.includes(t)}
                            onChange={(e) => setForm(prev => ({
                              ...prev,
                              tags: e.target.checked ? [...prev.tags, t] : prev.tags.filter(tg => tg !== t)
                            }))}
                          />
                          {t}
                        </label>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <label className="flex items-center gap-2 text-sm text-text-secondary dark:text-dark-text-secondary cursor-pointer">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${form.anonymous ? 'bg-primary-500 border-primary-500 text-white' : 'border-surface-300 bg-white'}`}>
                          {form.anonymous && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <input type="checkbox" className="hidden" checked={form.anonymous} onChange={(e) => setForm({ ...form, anonymous: e.target.checked })} />
                        Post Anonymously
                      </label>
                      <div className="flex gap-3">
                        <button type="button" onClick={() => setShowCreate(false)} className="px-5 py-2 text-text-secondary dark:text-dark-text-secondary font-medium hover:bg-surface-100 dark:hover:bg-dark-surface-200 rounded-xl transition-colors">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-primary-600 text-white rounded-xl font-medium shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all">Post</button>
                      </div>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-12 text-text-light dark:text-dark-text-light">Loading community...</div>
              ) : (
                <>
                  {posts.map((p) => (
                    <PostCard key={p._id} post={p} onLike={like} />
                  ))}
                  {posts.length === 0 && <div className="text-center py-12 text-text-secondary dark:text-dark-text-secondary italic bg-white dark:bg-dark-surface-100 rounded-3xl border border-surface-100 dark:border-dark-surface-200">No discussions found. Be the first to start one!</div>}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;


