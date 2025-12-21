import { motion } from 'framer-motion';

const AnimatedButton = ({ children, as = 'button', className = '', ...rest }) => {
  const Component = motion[as] || motion.button;

  return (
    <Component
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-gradient-primary shadow-lg shadow-primary-500/30 overflow-hidden ${className}`}
      {...rest}
    >
      <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="relative flex items-center gap-2">
        {children}
        <svg
          className="w-4 h-4 stroke-[2.2] text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M7 17L17 7M17 7H9M17 7V15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Component>
  );
};

export default AnimatedButton;
