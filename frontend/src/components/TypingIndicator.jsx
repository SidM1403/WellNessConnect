import { motion } from 'framer-motion';

const TypingIndicator = () => (
  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-2">
    <div className="h-6 w-6 rounded-full bg-slate-900/70 border border-white/10 flex items-center justify-center">
      <div className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1 w-1 rounded-full bg-emerald-200"
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
    <span>Assistant is composing a gentle reply…</span>
  </div>
);

export default TypingIndicator;


