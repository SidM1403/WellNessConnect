import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FloatingGlowShapes = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Generate random positions for floating shapes
  const generateRandomPosition = () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 300 + 200}px`,
    delay: Math.random() * 5,
    duration: Math.random() * 15 + 15,
    opacity: Math.random() * 0.15 + 0.05,
  });

  const shapes = Array.from({ length: 6 }, (_, i) => generateRandomPosition());

  const colors = [
    'from-cyan-500/30 via-blue-500/20 to-transparent',
    'from-purple-500/30 via-pink-500/20 to-transparent',
    'from-teal-500/30 via-emerald-500/20 to-transparent',
    'from-blue-500/30 via-cyan-500/20 to-transparent',
    'from-pink-500/30 via-purple-500/20 to-transparent',
    'from-emerald-500/30 via-teal-500/20 to-transparent',
  ];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden transition-opacity duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Animated gradient blobs */}
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${colors[i % colors.length]} blur-3xl`}
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
            opacity: shape.opacity,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.random() * 60 - 30, 0],
            scale: [1, 1.1, 1],
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
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url(" + "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2338bdf8' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E" + ")",
          backgroundSize: '60px 60px',
        }}
      />

      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url(" + "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E" + ")",
          backgroundSize: '200px 200px',
        }}
      />
    </div>
  );
};

export default FloatingGlowShapes;

