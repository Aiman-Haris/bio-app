import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

export function SingleChoice({
    question,
    options = [],
    feedback,
    onComplete
}) {
    const [selected, setSelected] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);

    const handleSelect = (optionId) => {
        if (selected !== null) return; // Already answered

        const selectedOption = options.find(o => o.id === optionId);
        const correct = selectedOption?.correct || false;

        setSelected(optionId);
        setIsCorrect(correct);
        setShowFeedback(true);

        // Auto-proceed after delay if correct
        if (correct && onComplete) {
            setTimeout(() => onComplete(), 1500);
        }
    };

    const handleRetry = () => {
        setSelected(null);
        setIsCorrect(null);
        setShowFeedback(false);
    };

    return (
        <div className="relative">
            {/* Game-style header */}
            <div className="bg-blue text-white p-6 rounded-t-2xl border-3 border-black border-b-0">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">❓</span>
                    <span className="badge-pop bg-yellow text-black">Answer to continue!</span>
                </div>
                <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                    {question}
                </h3>
            </div>

            {/* Options - game style */}
            <div className="bg-white p-6 rounded-b-2xl border-3 border-black shadow-pop">
                <div className="grid grid-cols-1 gap-3">
                    {options.map((option, index) => {
                        const isSelected = selected === option.id;
                        const answered = selected !== null;

                        let bgClass = 'bg-white hover:bg-yellow/50 hover:scale-[1.02]';
                        let borderClass = 'border-black/20';
                        let textClass = 'text-black';

                        if (answered) {
                            if (option.correct) {
                                bgClass = 'bg-green';
                                borderClass = 'border-green';
                                textClass = 'text-white';
                            } else if (isSelected && !option.correct) {
                                bgClass = 'bg-red';
                                borderClass = 'border-red';
                                textClass = 'text-white';
                            } else {
                                bgClass = 'bg-white/50';
                            }
                        }

                        const letters = ['A', 'B', 'C', 'D'];

                        return (
                            <motion.button
                                key={option.id}
                                onClick={() => handleSelect(option.id)}
                                disabled={answered}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={!answered ? { scale: 1.02, x: 5 } : {}}
                                whileTap={!answered ? { scale: 0.98 } : {}}
                                className={`w-full p-4 border-3 ${borderClass} rounded-xl text-left transition-all
                                    ${bgClass} ${textClass}
                                    ${answered ? 'cursor-default' : 'cursor-pointer'}
                                `}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl border-2 border-current flex items-center justify-center font-bold text-lg
                                        ${isSelected ? 'bg-black/20' : ''}`}>
                                        {letters[index]}
                                    </div>
                                    <span className="font-bold flex-1">{option.text}</span>
                                    {answered && option.correct && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="text-3xl"
                                        >
                                            ✓
                                        </motion.span>
                                    )}
                                    {answered && isSelected && !option.correct && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="text-3xl"
                                        >
                                            ✗
                                        </motion.span>
                                    )}
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Feedback overlay */}
                <AnimatePresence>
                    {showFeedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`mt-6 p-4 rounded-xl border-3 border-black ${isCorrect ? 'bg-green/20' : 'bg-red/20'}`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-4xl">{isCorrect ? '🎉' : '💡'}</span>
                                <div>
                                    <p className={`font-bold text-lg ${isCorrect ? 'text-green' : 'text-red'}`}>
                                        {isCorrect ? 'Correct!' : 'Not quite...'}
                                    </p>
                                    {feedback && (
                                        <p className="text-black/80 mt-1">{feedback}</p>
                                    )}
                                </div>
                            </div>

                            {!isCorrect && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    onClick={handleRetry}
                                    className="mt-4 w-full btn-pop bg-orange text-black"
                                >
                                    🔄 Try Again
                                </motion.button>
                            )}

                            {isCorrect && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-center text-green font-bold mt-3"
                                >
                                    Moving to next challenge...
                                </motion.p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

SingleChoice.propTypes = {
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        correct: PropTypes.bool.isRequired,
    })).isRequired,
    feedback: PropTypes.string,
    onComplete: PropTypes.func,
};
