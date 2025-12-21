import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaPlay } from 'react-icons/fa';
import { assessments } from '../data/assessments';

const AssessmentIntro = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const assessment = assessments.find((a) => a.id === id);

    if (!assessment) {
        return (
            <div className="min-h-screen pt-32 text-center">
                <h2 className="text-2xl font-bold">Assessment not found</h2>
                <Link to="/" className="text-primary-600 hover:underline mt-4 inline-block">Go Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-16 bg-surface-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/" className="inline-flex items-center text-text-light hover:text-text-secondary transition-colors mb-8">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </Link>

                <div className="bg-white rounded-3xl overflow-hidden shadow-card border border-surface-200 grid md:grid-cols-2">
                    {/* Visual Side */}
                    <div className={`${assessment.color} p-12 flex items-center justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            src={assessment.image}
                            alt={assessment.title}
                            className="w-full max-w-[280px] object-contain relative z-10 drop-shadow-xl"
                        />
                    </div>

                    {/* Content Side */}
                    <div className="p-10 md:p-14 flex flex-col justify-center">
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-6 leading-tight">
                            {assessment.title}
                        </h1>
                        <p className="text-lg text-text-secondary leading-relaxed mb-8">
                            {assessment.description}
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-text-secondary text-sm">
                                <span className="w-8 h-8 rounded-full bg-surface-100 flex items-center justify-center text-primary-600 font-bold">1</span>
                                <span>takes less than 2 minutes</span>
                            </div>
                            <div className="flex items-center gap-3 text-text-secondary text-sm">
                                <span className="w-8 h-8 rounded-full bg-surface-100 flex items-center justify-center text-primary-600 font-bold">2</span>
                                <span>Confidential & private</span>
                            </div>
                            <div className="flex items-center gap-3 text-text-secondary text-sm">
                                <span className="w-8 h-8 rounded-full bg-surface-100 flex items-center justify-center text-primary-600 font-bold">3</span>
                                <span>Get instant recommendations</span>
                            </div>
                        </div>

                        <div className="mt-10">
                            <Link
                                to={`/assessments/${id}/quiz`}
                                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                            >
                                Start Assessment <FaPlay className="ml-2 text-xs" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentIntro;
