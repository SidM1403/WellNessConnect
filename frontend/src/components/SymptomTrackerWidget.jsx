import React, { useEffect, useState } from 'react';
import api from '../api/api.js';

const SYMPTOMS = [
  { id: 'fatigue', label: 'Fatigue' },
  { id: 'headache', label: 'Headache' },
  { id: 'stress', label: 'Stress' },
  { id: 'body_pain', label: 'Body pain' }
];

const SymptomTrackerWidget = () => {
  const [selected, setSelected] = useState([]);
  const [severity, setSeverity] = useState(5);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadRecent = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/symptoms/recent');
      setHistory(data.logs || []);
    } catch (err) {
      console.error('Failed to load symptoms', err);
      setError('Unable to load recent symptom logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecent();
  }, []);

  const toggleSymptom = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSave = async (e) => {
    e?.preventDefault();
    setSaving(true);
    setError('');
    try {
      await api.post('/symptoms', { symptoms: selected, severity: Number(severity) || 1 });
      await loadRecent();
    } catch (err) {
      console.error('Failed to save symptom log', err);
      setError('Could not save today\'s symptoms.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card-premium p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-primary-500 font-bold">
            Symptom & Discomfort Tracker
          </p>
          <p className="text-sm text-text-secondary mt-1">
            Simple awareness of how your body feels today.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="flex flex-wrap gap-2 text-xs">
          {SYMPTOMS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => toggleSymptom(s.id)}
              className={`rounded-full border px-3 py-1.5 transition-all duration-200 ${selected.includes(s.id)
                ? 'border-primary-200 bg-primary-50 text-primary-600 font-medium'
                : 'border-surface-200 bg-surface-50 text-text-secondary hover:bg-surface-100'
                }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="space-y-2 text-sm">
          <label className="block font-medium text-text-secondary">
            Severity today: <span className="font-semibold text-primary-600">{severity}/10</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="w-full accent-primary-500 cursor-pointer"
          />
        </div>

        {error && <p className="text-xs text-coral-500 bg-coral-50 p-2 rounded-lg">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:shadow-none disabled:translate-y-0"
        >
          {saving ? 'Saving...' : 'Save Today\'s Symptoms'}
        </button>
      </form>

      <div className="pt-4 border-t border-surface-200 space-y-2">
        <p className="text-xs uppercase tracking-wide text-text-light font-semibold">
          Recent Days
        </p>
        {loading ? (
          <p className="text-xs text-text-light animate-pulse">Loading history...</p>
        ) : history.length === 0 ? (
          <p className="text-xs text-text-light">
            No recent symptom entries. Logging helps you notice patterns.
          </p>
        ) : (
          <ul className="space-y-2 text-xs text-text-secondary">
            {history.slice(0, 5).map((log) => (
              <li key={log._id} className="flex items-center justify-between p-2 rounded-lg bg-surface-50 border border-surface-100">
                <span>
                  <span className="font-medium text-text-primary">{new Date(log.date).toLocaleDateString()}</span> •{' '}
                  {log.symptoms.length ? log.symptoms.join(', ') : 'No symptoms'}
                </span>
                <span className="inline-flex items-center justify-center bg-primary-50 text-primary-600 rounded-md px-1.5 py-0.5 font-medium">
                  {log.severity}/10
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default React.memo(SymptomTrackerWidget);


