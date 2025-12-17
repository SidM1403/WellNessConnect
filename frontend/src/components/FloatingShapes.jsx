import { motion } from 'framer-motion';

const floatVariants = {
  animate: (delay = 0) => ({
    y: [0, -12, 4, -8, 0],
    x: [0, 8, -6, 4, 0],
    transition: {
      duration: 18,
      repeat: Infinity,
      delay,
      ease: 'easeInOut'
    }
  })
};

const FloatingShapes = () => {
  return (
    <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
      <motion.circle
        cx="8%"
        cy="20%"
        r="42"
        fill="none"
        stroke="rgba(190,242,100,0.6)"
        strokeWidth="1.6"
        strokeDasharray="4 8"
        variants={floatVariants}
        animate="animate"
        custom={0}
      />
      <motion.circle
        cx="82%"
        cy="18%"
        r="32"
        fill="none"
        stroke="rgba(129,140,248,0.7)"
        strokeWidth="1.4"
        strokeDasharray="2 10"
        variants={floatVariants}
        animate="animate"
        custom={4}
      />
      <motion.rect
        x="12%"
        y="74%"
        width="90"
        height="46"
        rx="22"
        ry="22"
        fill="rgba(56,189,248,0.18)"
        variants={floatVariants}
        animate="animate"
        custom={2}
      />
      <motion.path
        d="M520 360 C540 340 568 340 588 360"
        fill="none"
        stroke="rgba(248,250,252,0.45)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="6 10"
        variants={floatVariants}
        animate="animate"
        custom={6}
      />
    </svg>
  );
};

export default FloatingShapes;


