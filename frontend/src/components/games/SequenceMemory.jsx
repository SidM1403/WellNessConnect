import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaRedo, FaBrain } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

const COLORS = [
    { id: 0, color: 'bg-green-500', active: 'bg-green-300', sound: 261.63 }, // C4
    { id: 1, color: 'bg-red-500', active: 'bg-red-300', sound: 329.63 },   // E4
    { id: 2, color: 'bg-yellow-500', active: 'bg-yellow-300', sound: 392.00 }, // G4
    { id: 3, color: 'bg-blue-500', active: 'bg-blue-300', sound: 523.25 }    // C5
];

const SequenceMemory = () => {
    const navigate = useNavigate();
    const [sequence, setSequence] = useState([]);
    const [playbackIdx, setPlaybackIdx] = useState(0);
    const [userTurn, setUserTurn] = useState(false);
    const [gameState, setGameState] = useState('idle'); // idle, playing, gameover
    const [activeBtn, setActiveBtn] = useState(null);
    const [score, setScore] = useState(0);

    const playTone = (freq) => {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
        osc.stop(ctx.currentTime + 0.5);
    };

    const addToSequence = () => {
        const nextColor = Math.floor(Math.random() * 4);
        const newSeq = [...sequence, nextColor];
        setSequence(newSeq);
        setPlaybackIdx(0);
        setUserTurn(false);
        setTimeout(() => playSequence(newSeq), 1000);
    };

    const playSequence = async (seq) => {
        for (let i = 0; i < seq.length; i++) {
            await flashButton(seq[i]);
            await new Promise(r => setTimeout(r, 300)); // Gap between flashes
        }
        setUserTurn(true);
    };

    const flashButton = async (id) => {
        setActiveBtn(id);
        const btn = COLORS.find(c => c.id === id);
        playTone(btn.sound);
        await new Promise(r => setTimeout(r, 500));
        setActiveBtn(null);
    };

    const handleBtnClick = (id) => {
        if (!userTurn || gameState !== 'playing') return;

        flashButton(id); // Visual feedback immediately

        if (id === sequence[playbackIdx]) {
            if (playbackIdx + 1 === sequence.length) {
                // Completed this round
                setScore(score + 1);
                setUserTurn(false);
                setTimeout(addToSequence, 1000);
            } else {
                setPlaybackIdx(playbackIdx + 1);
            }
        } else {
            // Wrong button
            setGameState('gameover');
            playTone(150); // Error sound
        }
    };

    const startGame = () => {
        setSequence([]);
        setScore(0);
        setGameState('playing');
        setTimeout(() => addToSequence(), 500);
    };

    return (
        <div className="min-h-screen pt-32 pb-12 px-4 flex flex-col items-center bg-slate-900 text-white">
            <div className="absolute top-24 left-4 z-10">
                <button onClick={() => navigate('/games')} className="text-slate-400 hover:text-white transition-colors font-semibold">
                    ← Back to Games
                </button>
            </div>

            <h1 className="text-4xl font-display font-bold mb-2">Sequence Memory</h1>
            <p className="text-slate-400 mb-8">Memorize and repeat the pattern.</p>

            <div className="mb-8 text-2xl font-mono">
                Score: <span className="text-emerald-400">{score}</span>
            </div>

            {gameState === 'idle' && (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-slate-800 p-8 rounded-2xl text-center shadow-xl border border-slate-700 mb-8"
                >
                    <div className="text-6xl mb-4 text-emerald-500 flex justify-center"><FaBrain /></div>
                    <button
                        onClick={startGame}
                        className="btn-primary px-8 py-3 rounded-full text-lg shadow-lg shadow-emerald-500/20 bg-emerald-600 hover:bg-emerald-500 border-none"
                    >
                        Start Game
                    </button>
                </motion.div>
            )}

            {gameState === 'gameover' && (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-slate-800 p-8 rounded-2xl text-center shadow-xl border border-red-900/50 mb-8"
                >
                    <h2 className="text-3xl font-bold text-red-500 mb-2">Game Over!</h2>
                    <p className="text-slate-300 mb-6">You reached level {score}</p>
                    <button
                        onClick={startGame}
                        className="flex items-center gap-2 mx-auto px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                    >
                        <FaRedo /> Try Again
                    </button>
                </motion.div>
            )}

            <div className={`grid grid-cols-2 gap-4 max-w-[300px] aspect-square relative ${gameState === 'idle' ? 'opacity-50 pointer-events-none' : ''}`}>
                {COLORS.map((btn) => (
                    <button
                        key={btn.id}
                        onMouseDown={() => handleBtnClick(btn.id)}
                        className={`
                            w-32 h-32 rounded-2xl transition-all duration-100 shadow-lg border-b-4 border-black/20
                            ${activeBtn === btn.id ? btn.active : btn.color}
                            ${activeBtn === btn.id ? 'translate-y-1 border-b-0 shadow-none brightness-125' : ''}
                            hover:brightness-110 active:scale-95
                        `}
                    />
                ))}

                {/* Center Status Light */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center border-4 border-slate-800 z-10">
                    <div className={`w-4 h-4 rounded-full transition-colors duration-300 ${userTurn ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-red-500'}`} />
                </div>
            </div>

            <div className="mt-12 text-sm text-slate-500">
                {userTurn ? "Your Turn" : "Watch Closely..."}
            </div>
        </div>
    );
};

export default SequenceMemory;
