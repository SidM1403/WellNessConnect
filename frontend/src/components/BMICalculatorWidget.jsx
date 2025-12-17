import { useEffect, useState } from 'react';
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
    <div className="glass rounded-3xl p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-emerald-200/80">
            BMI calculator
          </p>
          <p className="text-sm text-slate-200">
            Simple body mass index estimate based on height and weight.
          </p>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
        <div className="space-y-1">
          <label className="block text-slate-300">Height (cm)</label>
          <input
            type="number"
            min="50"
            max="250"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-slate-300">Weight (kg)</label>
          <input
            type="number"
            min="10"
            max="350"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100"
          />
        </div>
        <div className="col-span-2">
          {error && <p className="text-xs text-red-300 mb-1">{error}</p>}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center rounded-xl bg-emerald-300 px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-950 shadow-soft-xl hover:bg-emerald-200 transition disabled:opacity-60"
          >
            {saving ? 'Calculating...' : 'Calculate & save BMI'}
          </button>
        </div>
      </form>

      {loading ? (
        <p className="text-xs text-slate-400">Loading latest BMI...</p>
      ) : result ? (
        <div className="space-y-1 text-sm">
          <p className="text-slate-200">
            BMI: <span className="font-semibold">{result.bmi}</span>
          </p>
          <p className="text-slate-200">
            Category: <span className="font-semibold">{categoryLabel(result.category)}</span>
          </p>
          <p className="text-[11px] text-slate-400">
            Recorded on {new Date(result.createdAt).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p className="text-xs text-slate-400">
          No BMI recorded yet. Enter your height and weight to calculate.
        </p>
      )}

      <div className="rounded-xl border border-white/5 bg-slate-900/60 p-3 text-[11px] text-slate-300">
        BMI is a general indicator, not a diagnosis. It does not account for muscle mass,
        body composition, or individual health circumstances. Always discuss concerns with a
        licensed healthcare professional.
      </div>
    </div>
  );
};

export default BMICalculatorWidget;


