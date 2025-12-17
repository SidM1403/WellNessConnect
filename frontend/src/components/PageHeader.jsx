import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle, badge }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass rounded-3xl p-5 sm:p-6 space-y-2"
  >
    {badge && (
      <span className="inline-flex text-[11px] uppercase tracking-wide text-emerald-200 bg-emerald-400/10 border border-emerald-200/30 px-2 py-1 rounded-full">
        {badge}
      </span>
    )}
    <h1 className="text-xl sm:text-2xl font-semibold text-slate-50">{title}</h1>
    {subtitle && <p className="text-sm text-slate-200/85">{subtitle}</p>}
  </motion.div>
);

export default PageHeader;

