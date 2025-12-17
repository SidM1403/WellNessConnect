import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.7]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Generate random positions for floating shapes
  const generateRandomPosition = () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 200 + 100}px`,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
    opacity: Math.random() * 0.3 + 0.1,
  });

  const shapes = Array.from({ length: 5 }, (_, i) => generateRandomPosition());

  return (
    <motion.div
      style={{ y, opacity }}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden transition-opacity duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Main background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-purple-50 to-teal-50" />

      {/* Animated gradient blobs */}
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full filter blur-3xl ${
            i % 3 === 0
              ? 'bg-gradient-to-r from-sky-400 to-blue-500'
              : i % 2 === 0
              ? 'bg-gradient-to-r from-purple-400 to-pink-500'
              : 'bg-gradient-to-r from-teal-400 to-emerald-500'
          }`}
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
            opacity: shape.opacity,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 40 - 20, 0],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        />
      ))}

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "url(" + "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2338bdf8' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E" + ")",
          backgroundSize: '60px 60px',
        }}
      />

      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "url(" + "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E" + ")",
          backgroundSize: '200px 200px',
        }}
      />

      {/* Animated gradient border */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-100/50 to-transparent"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          WebkitMaskImage: 'linear-gradient(90deg, transparent, white 20%, white 80%, transparent)',
          maskImage: 'linear-gradient(90deg, transparent, white 20%, white 80%, transparent)',
        }}
      />
    </motion.div>
  );
};

export default AnimatedBackground;


