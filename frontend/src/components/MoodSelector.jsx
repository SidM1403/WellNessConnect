import React, { useEffect, useMemo, useState } from 'react';
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
    <div className="card-premium p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-primary-500 font-bold">
            Mood Check-in
          </p>
          <p className="text-sm text-text-secondary mt-1">How are you feeling today?</p>
        </div>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={selected?.emoji}
            initial={{ scale: 0.85, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.85, opacity: 0, rotate: 6 }}
            className="text-4xl filter drop-shadow-md"
          >
            {selected?.emoji}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-4">
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full h-2 bg-surface-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
        />
        <div className="flex justify-between text-xs font-medium text-text-light">
          {moods.map((m) => (
            <span
              key={m.value}
              className={`transition-colors duration-200 ${m.value === selected?.value ? 'text-primary-600 font-bold scale-110' : ''
                }`}
            >
              {m.label}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={() => onSubmit?.(selected.value)}
          className="flex-1 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all"
        >
          Save Mood
        </button>
      </div>

      {todayMood && (
        <p className="text-xs text-center text-text-light pt-2 border-t border-surface-200">
          Last logged: <span className="font-medium text-text-primary">{todayMood.value}/5</span> at{' '}
          {new Date(todayMood.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      )}
    </div>
  );
};

export default React.memo(MoodSelector);


