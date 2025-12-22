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
import CalorieNeedWidget from '../components/CalorieNeedWidget.jsx';
import { motion } from 'framer-motion';
import MagicBento, { ParticleCard } from '../components/MagicBento.jsx';

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
    if (!analytics.mood.length) return <p className="text-sm text-white/70 text-center py-4">No mood data yet.</p>;
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
    <div className="space-y-8 pb-10 pt-24 min-h-screen">
      <motion.div
        className="px-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold font-display text-text-primary">Welcome back, {user?.name}</h2>
        <p className="text-text-secondary mt-1">Track mood, daily wellness, and connect with your community.</p>
      </motion.div>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="px-4">
          <MagicBento>

            {/* 1. Mood Selector */}
            <ParticleCard glowColor="132, 0, 255">
              <div className="magic-bento-card__header">
                <div className="magic-bento-card__label">Daily Check-in</div>
              </div>
              <div className="magic-bento-card__content text-white">
                <MoodSelector onSubmit={saveMood} todayMood={todayMood} />
              </div>
            </ParticleCard>

            {/* 2. Health Log */}
            <ParticleCard glowColor="45, 212, 191">
              <div className="magic-bento-card__header">
                <div className="magic-bento-card__label">Health Log</div>
              </div>
              <div className="magic-bento-card__content text-white">
                <HealthLogWidget />
              </div>
            </ParticleCard>

            {/* 3. Symptom Tracker */}
            <ParticleCard glowColor="248, 113, 113">
              <div className="magic-bento-card__header">
                <div className="magic-bento-card__label">Body Scanner</div>
              </div>
              <div className="magic-bento-card__content text-white">
                <SymptomTrackerWidget />
              </div>
            </ParticleCard>

            {/* 4. Calorie Estimator (Replaces Mindfulness) */}
            <ParticleCard glowColor="251, 146, 60">
              <div className="magic-bento-card__header">
                <div className="magic-bento-card__label">Calorie Estimator</div>
                <div className="p-2 bg-white/10 rounded-lg text-orange-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
                </div>
              </div>
              <div className="magic-bento-card__content">
                <CalorieNeedWidget />
              </div>
            </ParticleCard>

            {/* 5. Mood Trend */}
            <ParticleCard glowColor="139, 92, 246">
              <div className="magic-bento-card__header">
                <div className="magic-bento-card__label">Mood Trend (30d)</div>
              </div>
              <div className="magic-bento-card__content">
                <MoodChart />
              </div>
            </ParticleCard>

            {/* 6. BMI Calculator */}
            <ParticleCard glowColor="56, 189, 248">
              <div className="magic-bento-card__header">
                <div className="magic-bento-card__label">Metrics</div>
              </div>
              <div className="magic-bento-card__content text-white">
                <BMICalculatorWidget />
              </div>
            </ParticleCard>

            {/* 7. Wellness Todo */}
            <ParticleCard glowColor="52, 211, 153">
              <div className="magic-bento-card__header">
                <div className="magic-bento-card__label">To-Do</div>
              </div>
              <div className="magic-bento-card__content text-white">
                <WellnessTodoWidget />
              </div>
            </ParticleCard>

            {/* 8. Recent Posts */}
            <ParticleCard glowColor="251, 146, 60">
              <div className="magic-bento-card__header">
                <div className="magic-bento-card__label">Community Highlights</div>
              </div>
              <div className="magic-bento-card__content space-y-4">
                {posts.slice(0, 2).map((post) => (
                  <div key={post._id} className="bg-gray-50 border border-gray-100 p-3 rounded-lg">
                    <PostCard post={post} compact={true} />
                  </div>
                ))}
                {posts.length === 0 && (
                  <p className="text-sm text-white/50 text-center py-4 italic">No posts yet.</p>
                )}
              </div>
            </ParticleCard>

          </MagicBento>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
