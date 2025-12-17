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
    if (!analytics.mood.length) return <p className="text-xs text-slate-400">No mood data yet.</p>;
    const points = analytics.mood.map((d, idx) => ({
      x: idx * 40,
      y: 80 - d.avg * 12
    }));
    const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    return (
      <svg viewBox="0 0 200 100" className="w-full h-24">
        <path d={path} fill="none" stroke="url(#moodGrad)" strokeWidth="3" strokeLinecap="round" />
        <defs>
          <linearGradient id="moodGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="glass glass-hover rounded-3xl p-5 sm:p-6 flex flex-col gap-2 border border-cyan-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gradient">Welcome back, {user?.name}</h2>
        <p className="text-sm text-slate-300">Track mood, daily wellness, and community.</p>
      </motion.div>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            <MoodSelector onSubmit={saveMood} todayMood={todayMood} />
            <HealthLogWidget />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <SymptomTrackerWidget />
            <motion.div 
              className="glass glass-hover rounded-3xl p-4 sm:p-5 space-y-2 border border-blue-500/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-[11px] uppercase tracking-wide text-cyan-400/80 font-semibold">Sessions</p>
              <p className="text-2xl font-bold text-blue-400">{sessions.length}</p>
              <p className="text-sm text-slate-300">
                breathing/meditation sessions
              </p>
            </motion.div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <motion.div 
              className="glass glass-hover rounded-3xl p-4 sm:p-5 space-y-3 border border-purple-500/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-[11px] uppercase tracking-wide text-purple-400/80 font-semibold">
                Mood trend (30d)
              </p>
              <MoodChart />
            </motion.div>
            <BMICalculatorWidget />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <WellnessTodoWidget />
            <motion.div 
              className="glass glass-hover rounded-3xl p-4 sm:p-5 space-y-3 border border-teal-500/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wide">Recent Posts</h3>
              <div className="space-y-3">
                {posts.slice(0, 2).map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
                {posts.length === 0 && (
                  <p className="text-sm text-slate-400">No posts yet. Create your first post!</p>
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
