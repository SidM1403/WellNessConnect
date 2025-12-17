import { motion } from 'framer-motion';

const AnimatedButton = ({ children, as = 'button', className = '', ...rest }) => {
  const Component = motion[as] || motion.button;

  return (
    <Component
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97, y: 0 }}
      className={`relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-slate-900 bg-gradient-to-r from-emerald-300 via-sky-300 to-lime-200 shadow-soft-xl overflow-hidden ${className}`}
      {...rest}
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/40 via-white/0 to-white/30 opacity-0 hover:opacity-100 transition-opacity duration-300 mix-blend-screen" />
      <span className="relative flex items-center gap-2">
        {children}
        <svg
          className="w-4 h-4 stroke-[2.2] text-slate-900"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M7 17L17 7M17 7H9M17 7V15"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <animate
              attributeName="stroke-dasharray"
              from="0 40"
              to="40 0"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </span>
    </Component>
  );
};

export default AnimatedButton;


