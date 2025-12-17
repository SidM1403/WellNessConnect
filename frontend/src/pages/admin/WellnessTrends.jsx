import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/api.js';
import LoadingSkeleton from '../../components/LoadingSkeleton.jsx';

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

const WellnessTrends = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/admin/wellness-trends');
        setData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSkeleton />;

  const bmiData = data?.bmiDistribution || [];
  const stressData = data?.stressDistribution || [];
  const symptomData = data?.topSymptoms || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-50 mb-2">Wellness Trends</h1>
        <p className="text-slate-400">Aggregated and anonymous health insights</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
      >
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-emerald-400 mb-2">
              {data?.avgSleepHours || 0}h
            </p>
            <p className="text-sm text-slate-400">Average Sleep Hours</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-400 mb-2">
              {symptomData.length}
            </p>
            <p className="text-sm text-slate-400">Tracked Symptoms</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-purple-400 mb-2">
              {bmiData.length}
            </p>
            <p className="text-sm text-slate-400">BMI Categories</p>
          </div>
        </div>
      </motion.div>

      {/* Charts temporarily disabled to avoid extra charting dependencies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 border border-slate-700/60"
      >
        <h2 className="text-xl font-semibold text-slate-50 mb-2">Charts temporarily disabled</h2>
        <p className="text-sm text-slate-400">
          Summary wellness metrics above are still accurate. Detailed visual trend charts were
          removed to simplify the frontend and avoid additional chart libraries.
        </p>
      </motion.div>
    </div>
  );
};

export default WellnessTrends;

