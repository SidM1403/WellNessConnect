import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaBolt, FaRedo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ReactionTime = () => {
    const navigate = useNavigate();
    const [gameState, setGameState] = useState('waiting'); // waiting, ready, active, result, early
    const [reactionTime, setReactionTime] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const timeoutRef = useRef(null);

    const startGame = () => {
        setGameState('ready');
        setReactionTime(null);

        const randomDelay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds

        timeoutRef.current = setTimeout(() => {
            setGameState('active');
            setStartTime(Date.now());
        }, randomDelay);
    };

    const handleClick = () => {
        if (gameState === 'waiting' || gameState === 'result' || gameState === 'early') {
            startGame();
        } else if (gameState === 'ready') {
            clearTimeout(timeoutRef.current);
            setGameState('early');
        } else if (gameState === 'active') {
            const endTime = Date.now();
            setReactionTime(endTime - startTime);
            setGameState('result');
            // Here we would save the score
        }
    };

    return (
        <div
            className={`min-h-screen flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 select-none
                ${gameState === 'waiting' || gameState === 'result' ? 'bg-surface text-gray-900' : ''}
                ${gameState === 'ready' ? 'bg-rose-500 text-white' : ''}
                ${gameState === 'active' ? 'bg-emerald-500 text-white' : ''}
                ${gameState === 'early' ? 'bg-amber-500 text-white' : ''}
            `}
            onMouseDown={handleClick}
        >
            {/* Nav Overlay */}
            <div className="absolute top-24 left-4 z-10">
                <button
                    onClick={(e) => { e.stopPropagation(); navigate('/games'); }}
                    className={`px-4 py-2 rounded-full backdrop-blur-md border border-white/20 transition-colors
                        ${gameState === 'waiting' || gameState === 'result' ? 'bg-white/50 text-gray-900 hover:bg-white/80' : 'bg-black/20 text-white hover:bg-black/30'}
                    `}
                >
                    ← Back to Games
                </button>
            </div>

            <div className="text-center px-4 max-w-2xl">
                {gameState === 'waiting' && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                        <div className="text-8xl mb-8 flex justify-center text-primary-500"><FaBolt /></div>
                        <h1 className="text-5xl font-display font-bold mb-6">Reaction Time</h1>
                        <p className="text-xl text-text-secondary mb-12">When the screen turns <strong className="text-emerald-500">GREEN</strong>, click as fast as you can.</p>
                        <div className="text-sm font-semibold text-text-secondary uppercase tracking-widest animate-pulse">Click anywhere to start</div>
                    </motion.div>
                )}

                {gameState === 'ready' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="text-8xl mb-6">Wait for Green...</div>
                        <div className="text-2xl alpha-50">Do not click yet.</div>
                    </motion.div>
                )}

                {gameState === 'active' && (
                    <motion.div initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.1 }}>
                        <div className="text-9xl font-bold">CLICK!</div>
                        <div className="text-3xl mt-4">Hurry!</div>
                    </motion.div>
                )}

                {gameState === 'result' && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="text-2xl text-text-secondary mb-2">Reaction Time</div>
                        <div className="text-8xl font-bold text-gray-900 mb-8 font-mono">{reactionTime} ms</div>
                        <div className="flex justify-center gap-4">
                            <button className="flex items-center gap-2 px-8 py-3 bg-surface-200 hover:bg-surface-300 rounded-full font-semibold transition-colors">
                                <FaRedo /> Try Again
                            </button>
                        </div>
                        <p className="mt-8 text-text-secondary">Click anywhere to restart</p>
                    </motion.div>
                )}

                {gameState === 'early' && (
                    <motion.div initial={{ rotate: -5 }} animate={{ rotate: 0 }}>
                        <div className="text-8xl mb-4">Too Soon!</div>
                        <p className="text-2xl opacity-90">You clicked before the green screen.</p>
                        <p className="mt-8 opacity-75">Click to try again</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ReactionTime;
