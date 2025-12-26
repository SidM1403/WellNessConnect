import React, { useEffect, useState } from 'react';
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
      // Optional success feedback logic here if needed
    } catch (err) {
      console.error('Failed to save health log', err);
      setError('Could not save your daily health log.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card-premium p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-primary-500 font-bold">
            Daily Health Log
          </p>
          <p className="text-sm text-text-secondary mt-1">
            Capture today&apos;s basics: sleep, water, movement, and energy.
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-text-light animate-pulse">Loading today&apos;s log...</p>
      ) : (
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-secondary">Sleep (hrs)</label>
              <input
                type="number"
                min="0"
                max="24"
                step="0.5"
                placeholder="0"
                value={log.sleepHours}
                onChange={(e) => handleChange('sleepHours', e.target.value)}
                className="w-full rounded-xl bg-surface-50 border border-surface-200 px-4 py-2.5 text-text-primary focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-secondary">Water (cups)</label>
              <input
                type="number"
                min="0"
                max="40"
                placeholder="0"
                value={log.waterGlasses}
                onChange={(e) => handleChange('waterGlasses', e.target.value)}
                className="w-full rounded-xl bg-surface-50 border border-surface-200 px-4 py-2.5 text-text-primary focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-secondary">Activity (min)</label>
              <input
                type="number"
                min="0"
                max="1440"
                placeholder="0"
                value={log.activityMinutes}
                onChange={(e) => handleChange('activityMinutes', e.target.value)}
                className="w-full rounded-xl bg-surface-50 border border-surface-200 px-4 py-2.5 text-text-primary focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-secondary">Energy (1–5)</label>
              <input
                type="number"
                min="1"
                max="5"
                placeholder="1-5"
                value={log.energyLevel}
                onChange={(e) => handleChange('energyLevel', e.target.value)}
                className="w-full rounded-xl bg-surface-50 border border-surface-200 px-4 py-2.5 text-text-primary focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {error && <p className="text-xs text-coral-500 bg-coral-50 p-2 rounded-lg">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:shadow-none disabled:translate-y-0"
          >
            {saving ? 'Saving...' : 'Save Today\'s Log'}
          </button>
        </form>
      )}
    </div>
  );
};

export default React.memo(HealthLogWidget);
