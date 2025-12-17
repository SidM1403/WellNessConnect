import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import BreathingCircle from '../components/BreathingCircle.jsx';
import EmptyState from '../components/EmptyState.jsx';
import StatCard from '../components/StatCard.jsx';
import api from '../api/api.js';
import SkeletonLoader from '../components/SkeletonLoader.jsx';

const GuidedActivities = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/sessions');
      setSessions(data.sessions || []);
    } catch {
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleComplete = async (duration) => {
    await api.post('/sessions', { type: 'breath', durationSeconds: duration });
    load();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Guided activities"
        subtitle="Breathing and meditation prompts connected to your live session logs."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {loading ? (
          <SkeletonLoader lines={3} />
        ) : (
          <>
            <StatCard
              label="Total sessions"
              value={sessions.length}
              hint="Count from /api/sessions"
            />
            <StatCard
              label="Last session"
              value={sessions[0] ? `${Math.round(sessions[0].durationSeconds || 0)}s` : '—'}
              hint={sessions[0]?.completedAt ? new Date(sessions[0].completedAt).toLocaleString() : 'No sessions yet'}
              accent="sky"
            />
            <StatCard
              label="This week"
              value={
                sessions.filter(
                  (s) =>
                    new Date(s.completedAt).getTime() >
                    Date.now() - 7 * 24 * 60 * 60 * 1000
                ).length
              }
              hint="Sessions in last 7 days"
            />
          </>
        )}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <BreathingCircle onComplete={handleComplete} />
        <EmptyState
          title="Meditation scripts"
          message="Connect this card to your meditation API when ready."
        />
      </div>
    </div>
  );
};

export default GuidedActivities;

