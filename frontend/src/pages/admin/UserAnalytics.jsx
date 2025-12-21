import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/api.js';
import { UserActivityChart, RegistrationsChart, UserStatusChart } from './Charts.jsx';
import OverviewCard from './OverviewCards.jsx';

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-text-primary">User Engagement Analytics</h1>
          <p className="text-text-secondary mt-1">Track user activity and registrations</p>
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

      {loading ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-3xl border border-surface-200 p-6 animate-pulse h-[300px]" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <OverviewCard label="Total Users" value={data?.totalUsers || 0} type="totalUsers" />
            <OverviewCard label="New (Period)" value={data?.newUsersPeriod || 0} type="activeUsers" />
            <OverviewCard label="Active" value={data?.activeUsers || 0} type="activeUsers" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <UserActivityChart data={data?.dau || []} />
            <RegistrationsChart data={data?.newRegistrations || []} />
            <UserStatusChart data={data?.userStatusDistribution || []} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAnalytics;
