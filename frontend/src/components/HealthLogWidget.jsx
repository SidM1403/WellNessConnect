import { useEffect, useState } from 'react';
import api from '../api/api.js';

const emptyLog = {
  _id: null,
  sleepHours: '',
  waterGlasses: '',
  activityMinutes: '',
  energyLevel: ''
};

const HealthLogWidget = () => {
  const [log, setLog] = useState(emptyLog);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadToday = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/health-log/today');
      if (data.log) {
        setLog({
          _id: data.log._id,
          sleepHours: data.log.sleepHours ?? '',
          waterGlasses: data.log.waterGlasses ?? '',
          activityMinutes: data.log.activityMinutes ?? '',
          energyLevel: data.log.energyLevel ?? ''
        });
      } else {
        setLog(emptyLog);
      }
    } catch (err) {
      console.error('Failed to load health log', err);
      setError('Unable to load today\'s health log.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadToday();
  }, []);

  const handleChange = (field, value) => {
    setLog((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e?.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        sleepHours: Number(log.sleepHours) || 0,
        waterGlasses: Number(log.waterGlasses) || 0,
        activityMinutes: Number(log.activityMinutes) || 0,
        energyLevel: Number(log.energyLevel) || 1
      };

      const { data } = log._id
        ? await api.put(`/health-log/${log._id}`, payload)
        : await api.post('/health-log', payload);

      setLog({
        _id: data.log._id,
        sleepHours: data.log.sleepHours ?? '',
        waterGlasses: data.log.waterGlasses ?? '',
        activityMinutes: data.log.activityMinutes ?? '',
        energyLevel: data.log.energyLevel ?? ''
      });
    } catch (err) {
      console.error('Failed to save health log', err);
      setError('Could not save your daily health log.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="glass rounded-3xl p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-emerald-200/80">
            Daily Health Log
          </p>
          <p className="text-sm text-slate-200">
            Capture today&apos;s basics: sleep, water, movement, and energy.
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Loading today&apos;s log...</p>
      ) : (
        <form onSubmit={handleSave} className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="space-y-1">
              <label className="block text-slate-300">Sleep (hours)</label>
              <input
                type="number"
                min="0"
                max="24"
                step="0.5"
                value={log.sleepHours}
                onChange={(e) => handleChange('sleepHours', e.target.value)}
                className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-slate-300">Water (glasses)</label>
              <input
                type="number"
                min="0"
                max="40"
                value={log.waterGlasses}
                onChange={(e) => handleChange('waterGlasses', e.target.value)}
                className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-slate-300">Activity (minutes)</label>
              <input
                type="number"
                min="0"
                max="1440"
                value={log.activityMinutes}
                onChange={(e) => handleChange('activityMinutes', e.target.value)}
                className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-slate-300">Energy (1–5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={log.energyLevel}
                onChange={(e) => handleChange('energyLevel', e.target.value)}
                className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100"
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-300">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center rounded-xl bg-emerald-300 px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-950 shadow-soft-xl hover:bg-emerald-200 transition disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save today\'s log'}
          </button>
        </form>
      )}
    </div>
  );
};

export default HealthLogWidget;


