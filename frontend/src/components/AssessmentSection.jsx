import { motion } from 'framer-motion';
import { assessments } from '../data/assessments';
import AssessmentCard from './AssessmentCard';
import { Link } from 'react-router-dom';

const AssessmentSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-text-primary dark:text-dark-text-primary">Assess Your Wellbeing</h2>
                <p className="mt-3 text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
                    Created by our experts, these assessments can help you evaluate your health risks & understand your lifestyle better.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {assessments.slice(0, 6).map((item, index) => (
                    <AssessmentCard key={item.id} assessment={item} />
                ))}
            </div>

            <div className="mt-10 text-center">
                <Link
                    to="/assessments"
                    className="inline-flex items-center gap-2 font-semibold text-primary-600 dark:text-dark-primary-600 hover:text-primary-700 dark:hover:text-dark-primary-700 transition-colors"
                >
                    Explore All Assessments
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>
        </section>
    );
};

export default AssessmentSection;
