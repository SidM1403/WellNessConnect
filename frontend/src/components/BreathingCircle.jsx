import { useEffect, useRef, useState } from 'react';

const BreathingCircle = ({ duration = 4000 }) => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [counter, setCounter] = useState(0);
  const [phase, setPhase] = useState('inhale');
  const circleRef = useRef(null);

  const startBreathing = () => {
    setIsBreathing(true);
    setCounter(0);
    setPhase('inhale');
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    if (circleRef.current) {
      circleRef.current.style.transform = 'scale(1)';
    }
  };

  useEffect(() => {
    if (!isBreathing) return;

    const interval = setInterval(() => {
      setCounter((prev) => {
        const nextCounter = prev + 100;
        
        if (nextCounter >= duration) {
          setPhase(phase === 'inhale' ? 'exhale' : 'inhale');
          return 0;
        }
        
        const progress = nextCounter / duration;
        const scale = phase === 'inhale' 
          ? 1 + (0.5 * progress) 
          : 1.5 - (0.5 * progress);
        
        if (circleRef.current) {
          circleRef.current.style.transform = `scale(${scale})`;
        }
        
        return nextCounter;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isBreathing, phase, duration]);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        <div 
          ref={circleRef}
          className="w-48 h-48 rounded-full bg-blue-500/20 flex items-center justify-center transition-transform duration-100 ease-in-out"
          style={{ transform: 'scale(1)' }}
        >
          <div className="text-center">
            <div className="text-2xl font-medium text-white">
              {phase === 'inhale' ? 'Breathe In' : 'Breathe Out'}
            </div>
            <div className="text-sm text-blue-100 mt-2">
              {isBreathing ? 'Focus on your breath' : 'Ready to begin'}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4">
        {!isBreathing ? (
          <button
            onClick={startBreathing}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Start Breathing
          </button>
        ) : (
          <button
            onClick={stopBreathing}
            className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            Stop
          </button>
        )}
      </div>
      
      <div className="mt-6 text-sm text-gray-400 text-center max-w-md">
        <p>Tip: Inhale as the circle expands, exhale as it contracts.</p>
      </div>
    </div>
  );
};

export default BreathingCircle;
