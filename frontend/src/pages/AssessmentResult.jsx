import { useLocation, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { assessments } from '../data/assessments';
import { FaCheckCircle, FaRedo, FaHome } from 'react-icons/fa';
import { useEffect } from 'react';
import api from '../api/api'; // Corrected import path

const AssessmentResult = () => {
    const { id } = useParams();
    const location = useLocation();
    const score = location.state?.score || 0;
    const percentage = location.state?.percentage || 0;
    const resultCategory = location.state?.resultCategory || {};

    const assessment = assessments.find((a) => a.id === id);

    useEffect(() => {
        // Scroll to top
        window.scrollTo(0, 0);

        // Save to backend
        const saveResult = async () => {
            try {
                if (assessment) {
                    await api.post('/assessments', {
                        assessmentId: assessment.id,
                        title: assessment.title,
                        score: score,
                        maxScore: assessment.questions.length * 4,
                        percentage: percentage,
                        category: resultCategory.label || 'Unknown' // Fallback
                    });
                    console.log('Assessment result saved successfully');
                }
            } catch (error) {
                console.error('Error saving assessment result:', error);
            }
        };

        // Only save if we have a valid score and assessment (simple check to avoid duplicate saves on strict mode or re-renders if logic wasn't guarded, though useEffect with empty dependency or specific dependency logic is better).
        // relying on assessment existence.
        if (assessment) {
            saveResult();
        }
    }, [assessment, score, percentage, resultCategory]);

    if (!assessment) return null;

    // Determine result locally if not passed (fallback) but usually passed from Quiz
    // If we're relying on location state, we should handle if it's missing (e.g. direct link)
    // For now assuming correct flow.

    const result = resultCategory.label ?
        (assessment.results.find(r => r.label === resultCategory.label) || assessment.results[0]) :
        (assessment.results.find(r => score >= r.minScore && score <= r.maxScore) || assessment.results[0]);


    return (
        <div className="min-h-screen pt-28 pb-16 bg-surface-50 flex items-center justify-center">
            <div className="max-w-3xl mx-auto px-4 w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-card border border-surface-200"
                >
                    <div className={`${assessment.color} p-10 text-center`}>
                        <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg">
                            <img src={assessment.image} alt="" className="w-12 h-12 object-contain" />
                        </div>
                        <h1 className="text-3xl font-bold font-display text-text-primary mb-2">Assessment Complete</h1>
                        <p className="text-text-secondary opacity-90">{assessment.title}</p>
                    </div>

                    <div className="p-8 sm:p-12 text-center">
                        <div className="mb-8">
                            <h2 className={`text-2xl font-bold mb-3 ${assessment.iconColor}`}>{result.title}</h2>
                            <p className="text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
                                {result.message}
                            </p>
                        </div>

                        <div className="bg-surface-50 rounded-2xl p-6 mb-10 border border-surface-100">
                            <p className="text-sm text-text-light uppercase tracking-wide font-bold mb-2">Your Score</p>
                            <div className="text-4xl font-bold text-text-primary">{score} <span className="text-xl text-text-light font-normal">points</span></div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to={`/assessments/${id}/quiz`}
                                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-surface-200 text-text-secondary font-semibold hover:border-primary-500 hover:text-primary-600 transition-colors"
                            >
                                <FaRedo className="mr-2" /> Retake
                            </Link>
                            <Link
                                to="/"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all"
                            >
                                <FaHome className="mr-2" /> Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Recommendation Widget */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 text-center"
                >
                    <p className="text-text-light text-sm mb-4">Recommended for you based on your result</p>
                    <div className="inline-flex bg-white rounded-xl p-4 shadow-sm border border-surface-200 items-center gap-4 text-left max-w-md mx-auto hover:border-primary-200 transition-colors cursor-pointer">
                        <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 text-xl font-bold">
                            🧘
                        </div>
                        <div>
                            <h4 className="font-bold text-text-primary">Daily Mindfulness</h4>
                            <p className="text-xs text-text-secondary">Try a 5-minute meditation session</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AssessmentResult;
