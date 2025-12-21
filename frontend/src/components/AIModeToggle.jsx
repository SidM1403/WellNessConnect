import { motion } from 'framer-motion';

const AIModeToggle = ({ mode, onChange }) => {
  return (
    <div className="inline-flex rounded-full bg-surface-100 p-1 text-[12px] font-medium border border-surface-200">
      <button
        onClick={() => onChange('fitness')}
        className={`relative px-4 py-1.5 rounded-full transition-all ${mode === 'fitness'
            ? 'text-primary-700 shadow-sm'
            : 'text-text-secondary hover:text-text-primary'
          }`}
      >
        {mode === 'fitness' && (
          <motion.span
            layoutId="ai-mode-pill"
            className="absolute inset-0 rounded-full bg-white border border-surface-200"
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          />
        )}
        <span className="relative z-10">Fitness Coach</span>
      </button>
      <button
        onClick={() => onChange('health')}
        className={`relative px-4 py-1.5 rounded-full transition-all ${mode === 'health'
            ? 'text-teal-700 shadow-sm'
            : 'text-text-secondary hover:text-text-primary'
          }`}
      >
        {mode === 'health' && (
          <motion.span
            layoutId="ai-mode-pill"
            className="absolute inset-0 rounded-full bg-white border border-surface-200"
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          />
        )}
        <span className="relative z-10">Health Checkup</span>
      </button>
    </div>
  );
};

export default AIModeToggle;


