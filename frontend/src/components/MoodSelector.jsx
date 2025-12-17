import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const moods = [
  { value: 1, label: 'Low', emoji: '🌧️' },
  { value: 2, label: 'Soft', emoji: '🌤️' },
  { value: 3, label: 'Okay', emoji: '⛅' },
  { value: 4, label: 'Bright', emoji: '🌞' },
  { value: 5, label: 'Uplifted', emoji: '✨' }
];

const MoodSelector = ({ onSubmit, todayMood }) => {
  const [value, setValue] = useState(todayMood?.value || 3);
  useEffect(() => {
    if (todayMood?.value) setValue(todayMood.value);
  }, [todayMood]);

  const selected = useMemo(() => moods.find((m) => m.value === Number(value)), [value]);

  return (
    <div className="glass rounded-3xl p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-emerald-200/80">
            Mood check-in
          </p>
          <p className="text-sm text-slate-200">How are you feeling today?</p>
        </div>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={selected?.emoji}
            initial={{ scale: 0.85, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.85, opacity: 0, rotate: 6 }}
            className="text-2xl"
          >
            {selected?.emoji}
          </motion.div>
        </AnimatePresence>
      </div>

      <input
        type="range"
        min="1"
        max="5"
        step="1"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-emerald-300"
      />
      <div className="flex items-center justify-between text-[11px] text-slate-300">
        {moods.map((m) => (
          <span key={m.value} className={m.value === selected?.value ? 'text-emerald-200' : ''}>
            {m.label}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onSubmit?.(selected.value)}
          className="rounded-full bg-emerald-300/90 px-4 py-2 text-sm font-semibold text-emerald-950 hover:bg-emerald-200 transition-colors"
        >
          Save mood
        </button>
        {todayMood && (
          <p className="text-xs text-slate-400">
            Today logged • {todayMood.value}/5 at{' '}
            {new Date(todayMood.createdAt).toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default MoodSelector;


