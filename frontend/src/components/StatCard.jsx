import { motion } from 'framer-motion';

const StatCard = ({ label, value, hint, accent = 'emerald' }) => {
  const accentClass =
    accent === 'sky'
      ? 'from-sky-300/30 to-slate-900/60 border-sky-200/30'
      : 'from-emerald-300/30 to-slate-900/60 border-emerald-200/30';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      className={`rounded-3xl border ${accentClass} bg-gradient-to-br p-4 sm:p-5 glass`}
    >
      <p className="text-[11px] uppercase tracking-wide text-slate-300">{label}</p>
      <p className="text-2xl font-semibold text-slate-50">{value}</p>
      {hint && <p className="text-[11px] text-slate-400 mt-1">{hint}</p>}
    </motion.div>
  );
};

export default StatCard;

