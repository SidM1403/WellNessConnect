import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-surface-50">
      {/* Background Gradient Base */}
      <div className="absolute inset-0 bg-gradient-main opacity-80" />

      {/* Floating Shapes */}
      <div className="absolute inset-0 opacity-40">
        {/* Blob 1 - Top Left */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: "easeInOut"
          }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-primary-200 rounded-full blur-[80px]"
        />

        {/* Blob 2 - Bottom Right */}
        <motion.div
          animate={{
            y: [0, 50, 0],
            x: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: "easeInOut"
          }}
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-accent-200 rounded-full blur-[100px]"
        />

        {/* Blob 3 - Center Right */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: "easeInOut"
          }}
          className="absolute top-1/2 -right-40 w-80 h-80 bg-secondary-200/50 rounded-full blur-[60px]"
        />

        {/* Blob 4 - Center Left */}
        <motion.div
          animate={{
            y: [0, 60, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: "easeInOut"
          }}
          className="absolute bottom-1/3 -left-20 w-72 h-72 bg-primary-100 rounded-full blur-[70px]"
        />
      </div>

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
