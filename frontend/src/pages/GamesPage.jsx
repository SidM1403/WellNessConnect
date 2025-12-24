import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBrain, FaStopwatch, FaInfinity, FaWind, FaCalculator, FaLayerGroup } from 'react-icons/fa';

const games = [
    {
        id: 'memory',
        title: 'Memory Match',
        description: 'Flip cards to match pairs. Improves memory & concentration.',
        icon: <FaBrain />,
        color: 'from-violet-500 to-purple-600',
        path: '/games/memory',
        difficulty: 'Medium'
    },
    {
        id: 'reaction',
        title: 'Reaction Time',
        description: 'Test your reflexes. Click as fast as possible when the screen changes.',
        icon: <FaStopwatch />,
        color: 'from-amber-400 to-orange-500',
        path: '/games/reaction',
        difficulty: 'Easy'
    },
    {
        id: 'focus',
        title: 'Focus Timer',
        description: 'Pomodoro-style focus sessions with calm visual aids.',
        icon: <FaInfinity />, // Using infinity as a symbol for flow/focus
        color: 'from-emerald-400 to-teal-600',
        path: '/games/focus',
        difficulty: 'All Levels'
    },
    {
        id: 'breathing',
        title: 'Breathing & Calm',
        description: 'Guided breathing exercises to reduce stress and anxiety.',
        icon: <FaWind />,
        color: 'from-sky-400 to-blue-600',
        path: '/games/breathing',
        difficulty: 'Easy'
    },
    {
        id: 'math',
        title: 'Math Speed',
        description: 'Solve simple math problems against the clock.',
        icon: <FaCalculator />,
        color: 'from-rose-500 to-red-600',
        path: '/games/math',
        difficulty: 'Hard'
    },
    {
        id: 'sequence',
        title: 'Sequence Memory',
        description: 'Memorize the pattern of lights and repeat it. How long can you go?',
        icon: <FaLayerGroup />,
        difficulty: 'Medium',
        path: '/games/sequence',
        color: 'from-violet-500 to-fuchsia-600'
    }
];

const GamesPage = () => {
    return (
        <div className="min-h-screen pt-32 pb-40 px-4 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-surface-100 dark:bg-dark-surface-200 ring-1 ring-surface-200 dark:ring-dark-surface-200 shadow-sm">
                    <FaBrain className="text-2xl text-primary-500 mr-2" />
                    <span className="font-semibold text-text-primary dark:text-dark-text-primary">Brain & Wellness</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-dark-text-primary mb-4">
                    Train your mind. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Heal your soul.</span>
                </h1>
                <p className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
                    Interactive exercises designed to improve focus, memory, and cognitive speed while promoting mental well-being.
                </p>
                <div className="mt-4 inline-block bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg px-4 py-2 text-sm text-amber-800 dark:text-amber-200">
                    ⚠️ Note: These activities are for wellness and engagement, not medical treatment.
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map((game, index) => (
                    <motion.div
                        key={game.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link to={game.path} className="block group h-full">
                            <div className="relative overflow-hidden bg-white dark:bg-dark-surface-100 rounded-3xl p-6 shadow-soft-lg hover:shadow-soft-xl transition-all duration-300 border border-surface-200 dark:border-dark-surface-200 h-full flex flex-col group-hover:-translate-y-1">
                                {/* Gradient Background Hover Effect */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${game.color}`} />

                                <div className="flex items-center justify-between mb-6">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center text-white text-xl shadow-lg`}>
                                        {game.icon}
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-surface-100 dark:bg-dark-surface-200 text-text-secondary dark:text-dark-text-secondary border border-surface-200 dark:border-dark-surface-200">
                                        {game.difficulty}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text-primary mb-2 group-hover:text-primary-600 dark:group-hover:text-dark-primary-600 transition-colors">
                                    {game.title}
                                </h3>
                                <p className="text-text-secondary dark:text-dark-text-secondary text-sm mb-6 flex-grow">
                                    {game.description}
                                </p>

                                <div className="flex items-center text-primary-600 dark:text-dark-primary-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                                    Play Now <span className="ml-1">→</span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default GamesPage;
