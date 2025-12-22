import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaRedo, FaInfinity } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FocusTimer = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('focus'); // focus, break

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Play sound or notify
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center bg-surface">
            <div className="w-full max-w-4xl flex justify-between items-center mb-12">
                <button onClick={() => navigate('/games')} className="text-text-secondary hover:text-primary-600 transition-colors">
                    ← Back to Games
                </button>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 md:p-12 rounded-[3rem] shadow-soft-xl border border-surface-200 w-full max-w-md text-center relative overflow-hidden"
            >
                {/* Background Animation */}
                <div className={`absolute inset-0 opacity-10 transition-colors duration-1000 ${mode === 'focus' ? 'bg-primary-500' : 'bg-emerald-500'}`} />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut"
                    }}
                    className={`absolute inset-0 rounded-[3rem] ${mode === 'focus' ? 'bg-primary-500' : 'bg-emerald-500'}`}
                />

                <div className="relative z-10">
                    <div className="flex justify-center gap-4 mb-8">
                        <button
                            onClick={() => switchMode('focus')}
                            className={`px-6 py-2 rounded-full font-semibold transition-all ${mode === 'focus' ? 'bg-primary-100 text-primary-700 shadow-sm' : 'text-text-secondary hover:bg-surface-100'}`}
                        >
                            Focus
                        </button>
                        <button
                            onClick={() => switchMode('break')}
                            className={`px-6 py-2 rounded-full font-semibold transition-all ${mode === 'break' ? 'bg-emerald-100 text-emerald-700 shadow-sm' : 'text-text-secondary hover:bg-surface-100'}`}
                        >
                            Break
                        </button>
                    </div>

                    <div className="text-8xl font-bold font-mono text-gray-800 mb-8 tracking-wider">
                        {formatTime(timeLeft)}
                    </div>

                    <div className="flex justify-center gap-6">
                        <button
                            onClick={toggleTimer}
                            className={`w-16 h-16 rounded-full flex items-center justify-center text-xl text-white shadow-lg transition-transform hover:scale-105 active:scale-95 ${isActive ? 'bg-amber-400' : 'bg-primary-500'}`}
                        >
                            {isActive ? <FaPause /> : <FaPlay className="ml-1" />}
                        </button>
                        <button
                            onClick={resetTimer}
                            className="w-16 h-16 rounded-full flex items-center justify-center text-xl bg-surface-100 text-text-secondary hover:bg-surface-200 transition-colors"
                        >
                            <FaRedo />
                        </button>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-text-secondary text-sm">
                        <FaInfinity className="text-primary-300" />
                        <span>Stay in the flow</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default FocusTimer;
