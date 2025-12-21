import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { assessments } from '../data/assessments';

const AssessmentQuiz = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [direction, setDirection] = useState(1);

    const assessment = assessments.find((a) => a.id === id);

    if (!assessment) return null;

    const currentQuestion = assessment.questions[currentQuestionIndex];
    const totalQuestions = assessment.questions.length;
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    const handleAnswer = (score) => {
        setAnswers({ ...answers, [currentQuestion.id]: score });

        if (currentQuestionIndex < totalQuestions - 1) {
            setDirection(1);
            setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 250); // Slight delay for feedback
        } else {
            // Calculate result and navigate
            const totalScore = Object.values({ ...answers, [currentQuestion.id]: score }).reduce((a, b) => a + b, 0);
            navigate(`/assessments/${id}/result`, { state: { score: totalScore } });
        }
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    };

    return (
        <div className="min-h-screen pt-28 pb-16 bg-surface-50 flex items-center justify-center">
            <div className="w-full max-w-2xl px-4">

                {/* Progress Header */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm font-medium text-text-light mb-2">
                        <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                        <span>{Math.round(progress)}% Complete</span>
                    </div>
                    <div className="h-2 w-full bg-surface-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-card border border-surface-200 min-h-[400px] flex flex-col justify-center relative overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentQuestionIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="w-full"
                        >
                            <h2 className="text-2xl font-bold font-display text-text-primary mb-8 text-center">
                                {currentQuestion.text}
                            </h2>

                            <div className="space-y-3">
                                {currentQuestion.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(option.score)}
                                        className="w-full text-left p-4 rounded-xl border-2 border-surface-100 hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 group flex items-center justify-between"
                                    >
                                        <span className="font-medium text-text-secondary group-hover:text-primary-700 text-lg">
                                            {option.text}
                                        </span>
                                        <div className="w-6 h-6 rounded-full border-2 border-surface-300 group-hover:border-primary-500 flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Back Button (if needed) */}
                {currentQuestionIndex > 0 && (
                    <button
                        onClick={() => {
                            setDirection(-1);
                            setCurrentQuestionIndex(prev => prev - 1);
                        }}
                        className="mt-6 text-text-light hover:text-text-primary text-sm font-medium flex items-center justify-center w-full transition-colors"
                    >
                        Go back to previous question
                    </button>
                )}
            </div>
        </div>
    );
};

export default AssessmentQuiz;
