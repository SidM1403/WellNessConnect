import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/api.js';
import LoadingSkeleton from '../../components/LoadingSkeleton.jsx';

const COLORS = ['#10b981', '#3b82f6'];

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

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-50 mb-2">AI Assistant Analytics</h1>
          <p className="text-slate-400">Usage metrics and performance insights</p>
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
          <p className="text-sm text-slate-400 mb-2">Total Chats</p>
          <p className="text-3xl font-bold text-slate-50">{data?.totalChats || 0}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <p className="text-sm text-slate-400 mb-2">Error Responses</p>
          <p className="text-3xl font-bold text-red-400">{data?.errorCount || 0}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          <p className="text-sm text-slate-400 mb-2">Topics Tracked</p>
          <p className="text-3xl font-bold text-emerald-400">
            {data?.topicsByMode?.length || 0}
          </p>
        </motion.div>
      </div>

      {/* Charts temporarily disabled to simplify frontend setup and avoid extra dependencies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 border border-slate-700/60"
      >
        <h2 className="text-xl font-semibold text-slate-50 mb-2">Charts temporarily disabled</h2>
        <p className="text-sm text-slate-400">
          Numerical analytics above are still accurate. Visual charts were removed to avoid extra
          charting libraries causing build issues.
        </p>
      </motion.div>
    </div>
  );
};

export default AIAnalytics;

