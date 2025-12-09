import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

export function MultiSelectTap({
    question,
    options = [],
    correctCount = 3,
    onComplete
}) {
    const [selected, setSelected] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const toggleOption = (optionId) => {
        if (submitted) return;

        if (selected.includes(optionId)) {
            setSelected(selected.filter(id => id !== optionId));
        } else if (selected.length < correctCount) {
            setSelected([...selected, optionId]);
        }
    };

    // Auto-submit when correct count reached
    useEffect(() => {
        if (selected.length === correctCount && !submitted) {
            // Small delay before auto-check
            const timer = setTimeout(() => {
                const correctAnswers = options.filter(o => o.correct).map(o => o.id);
                const allCorrect = selected.every(id => correctAnswers.includes(id));

                setIsCorrect(allCorrect);
                setSubmitted(true);

                if (allCorrect && onComplete) {
                    setTimeout(() => onComplete(), 1500);
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [selected, correctCount, options, onComplete, submitted]);

    const handleRetry = () => {
        setSelected([]);
        setSubmitted(false);
        setIsCorrect(false);
    };

    return (
        <div className="relative">
            {/* Game header */}
            <div className="bg-orange text-black p-6 rounded-t-2xl border-3 border-black border-b-0">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">🎯</span>
                        <span className="badge-pop bg-black text-white">Select {correctCount}</span>
                    </div>
                    {/* Selection counter */}
                    <div className="flex gap-1">
                        {[...Array(correctCount)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-8 h-8 rounded-full border-3 border-black flex items-center justify-center text-lg transition-all
                                    ${i < selected.length ? 'bg-green text-white scale-110' : 'bg-white/50'}`}
                            >
                                {i < selected.length ? '✓' : ''}
                            </div>
                        ))}
                    </div>
                </div>
                <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                    {question}
                </h3>
            </div>

            {/* Options grid */}
            <div className="bg-white p-6 rounded-b-2xl border-3 border-black shadow-pop">
                <div className="grid grid-cols-2 gap-4">
                    {options.map((option, index) => {
                        const isSelected = selected.includes(option.id);
                        const showResult = submitted;
                        const isOptionCorrect = option.correct;

                        let bgClass = 'bg-white';
                        let borderClass = 'border-black/20';

                        if (showResult) {
                            if (isSelected && isOptionCorrect) {
                                bgClass = 'bg-green';
                                borderClass = 'border-green';
                            } else if (isSelected && !isOptionCorrect) {
                                bgClass = 'bg-red';
                                borderClass = 'border-red';
                            } else if (!isSelected && isOptionCorrect) {
                                bgClass = 'bg-green/30';
                                borderClass = 'border-green';
                            }
                        } else if (isSelected) {
                            bgClass = 'bg-yellow';
                            borderClass = 'border-black';
                        }

                        return (
                            <motion.button
                                key={option.id}
                                onClick={() => toggleOption(option.id)}
                                disabled={submitted}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={!submitted && selected.length < correctCount ? { scale: 1.05 } : {}}
                                whileTap={!submitted ? { scale: 0.95 } : {}}
                                className={`p-5 border-3 ${borderClass} rounded-xl text-left transition-all shadow-pop-sm
                                    ${bgClass}
                                    ${submitted ? 'cursor-default' : 'cursor-pointer'}
                                    ${showResult && (isSelected || isOptionCorrect) ? 'text-white' : 'text-black'}
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg border-2 border-current flex items-center justify-center
                                        ${isSelected && !showResult ? 'bg-black text-white' : ''}`}>
                                        {isSelected && '✓'}
                                    </div>
                                    <span className="font-bold">{option.text}</span>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Feedback */}
                <AnimatePresence>
                    {submitted && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-6 p-4 rounded-xl border-3 border-black text-center ${isCorrect ? 'bg-green/20' : 'bg-red/20'}`}
                        >
                            <span className="text-5xl block mb-2">{isCorrect ? '🎉' : '😅'}</span>
                            <p className={`font-bold text-xl ${isCorrect ? 'text-green' : 'text-red'}`}>
                                {isCorrect ? 'Perfect Match!' : 'Not quite right...'}
                            </p>

                            {!isCorrect && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    onClick={handleRetry}
                                    className="mt-4 btn-pop bg-orange text-black w-full"
                                >
                                    🔄 Try Again
                                </motion.button>
                            )}

                            {isCorrect && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-green font-bold mt-2"
                                >
                                    Moving on...
                                </motion.p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

MultiSelectTap.propTypes = {
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        correct: PropTypes.bool.isRequired,
    })).isRequired,
    correctCount: PropTypes.number,
    onComplete: PropTypes.func,
};
