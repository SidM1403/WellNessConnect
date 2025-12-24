import { motion } from 'framer-motion';
import AIChatWindow from '../components/AIChatWindow.jsx';

const AIAssistant = () => {
  return (
    <div className="pt-24 pb-8 max-w-4xl mx-auto space-y-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 dark:bg-dark-surface-100/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-card border border-surface-200 dark:border-dark-surface-200"
      >
        <h1 className="text-xl sm:text-2xl font-bold font-display text-text-primary dark:text-dark-text-primary">
          Fitness & Medical Assistant
        </h1>
        <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary leading-relaxed max-w-2xl">
          A calm companion for movement ideas and gentle health reflections. It can support you
          with suggestions, but it cannot diagnose, prescribe, or replace a real clinician.
        </p>
      </motion.div>
      <AIChatWindow />
    </div>
  );
};

export default AIAssistant;


