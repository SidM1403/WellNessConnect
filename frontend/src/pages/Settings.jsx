import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import api from '../api/api.js';
import SkeletonLoader from '../components/SkeletonLoader.jsx';

const Settings = () => {
  const [prefs, setPrefs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/preferences');
      setPrefs(data.preferences);
      applyPrefs(data.preferences);
    } catch (e) {
      setError('Unable to load preferences.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const applyPrefs = (preferences) => {
    if (!preferences) return;
    document.documentElement.dataset.theme = preferences.darkMode ? 'dark' : 'light';
    document.body.classList.toggle('reduced-motion', !!preferences.reducedMotion);
  };

  const updatePrefs = async (changes) => {
    try {
      const { data } = await api.put('/preferences', { ...prefs, ...changes });
      setPrefs(data.preferences);
      applyPrefs(data.preferences);
    } catch (e) {
      setError('Unable to save preferences.');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Personalize your experience. These toggles are backed by /api/preferences."
      />
      <div className="glass rounded-3xl p-4 sm:p-5 space-y-3">
        {loading ? (
          <SkeletonLoader lines={3} />
        ) : (
          <>
            {error && <p className="text-xs text-red-300">{error}</p>}
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => updatePrefs({ darkMode: !prefs?.darkMode })}
                className="rounded-full border border-white/10 px-3 py-2"
              >
                Dark mode: {prefs?.darkMode ? 'On' : 'Off'}
              </button>
              <button
                onClick={() => updatePrefs({ reducedMotion: !prefs?.reducedMotion })}
                className="rounded-full border border-white/10 px-3 py-2"
              >
                Motion: {prefs?.reducedMotion ? 'Reduced' : 'Full'}
              </button>
              <button
                onClick={() => updatePrefs({ layout: prefs?.layout === 'cozy' ? 'balanced' : 'cozy' })}
                className="rounded-full border border-white/10 px-3 py-2"
              >
                Layout: {prefs?.layout || 'balanced'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;

