import { useEffect, useState } from 'react';
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
    <div className="glass rounded-3xl p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-sky-200/80">
            Symptom & discomfort tracker
          </p>
          <p className="text-sm text-slate-200">
            Simple awareness of how your body feels today. No diagnosis or advice.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-3">
        <div className="flex flex-wrap gap-2 text-xs">
          {SYMPTOMS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => toggleSymptom(s.id)}
              className={`rounded-full border px-3 py-1 ${
                selected.includes(s.id)
                  ? 'border-emerald-300 bg-emerald-300/20 text-emerald-100'
                  : 'border-white/10 bg-slate-900/60 text-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="space-y-1 text-xs sm:text-sm">
          <label className="block text-slate-300">
            Severity today: <span className="font-semibold">{severity}/10</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="w-full"
          />
        </div>

        {error && <p className="text-xs text-red-300">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center rounded-xl bg-sky-300 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 shadow-soft-xl hover:bg-sky-200 transition disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save today\'s symptoms'}
        </button>
      </form>

      <div className="pt-2 border-t border-white/5 space-y-1">
        <p className="text-[11px] uppercase tracking-wide text-slate-300">
          Recent days
        </p>
        {loading ? (
          <p className="text-xs text-slate-400">Loading history...</p>
        ) : history.length === 0 ? (
          <p className="text-xs text-slate-400">
            No recent symptom entries. Logging helps you notice patterns.
          </p>
        ) : (
          <ul className="space-y-1 text-xs text-slate-300">
            {history.slice(0, 5).map((log) => (
              <li key={log._id} className="flex items-center justify-between">
                <span>
                  {new Date(log.date).toLocaleDateString()} •{' '}
                  {log.symptoms.length ? log.symptoms.join(', ') : 'No symptoms'}
                </span>
                <span className="text-slate-400">Severity {log.severity}/10</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SymptomTrackerWidget;


