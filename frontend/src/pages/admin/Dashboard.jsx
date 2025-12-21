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
        
        const [overviewData, userData, wellnessData, forumData] = await Promise.all([
          adminApi.getOverview().catch(err => {
            console.error('[Dashboard] Overview error:', err);
            return null;
          }),
          adminApi.getUserAnalytics('7').catch(err => {
            console.error('[Dashboard] User analytics error:', err);
            return null;
          }),
          adminApi.getWellnessTrends().catch(err => {
            console.error('[Dashboard] Wellness trends error:', err);
            return null;
          }),
          adminApi.getForumAnalytics('7').catch(err => {
            console.error('[Dashboard] Forum analytics error:', err);
            return null;
          })
        ]);

        if (overviewData) {
          setOverview(overviewData);
        }
        if (userData) {
          setUserAnalytics(userData);
        }
        if (wellnessData) {
          setWellnessTrends(wellnessData);
        }
        if (forumData) {
          setForumAnalytics(forumData);
        }

        if (!overviewData && !userData && !wellnessData) {
          setError('Failed to load dashboard data. Please check your connection and try again.');
        }
      } catch (err) {
        console.error('[Dashboard] Unexpected error:', err);
        setError(err.response?.data?.message || 'An unexpected error occurred');
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
            <div key={i} className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 p-6 animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-slate-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error && !overview) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-red-500/30 p-8 text-center">
        <div className="text-red-400 mb-2">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-100 mb-2">Failed to Load Data</h3>
        <p className="text-slate-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Dashboard</h1>
        <p className="text-slate-400 mt-1">Analytics overview</p>
      </div>

      {/* Overview Cards */}
      {overview && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          <OverviewCard
            label="Total Users"
            value={overview.totalUsers || 0}
            type="totalUsers"
          />
          <OverviewCard
            label="Active Users"
            value={overview.activeUsers || 0}
            type="activeUsers"
          />
          <OverviewCard
            label="Forum Posts"
            value={overview.totalForumPosts || 0}
            type="totalForumPosts"
          />
          <OverviewCard
            label="AI Chats"
            value={overview.totalAiChats || 0}
            type="totalAiChats"
          />
          <OverviewCard
            label="Avg BMI"
            value={overview.averageBMI || 0}
            type="averageBMI"
          />
        </div>
      )}

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {userAnalytics?.dau && userAnalytics.dau.length > 0 && (
          <UserActivityChart data={userAnalytics.dau} />
        )}
        {userAnalytics?.newRegistrations && userAnalytics.newRegistrations.length > 0 && (
          <RegistrationsChart data={userAnalytics.newRegistrations} />
        )}
        {userAnalytics?.userStatusDistribution && userAnalytics.userStatusDistribution.length > 0 && (
          <UserStatusChart data={userAnalytics.userStatusDistribution} />
        )}
        {forumAnalytics?.postsPerDay && forumAnalytics.postsPerDay.length > 0 && (
          <ForumPostsChart data={forumAnalytics.postsPerDay} />
        )}
      </div>

      {wellnessTrends?.bmiDistribution && wellnessTrends.bmiDistribution.length > 0 && (
        <div className="lg:col-span-2">
          <BMICategoriesChart data={wellnessTrends.bmiDistribution} />
        </div>
      )}

      {/* Empty State */}
      {overview && 
       (!userAnalytics || Object.keys(userAnalytics).length === 0) &&
       (!wellnessTrends || Object.keys(wellnessTrends).length === 0) && (
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 p-8 text-center">
          <p className="text-slate-400">No analytics data available yet</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

