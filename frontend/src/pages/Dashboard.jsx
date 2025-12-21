import { useEffect, useMemo, useState } from 'react';
import api from '../api/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import PostCard from '../components/PostCard.jsx';
import MoodSelector from '../components/MoodSelector.jsx';
import HealthLogWidget from '../components/HealthLogWidget.jsx';
import SymptomTrackerWidget from '../components/SymptomTrackerWidget.jsx';
import WellnessTodoWidget from '../components/WellnessTodoWidget.jsx';
import BMICalculatorWidget from '../components/BMICalculatorWidget.jsx';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [moodHistory, setMoodHistory] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [analytics, setAnalytics] = useState({ mood: [], activity: { sessions: [], habits: [] } });
  const [loading, setLoading] = useState(true);

  const todayMood = useMemo(() => {
    const today = new Date();
    return moodHistory.find(
      (m) => new Date(m.createdAt).toDateString() === today.toDateString()
    );
  }, [moodHistory]);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [postRes, moodRes, sessionRes, moodAnalyticRes, actAnalyticRes] =
        await Promise.all([
          api.get('/posts', { params: { author: user?._id } }).catch(() => ({ data: { posts: [] } })),
          api.get('/mood/history').catch(() => ({ data: { history: [] } })),
          api.get('/sessions').catch(() => ({ data: { sessions: [] } })),
          api.get('/analytics/mood').catch(() => ({ data: { trend: [] } })),
          api.get('/analytics/activity').catch(() => ({ data: { sessions: [], habits: [] } }))
        ]);
      setPosts(postRes.data.posts || []);
      setMoodHistory(moodRes.data.history || []);
      setSessions(sessionRes.data.sessions || []);
      setAnalytics({
        mood: moodAnalyticRes.data.trend || [],
        activity: actAnalyticRes.data || { sessions: [], habits: [] }
      });
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadAll();
  }, [user]);

  const saveMood = async (value) => {
    await api.post('/mood', { value });
    const { data } = await api.get('/mood/history');
    setMoodHistory(data.history || []);
  };


  const MoodChart = () => {
    if (!analytics.mood.length) return <p className="text-sm text-text-light text-center py-4">No mood data yet.</p>;
    const points = analytics.mood.map((d, idx) => ({
      x: idx * 40,
      y: 80 - d.avg * 12
    }));
    const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return (
      <div className="relative h-24 w-full overflow-hidden">
        <svg viewBox="0 0 200 100" className="w-full h-full preserve-3d">
          <defs>
            <linearGradient id="moodGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#6366f1" floodOpacity="0.2" />
            </filter>
          </defs>
          <path d={path} fill="none" stroke="url(#moodGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#shadow)" />
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3" fill="#fff" stroke="#6366f1" strokeWidth="2" />
          ))}
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-10 pt-24">
      <motion.div
        className="card-premium p-8 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 -z-10" />
        <h2 className="text-3xl font-bold font-display text-text-primary">Welcome back, {user?.name}</h2>
        <p className="text-text-secondary mt-1">Track mood, daily wellness, and connect with your community.</p>
      </motion.div>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            <MoodSelector onSubmit={saveMood} todayMood={todayMood} />
            <HealthLogWidget />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <SymptomTrackerWidget />
            <motion.div
              className="card-premium p-6 space-y-4 border-l-4 border-l-primary-500"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-primary-500 font-bold">Sessions Completed</p>
                <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
              </div>
              <div>
                <p className="text-4xl font-bold text-text-primary">{sessions.length}</p>
                <p className="text-sm text-text-secondary">
                  breathing & meditation sessions
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div
              className="card-premium p-6 space-y-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs uppercase tracking-wide text-secondary-500 font-bold">
                  Mood Trend (30d)
                </p>
              </div>
              <MoodChart />
            </motion.div>
            <BMICalculatorWidget />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <WellnessTodoWidget />
            <motion.div
              className="card-premium p-6 space-y-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-sm font-bold text-accent-500 uppercase tracking-wide">Recent Community Posts</h3>
              <div className="space-y-4">
                {posts.slice(0, 2).map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
                {posts.length === 0 && (
                  <p className="text-sm text-text-light text-center py-4 italic">No posts yet. Share your journey!</p>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
