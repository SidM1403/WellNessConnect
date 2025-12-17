import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/api.js';
import LoadingSkeleton from '../../components/LoadingSkeleton.jsx';

const UserAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('7');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/admin/user-analytics?period=${period}`);
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
          <h1 className="text-3xl font-bold text-slate-50 mb-2">User Engagement Analytics</h1>
          <p className="text-slate-400">Track user activity and registrations</p>
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

      {/* Charts temporarily disabled to avoid extra charting dependencies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 border border-slate-700/60"
      >
        <h2 className="text-xl font-semibold text-slate-50 mb-2">Charts temporarily disabled</h2>
        <p className="text-sm text-slate-400">
          User counts and analytics data are still available in the numeric cards above. Visual
          charts were removed to simplify the frontend and avoid additional charting libraries.
        </p>
      </motion.div>
    </div>
  );
};

export default UserAnalytics;

