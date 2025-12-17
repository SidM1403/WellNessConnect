import { motion } from 'framer-motion';
import AIChatWindow from '../components/AIChatWindow.jsx';

const AIAssistant = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-5 sm:p-6"
      >
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-50">
          Fitness & medical checkup assistant
        </h1>
        <p className="mt-1 text-sm text-slate-200/90">
          A calm companion for movement ideas and gentle health reflections. It can support you
          with suggestions, but it cannot diagnose, prescribe, or replace a real clinician.
        </p>
      </motion.div>
      <AIChatWindow />
    </div>
  );
};

export default AIAssistant;


