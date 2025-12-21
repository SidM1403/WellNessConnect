import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import OverviewCard from './OverviewCards.jsx';
import { UserActivityChart, RegistrationsChart, BMICategoriesChart, UserStatusChart, ForumPostsChart } from './Charts.jsx';
import adminApi from '../../services/adminApi.js';

const Dashboard = () => {
  const [overview, setOverview] = useState(null);
  const [userAnalytics, setUserAnalytics] = useState(null);
  const [wellnessTrends, setWellnessTrends] = useState(null);
  const [forumAnalytics, setForumAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('[Dashboard] Fetching all data...');

        // Use Promise.allSettled to allow some requests to fail without breaking everything
        const results = await Promise.allSettled([
          adminApi.getOverview(),
          adminApi.getUserAnalytics('7'),
          adminApi.getWellnessTrends(),
          adminApi.getForumAnalytics('7')
        ]);

        const [overviewRes, userRes, wellnessRes, forumRes] = results;

        if (overviewRes.status === 'fulfilled') setOverview(overviewRes.value);
        if (userRes.status === 'fulfilled') setUserAnalytics(userRes.value);
        if (wellnessRes.status === 'fulfilled') setWellnessTrends(wellnessRes.value);
        if (forumRes.status === 'fulfilled') setForumAnalytics(forumRes.value);

        // Only show error if EVERYTHING failed
        if (results.every(r => r.status === 'rejected')) {
          setError('Failed to load dashboard data. Please check your connection.');
        }

      } catch (err) {
        console.error('[Dashboard] Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-3xl border border-surface-200 p-6 animate-pulse shadow-sm">
              <div className="h-4 bg-surface-100 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-surface-100 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error && !overview) {
    return (
      <div className="bg-white rounded-3xl border border-coral-200 p-8 text-center shadow-lg shadow-coral-500/10">
        <div className="text-coral-500 mb-2">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-text-primary mb-2">Failed to Load Data</h3>
        <p className="text-text-secondary mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold shadow-lg shadow-primary-500/30"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-display text-text-primary">Dashboard Overview</h1>
        <p className="text-text-secondary mt-1">Welcome to the admin control center.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <OverviewCard
          label="Total Users"
          value={overview?.totalUsers || 0}
          type="totalUsers"
        />
        <OverviewCard
          label="Active Users"
          value={overview?.activeUsers || 0}
          type="activeUsers"
        />
        <OverviewCard
          label="Forum Posts"
          value={overview?.totalForumPosts || 0}
          type="totalForumPosts"
        />
        <OverviewCard
          label="AI Chats"
          value={overview?.totalAiChats || 0}
          type="totalAiChats"
        />
        <OverviewCard
          label="Avg BMI"
          value={overview?.averageBMI || 0}
          type="averageBMI"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <UserActivityChart data={userAnalytics?.dau || []} />
        <RegistrationsChart data={userAnalytics?.newRegistrations || []} />
        <UserStatusChart data={userAnalytics?.userStatusDistribution || []} />
        <ForumPostsChart data={forumAnalytics?.postsPerDay || []} />
      </div>

      <div className="lg:col-span-2">
        <BMICategoriesChart data={wellnessTrends?.bmiDistribution || []} />
      </div>

      {/* Empty State */}
      {!overview && !userAnalytics && !wellnessTrends && (
        <div className="card-premium p-12 text-center">
          <p className="text-text-light font-medium">No analytics data available just yet.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
