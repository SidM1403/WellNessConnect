import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalculator, FaTrophy, FaRedo, FaPlay } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

const MathChallenge = () => {
    const navigate = useNavigate();
    const [gameState, setGameState] = useState('menu'); // menu, playing, gameover
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [problem, setProblem] = useState({ q: '', a: 0 });
    const [userAnswer, setUserAnswer] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && gameState === 'playing') {
            endGame();
        }
    }, [gameState, timeLeft]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(60);
        setGameState('playing');
        generateProblem();
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const generateProblem = () => {
        const ops = ['+', '-', '*'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        let a = Math.floor(Math.random() * 10) + 1;
        let b = Math.floor(Math.random() * 10) + 1;

        if (op === '*') {
            a = Math.floor(Math.random() * 9) + 2; // 2-10
            b = Math.floor(Math.random() * 9) + 2; // 2-10
        } else if (op === '-') {
            if (a < b) [a, b] = [b, a]; // Ensure positive result
        }

        let ans = 0;
        switch (op) {
            case '+': ans = a + b; break;
            case '-': ans = a - b; break;
            case '*': ans = a * b; break;
        }

        setProblem({ q: `${a} ${op} ${b}`, a: ans });
        setUserAnswer('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseInt(userAnswer) === problem.a) {
            setScore(prev => prev + 10);
            // Flash success feedback
            generateProblem();
        } else {
            // Optional: penalty or shake effect
            // For now just clear
            setUserAnswer('');
        }
    };

    const endGame = () => {
        setGameState('gameover');
        if (score > 50) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center bg-rose-50">
            <div className="absolute top-24 left-4 z-10">
                <button onClick={() => navigate('/games')} className="text-rose-800/60 hover:text-rose-600 transition-colors font-semibold">
                    ← Back to Games
                </button>
            </div>

            <div className="w-full max-w-md">
                <AnimatePresence mode="wait">
                    {gameState === 'menu' && (
                        <motion.div
                            key="menu"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white p-8 rounded-3xl shadow-soft-xl border border-rose-100 text-center"
                        >
                            <div className="w-20 h-20 bg-rose-500 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg text-white mx-auto">
                                <FaCalculator />
                            </div>
                            <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">Math Speed</h1>
                            <p className="text-text-secondary mb-8">Solve as many problems as you can in 60 seconds.</p>
                            <button
                                onClick={startGame}
                                className="btn-primary w-full py-4 rounded-xl text-lg flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 bg-gradient-to-r from-rose-500 to-red-600 border-none"
                            >
                                <FaPlay /> Start Challenge
                            </button>
                        </motion.div>
                    )}

                    {gameState === 'playing' && (
                        <motion.div
                            key="playing"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white p-8 rounded-3xl shadow-soft-xl border border-rose-100 text-center relative"
                        >
                            <div className="flex justify-between items-center mb-8 text-xl font-bold text-gray-400">
                                <div>Score: <span className="text-rose-600">{score}</span></div>
                                <div>Time: <span className={`${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-gray-600'}`}>{timeLeft}s</span></div>
                            </div>

                            <div className="text-6xl font-bold text-gray-800 mb-12 font-mono">
                                {problem.q} = ?
                            </div>

                            <form onSubmit={handleSubmit}>
                                <input
                                    ref={inputRef}
                                    type="number"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    className="w-full text-center text-4xl font-bold bg-rose-50 border-2 border-rose-100 rounded-xl py-4 focus:outline-none focus:border-rose-500 focus:bg-white transition-all"
                                    placeholder="#"
                                    autoFocus
                                />
                            </form>
                        </motion.div>
                    )}

                    {gameState === 'gameover' && (
                        <motion.div
                            key="gameover"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white p-8 rounded-3xl shadow-soft-xl border border-rose-100 text-center"
                        >
                            <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg text-white mx-auto">
                                <FaTrophy />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Time's Up!</h2>
                            <div className="text-5xl font-bold text-rose-600 mb-6">{score}</div>
                            <p className="text-text-secondary mb-8">Great mental workout!</p>

                            <button
                                onClick={startGame}
                                className="btn-primary w-full py-3 rounded-xl flex items-center justify-center gap-2"
                            >
                                <FaRedo /> Play Again
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MathChallenge;
