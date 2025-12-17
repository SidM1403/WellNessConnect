import { motion } from 'framer-motion';

const ResourceCard = ({ resource }) => {
  const label =
    resource.type === 'video'
      ? 'Guided practice'
      : resource.type === 'tip'
      ? 'Micro habit'
      : 'Deep dive';

  return (
    <motion.a
      href={resource.url}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative glass block rounded-3xl p-4 sm:p-5 card-hover-soft overflow-hidden"
    >
      <svg
        className="absolute -top-10 -right-6 w-24 h-24 opacity-40"
        viewBox="0 0 80 80"
        aria-hidden="true"
      >
        <circle
          cx="40"
          cy="40"
          r="26"
          fill="none"
          stroke="rgba(226,232,240,0.28)"
          strokeWidth="1.2"
          strokeDasharray="4 8"
        />
        <circle cx="40" cy="40" r="3" fill="rgba(190,242,100,0.8)" />
      </svg>
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-emerald-100">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 border border-emerald-300/40 text-[10px]">
          {resource.type === 'video' ? '▶' : resource.type === 'tip' ? '✶' : '☼'}
        </span>
        <span>{label}</span>
      </div>
      <h4 className="mt-2 text-sm sm:text-base font-semibold text-slate-50">
        {resource.title}
      </h4>
      <p className="mt-1 text-xs sm:text-sm text-slate-200/90 line-clamp-3">
        {resource.description}
      </p>
      <span className="mt-3 inline-flex rounded-full bg-slate-900/70 border border-white/10 px-2.5 py-1 text-[10px] font-medium text-slate-200">
        {resource.category}
      </span>
    </motion.a>
  );
};

export default ResourceCard;

