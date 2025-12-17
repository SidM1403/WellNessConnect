import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/api.js';
import LoadingSkeleton from '../../components/LoadingSkeleton.jsx';

const ForumAnalytics = () => {
  const [data, setData] = useState(null);
  const [reportedPosts, setReportedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('7');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [analyticsRes, reportedRes] = await Promise.all([
          api.get(`/admin/forum-analytics?period=${period}`),
          api.get('/admin/posts/reported')
        ]);
        setData(analyticsRes.data);
        setReportedPosts(reportedRes.data.posts || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [period]);

  const handleDeletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.delete(`/admin/posts/${id}`);
      setReportedPosts(reportedPosts.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-50 mb-2">Forum Analytics</h1>
          <p className="text-slate-400">Monitor community engagement and moderation</p>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="glass rounded-xl px-4 py-2 text-slate-50 border border-white/10"
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6"
        >
          <p className="text-sm text-slate-400 mb-2">Total Threads</p>
          <p className="text-3xl font-bold text-slate-50">{data?.totalThreads || 0}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <p className="text-sm text-slate-400 mb-2">Reported Posts</p>
          <p className="text-3xl font-bold text-red-400">{data?.reportedCount || 0}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          <p className="text-sm text-slate-400 mb-2">Active Topics</p>
          <p className="text-3xl font-bold text-emerald-400">
            {data?.activeTopics?.length || 0}
          </p>
        </motion.div>
      </div>

      {/* Charts temporarily disabled to avoid extra charting dependencies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 border border-slate-700/60"
      >
        <h2 className="text-xl font-semibold text-slate-50 mb-2">Charts temporarily disabled</h2>
        <p className="text-sm text-slate-400">
          Thread counts, reports, and topic metrics above are still accurate. Visual forum charts
          were removed to simplify the frontend and avoid additional chart libraries.
        </p>
      </motion.div>

      {reportedPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-slate-50 mb-4">Reported Posts</h2>
          <div className="space-y-3 max-h-96 overflow-auto">
            {reportedPosts.map((post) => (
              <div
                key={post._id}
                className="border border-red-500/30 rounded-xl p-4 bg-red-500/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-50 mb-1">{post.title}</h3>
                    <p className="text-sm text-slate-400 mb-2 line-clamp-2">{post.content}</p>
                    <p className="text-xs text-slate-500">
                      By {post.author?.name || 'Unknown'} • {post.reportedCount || 0} reports
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ForumAnalytics;

