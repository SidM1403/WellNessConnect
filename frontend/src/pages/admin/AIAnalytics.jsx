import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/api.js';
import { Bot, AlertCircle, Library } from 'lucide-react';

const AIAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('7');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/admin/ai-analytics?period=${period}`);
        setData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [period]);

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
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-text-primary">AI Assistant Analytics</h1>
          <p className="text-text-secondary mt-1">Usage metrics and performance insights</p>
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
            <div className="p-3 bg-purple-50 rounded-2xl text-purple-500">
              <Bot size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-text-primary">{data?.totalChats || 0}</p>
          <p className="text-sm font-medium text-text-secondary">Total Chats Initiated</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-premium p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-rose-50 rounded-2xl text-rose-500">
              <AlertCircle size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-text-primary">{data?.errorCount || 0}</p>
          <p className="text-sm font-medium text-text-secondary">Error Responses</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-premium p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-500">
              <Library size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-text-primary">
            {data?.topicsByMode?.length || 0}
          </p>
          <p className="text-sm font-medium text-text-secondary">Topics Tracked</p>
        </motion.div>
      </div>

      {/* Placeholder for future charting or list of top topics */}
      {data?.topicsByMode?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-premium p-6"
        >
          <h3 className="text-lg font-bold text-text-primary mb-4">Top Topics</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {data.topicsByMode.map((topic, idx) => (
              <div k={idx} className="flex items-center justify-between p-3 bg-surface-50 rounded-xl border border-surface-100">
                <span className="font-medium text-text-primary">{topic._id || 'General'}</span>
                <span className="text-sm text-text-secondary">{topic.count} queries</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AIAnalytics;
