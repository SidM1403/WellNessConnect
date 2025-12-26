import React, { useEffect, useState } from 'react';
import api from '../api/api.js';

const BMICalculatorWidget = () => {
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadLatest = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/bmi/latest');
      if (data.record) {
        setResult(data.record);
        setHeightCm(data.record.heightCm);
        setWeightKg(data.record.weightKg);
      }
    } catch (err) {
      console.error('Failed to load BMI record', err);
      setError('Unable to load your latest BMI record.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLatest();
  }, []);

  const handleCalculate = async (e) => {
    e?.preventDefault();
    setSaving(true);
    setError('');
    try {
      const { data } = await api.post('/bmi', {
        heightCm: Number(heightCm),
        weightKg: Number(weightKg)
      });
      setResult(data.record);
    } catch (err) {
      console.error('Failed to calculate BMI', err);
      const message = err.response?.data?.message || 'Could not calculate BMI.';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const categoryLabel = (cat) => {
    if (cat === 'underweight') return 'Underweight';
    if (cat === 'normal') return 'Normal';
    if (cat === 'overweight') return 'Overweight';
    if (cat === 'obese') return 'Obese';
    return 'Unknown';
  };

  return (
    <div className="card-premium p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-primary-500 font-bold">
            BMI Calculator
          </p>
          <p className="text-sm text-text-secondary mt-1">
            Simple body mass index estimate.
          </p>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-1.5">
          <label className="block font-medium text-text-secondary">Height (cm)</label>
          <input
            type="number"
            min="50"
            max="250"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            className="w-full rounded-xl bg-surface-50 border border-surface-200 px-4 py-2.5 text-text-primary focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none transition-all placeholder:text-text-light"
            placeholder="e.g. 175"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block font-medium text-text-secondary">Weight (kg)</label>
          <input
            type="number"
            min="10"
            max="350"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            className="w-full rounded-xl bg-surface-50 border border-surface-200 px-4 py-2.5 text-text-primary focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none transition-all placeholder:text-text-light"
            placeholder="e.g. 70"
          />
        </div>
        <div className="col-span-2 pt-2">
          {error && <p className="text-xs text-coral-500 bg-coral-50 p-2 rounded-lg mb-2">{error}</p>}
          <button
            type="submit"
            disabled={saving}
            className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:shadow-none disabled:translate-y-0"
          >
            {saving ? 'Calculating...' : 'Calculate & Save'}
          </button>
        </div>
      </form>

      {loading ? (
        <p className="text-xs text-text-light animate-pulse">Loading latest BMI...</p>
      ) : result ? (
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-text-light uppercase tracking-wide font-semibold">Result</p>
            <p className="text-2xl font-bold text-text-primary mt-1">{result.bmi}</p>
          </div>
          <div className="text-right">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${result.category === 'normal' ? 'bg-emerald-50 text-emerald-600' :
              result.category === 'underweight' ? 'bg-amber-50 text-amber-600' :
                'bg-coral-50 text-coral-600'
              }`}>
              {categoryLabel(result.category)}
            </span>
            <p className="text-xs text-text-light mt-1">
              {new Date(result.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-xs text-text-light text-center py-2">
          Enter height and weight to see your result.
        </p>
      )}

      <div className="text-[10px] text-text-light leading-snug">
        BMI is a general indicator, not a diagnosis. Always discuss concerns with a healthcare professional.
      </div>
    </div>
  );
};

export default React.memo(BMICalculatorWidget);


