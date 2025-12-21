import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/api.js';
import { ForumPostsChart } from './Charts.jsx';
import { MessageSquare, AlertTriangle, Activity, Trash2 } from 'lucide-react';

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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-10 w-1/3 bg-surface-100 rounded-xl animate-pulse" />
          <div className="h-10 w-32 bg-surface-100 rounded-xl animate-pulse" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-white rounded-3xl border border-surface-200 animate-pulse" />
          ))}
        </div>
        <div className="h-64 bg-white rounded-3xl border border-surface-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-text-primary">Forum Analytics</h1>
          <p className="text-text-secondary mt-1">Monitor community engagement and moderation</p>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 bg-white border border-surface-200 rounded-xl text-text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
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
          className="card-premium p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-500">
              <MessageSquare size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-text-primary">{data?.totalThreads || 0}</p>
          <p className="text-sm font-medium text-text-secondary">Total Threads</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-premium p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-rose-50 rounded-2xl text-rose-500">
              <AlertTriangle size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-text-primary">{data?.reportedCount || 0}</p>
          <p className="text-sm font-medium text-text-secondary">Reported Posts</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-premium p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-500">
              <Activity size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-text-primary">
            {data?.activeTopics?.length || 0}
          </p>
          <p className="text-sm font-medium text-text-secondary">Active Topics</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ForumPostsChart data={data?.postsPerDay || []} />
      </motion.div>

      {reportedPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-premium p-6"
        >
          <h2 className="text-xl font-bold text-text-primary mb-6">Reported Posts</h2>
          <div className="space-y-4 max-h-96 overflow-auto pr-2 custom-scrollbar">
            {reportedPosts.map((post) => (
              <div
                key={post._id}
                className="bg-rose-50 border border-rose-100 rounded-xl p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{post.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.content}</p>
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                      <span>By {post.author?.name || 'Unknown'}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="text-rose-600">{post.reportedCount || 0} reports</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="p-2 rounded-lg bg-white text-rose-500 shadow-sm border border-rose-100 hover:bg-rose-500 hover:text-white transition-all"
                    title="Delete Post"
                  >
                    <Trash2 size={18} />
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
