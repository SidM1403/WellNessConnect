import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBrain, FaUndo, FaPlay } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

const CARDS = [
    { id: 1, icon: '🌟', color: 'bg-amber-400' },
    { id: 2, icon: '🌙', color: 'bg-indigo-500' },
    { id: 3, icon: '⚡', color: 'bg-yellow-400' },
    { id: 4, icon: '🔥', color: 'bg-red-500' },
    { id: 5, icon: '💧', color: 'bg-blue-400' },
    { id: 6, icon: '🍀', color: 'bg-emerald-500' },
    { id: 7, icon: '🌸', color: 'bg-pink-400' },
    { id: 8, icon: '💎', color: 'bg-cyan-400' },
];

const MemoryMatch = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [isWon, setIsWon] = useState(false);

    useEffect(() => {
        if (gameStarted) {
            initializeGame();
        }
    }, [gameStarted]);

    const initializeGame = () => {
        const shuffled = [...CARDS, ...CARDS]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ ...card, uniqueId: index }));
        setCards(shuffled);
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setIsWon(false);
    };

    const handleCardClick = (index) => {
        if (flipped.length === 2 || flipped.includes(index) || matched.includes(cards[index].id)) return;

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(moves + 1);
            checkForMatch(newFlipped);
        }
    };

    const checkForMatch = (currentFlipped) => {
        const [first, second] = currentFlipped;
        if (cards[first].id === cards[second].id) {
            setMatched([...matched, cards[first].id]);
            setFlipped([]);
            if (matched.length + 1 === CARDS.length) {
                handleWin();
            }
        } else {
            setTimeout(() => setFlipped([]), 1000);
        }
    };

    const handleWin = () => {
        setIsWon(true);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        // Here we would call the API to save the score
    };

    return (
        <div className="min-h-screen pt-24 pb-40 px-4 max-w-4xl mx-auto flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-8">
                <button onClick={() => navigate('/games')} className="text-text-secondary hover:text-primary-600 transition-colors">
                    ← Back to Games
                </button>
                <div className="flex items-center gap-4 bg-white px-6 py-2 rounded-full shadow-sm border border-surface-200">
                    <div className="flex items-center gap-2">
                        <FaUndo className="text-text-secondary" />
                        <span className="font-bold text-gray-900">{moves}</span>
                        <span className="text-sm text-text-secondary">Moves</span>
                    </div>
                </div>
            </div>

            {!gameStarted ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl shadow-soft-xl border border-surface-200 text-center max-w-lg"
                >
                    <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg text-white">
                        <FaBrain />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">Memory Match</h1>
                    <p className="text-text-secondary mb-8">Find all matching pairs of cards. Test your memory and concentration skills.</p>
                    <button
                        onClick={() => setGameStarted(true)}
                        className="btn-primary flex items-center gap-2 px-8 py-3 rounded-full text-lg shadow-lg shadow-primary-500/25"
                    >
                        <FaPlay className="text-sm" /> Start Game
                    </button>
                </motion.div>
            ) : (
                <div className="grid grid-cols-4 gap-4 w-full max-w-md md:max-w-2xl aspect-square">
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            card={card}
                            isFlipped={flipped.includes(index) || matched.includes(card.id)}
                            onClick={() => handleCardClick(index)}
                        />
                    ))}
                </div>
            )}

            {isWon && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white px-8 py-4 rounded-2xl shadow-xl border border-emerald-100 flex items-center gap-4 z-50"
                >
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl">🎉</div>
                    <div>
                        <h4 className="font-bold text-gray-900">Level Complete!</h4>
                        <p className="text-sm text-text-secondary">You finished in {moves} moves.</p>
                    </div>
                    <button
                        onClick={initializeGame}
                        className="ml-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-colors"
                    >
                        Play Again
                    </button>
                </motion.div>
            )}
        </div>
    );
};

const Card = ({ card, isFlipped, onClick }) => {
    return (
        <motion.div
            className="relative aspect-[3/4] cursor-pointer"
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                className="w-full h-full transition-all duration-500 preserve-3d"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
            >
                {/* Back of Card */}
                <div
                    className="absolute inset-0 backface-hidden bg-white border-2 border-surface-200 rounded-xl shadow-sm flex items-center justify-center"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="w-8 h-8 rounded-full bg-surface-100 flex items-center justify-center text-primary-300">
                        <FaBrain />
                    </div>
                </div>

                {/* Front of Card */}
                <div
                    className={`absolute inset-0 backface-hidden rounded-xl shadow-md flex items-center justify-center text-4xl border-2 border-white/20 ${card.color}`}
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    {card.icon}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MemoryMatch;
