import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/api.js';
import { BMICategoriesChart } from './Charts.jsx';
import { FaBed, FaNotesMedical, FaWeight } from 'react-icons/fa';

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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-20 w-1/3 bg-surface-100 rounded-xl animate-pulse" />
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-white rounded-3xl border border-surface-200 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  const bmiData = data?.bmiDistribution || [];
  const symptomData = data?.topSymptoms || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display text-text-primary">Wellness Trends</h1>
        <p className="text-text-secondary mt-1">Aggregated and anonymous health insights from the community</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-premium p-8"
      >
        <div className="grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-surface-200">
          <div className="text-center p-4">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <FaBed className="w-6 h-6" />
            </div>
            <p className="text-4xl font-bold text-text-primary mb-1">
              {data?.avgSleepHours || 0}<span className="text-lg text-text-light font-normal">h</span>
            </p>
            <p className="text-sm font-medium text-text-secondary">Avg Sleep Duration</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
              <FaNotesMedical className="w-6 h-6" />
            </div>
            <p className="text-4xl font-bold text-text-primary mb-1">
              {symptomData.length}
            </p>
            <p className="text-sm font-medium text-text-secondary">Unique Symptoms Tracked</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
              <FaWeight className="w-6 h-6" />
            </div>
            <p className="text-4xl font-bold text-text-primary mb-1">
              {bmiData.length}
            </p>
            <p className="text-sm font-medium text-text-secondary">BMI Categories</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <BMICategoriesChart data={bmiData} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-premium p-6"
        >
          <h3 className="text-lg font-bold text-text-primary mb-6">Top Reported Symptoms</h3>
          {symptomData.length === 0 ? (
            <p className="text-text-light text-center py-10 italic">No symptom data available</p>
          ) : (
            <div className="space-y-4">
              {symptomData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <span className="text-sm font-bold text-text-light w-6 text-center">{idx + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-semibold text-text-primary capitalize">{item._id}</span>
                      <span className="text-xs text-text-secondary">{item.count} reports</span>
                    </div>
                    <div className="h-2 w-full bg-surface-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(item.count / symptomData[0].count) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default WellnessTrends;
