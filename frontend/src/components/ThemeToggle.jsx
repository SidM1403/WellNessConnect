import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext.jsx';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-14 h-7 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 dark:from-dark-primary-500 dark:to-dark-secondary-500 shadow-lg transition-all duration-300"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <motion.div
                className="absolute top-0.5 left-0.5 w-6 h-6 bg-white dark:bg-dark-surface-100 rounded-full shadow-md flex items-center justify-center"
                animate={{
                    x: theme === 'dark' ? 28 : 0,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                }}
            >
                {theme === 'light' ? (
                    <FaSun className="w-3.5 h-3.5 text-amber-500" />
                ) : (
                    <FaMoon className="w-3.5 h-3.5 text-indigo-400" />
                )}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
