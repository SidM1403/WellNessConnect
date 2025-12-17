import { motion } from 'framer-motion';

const AIModeToggle = ({ mode, onChange }) => {
  return (
    <div className="inline-flex rounded-full bg-slate-900/60 border border-white/10 p-1 text-[11px]">
      <button
        onClick={() => onChange('fitness')}
        className={`relative px-3 py-1.5 rounded-full transition-colors ${
          mode === 'fitness'
            ? 'text-emerald-950'
            : 'text-slate-300 hover:text-emerald-200'
        }`}
      >
        {mode === 'fitness' && (
          <motion.span
            layoutId="ai-mode-pill"
            className="absolute inset-0 rounded-full bg-emerald-300"
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          />
        )}
        <span className="relative">Fitness coach</span>
      </button>
      <button
        onClick={() => onChange('health')}
        className={`relative px-3 py-1.5 rounded-full transition-colors ${
          mode === 'health'
            ? 'text-emerald-950'
            : 'text-slate-300 hover:text-emerald-200'
        }`}
      >
        {mode === 'health' && (
          <motion.span
            layoutId="ai-mode-pill"
            className="absolute inset-0 rounded-full bg-sky-300"
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          />
        )}
        <span className="relative">Health checkup</span>
      </button>
    </div>
  );
};

export default AIModeToggle;


