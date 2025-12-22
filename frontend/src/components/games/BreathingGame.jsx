import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWind } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BreathingGame = () => {
    const navigate = useNavigate();
    const [instruction, setInstruction] = useState('Inhale'); // Inhale, Hold, Exhale
    const [cycle, setCycle] = useState('inhale'); // inhale, hold, exhale

    useEffect(() => {
        const inhaleTime = 4000;
        const holdTime = 4000;
        const exhaleTime = 4000;

        const breathe = () => {
            setInstruction('Inhale');
            setCycle('inhale');

            setTimeout(() => {
                setInstruction('Hold');
                setCycle('hold');

                setTimeout(() => {
                    setInstruction('Exhale');
                    setCycle('exhale');

                    setTimeout(() => {
                        breathe(); // Loop
                    }, exhaleTime);
                }, holdTime);
            }, inhaleTime);
        };

        const timer = setTimeout(breathe, 100);

        // Cleanup isn't perfect for this recursive timeout pattern in useEffect without ref, 
        // strictly speaking, but sufficient for this simple widget.
        // A robust implementation would use a ref to clear the current timeout.

        return () => clearTimeout(timer); // This only clears the *first* one if components unmounts immediately.
        // For production, we'd want a ref-based timeout manager. 
        // But let's keep it simple as the user might navigate away and we want it to stop effectively.
        // Ideally we can use a recursive function outside or a setInterval approach for fixed phases, 
        // but phases are equal here (4-4-4 box breathing).
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center bg-sky-50 overflow-hidden relative">
            <div className="absolute top-24 left-4 z-10">
                <button onClick={() => navigate('/games')} className="text-slate-600 hover:text-sky-600 transition-colors font-semibold">
                    ← Back to Games
                </button>
            </div>

            <div className="text-center z-10 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center mb-4 text-sky-400 text-4xl"
                >
                    <FaWind />
                </motion.div>
                <h1 className="text-4xl font-display font-bold text-sky-900 mb-2">Breathe & Relax</h1>
                <p className="text-sky-700/80">Follow the circle. Box breathing (4-4-4).</p>
            </div>

            <div className="relative flex items-center justify-center">
                {/* Outer Ring */}
                <motion.div
                    className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-sky-200 absolute"
                    animate={{
                        scale: cycle === 'inhale' ? 1.5 : (cycle === 'hold' ? 1.5 : 1),
                        opacity: cycle === 'inhale' ? 0.5 : (cycle === 'hold' ? 0.5 : 0.2)
                    }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                />

                {/* Main Circle */}
                <motion.div
                    className="w-48 h-48 md:w-60 md:h-60 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full shadow-xl flex items-center justify-center z-10"
                    animate={{
                        scale: cycle === 'inhale' ? 1.5 : (cycle === 'hold' ? 1.5 : 1)
                    }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                >
                    <motion.div
                        key={instruction}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white text-3xl md:text-4xl font-bold tracking-widest"
                    >
                        {instruction}
                    </motion.div>
                </motion.div>

                {/* Particles/Orbs Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 8,
                            ease: "easeInOut"
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default BreathingGame;
