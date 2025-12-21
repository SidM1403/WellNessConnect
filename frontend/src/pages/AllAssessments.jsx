import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { assessments } from '../data/assessments';
import AssessmentCard from '../components/AssessmentCard';

const AllAssessments = () => {
    return (
        <div className="min-h-screen pt-28 pb-16 bg-surface-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-12">
                    <Link to="/" className="inline-flex items-center text-text-light hover:text-text-secondary transition-colors mb-6">
                        <FaArrowLeft className="mr-2" /> Back to Home
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
                            All Wellness Assessments
                        </h1>
                        <p className="text-xl text-text-secondary max-w-3xl">
                            Explore our library of expert-designed assessments to understand your physical and mental wellbeing better.
                        </p>
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {assessments.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <AssessmentCard assessment={item} />
                        </motion.div>
                    ))}
                </div>

                {/* Empty State (Future proofing) */}
                {assessments.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-text-secondary">No assessments available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllAssessments;
