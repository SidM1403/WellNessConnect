import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AssessmentCard = ({ assessment }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative bg-white dark:bg-dark-surface-100 rounded-3xl p-4 sm:p-5 border border-surface-200 dark:border-dark-surface-200 shadow-sm hover:shadow-card transition-all duration-300 flex items-center gap-5 cursor-pointer h-full"
        >
            {/* Image Container */}
            <div className={`flex-shrink-0 w-24 h-24 rounded-2xl ${assessment.color || 'bg-primary-50'} flex items-center justify-center overflow-hidden`}>
                <img
                    src={assessment.image}
                    alt=""
                    className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-text-primary dark:text-dark-text-primary text-base sm:text-lg leading-tight mb-2 group-hover:text-primary-600 dark:group-hover:text-dark-primary-600 transition-colors">
                    {assessment.title}
                </h3>
                <Link
                    to={`/assessments/${assessment.id}`}
                    className="inline-flex items-center text-sm font-semibold text-primary-500 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-700 transition-colors"
                >
                    Take Assessment
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </motion.div>
    );
};

export default AssessmentCard;
