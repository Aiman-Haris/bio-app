import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { Check, X, ChevronRight, Sparkles, RefreshCw, Heart } from 'lucide-react';

export function ChoicePanel({ speaker, text, choices, feedback, onComplete, onWrongAnswer, lives }) {
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [shakeWrong, setShakeWrong] = useState(false);

    const handleSelect = (choice) => {
        if (answered) return;

        setSelected(choice.id);
        setAnswered(true);
        setIsCorrect(choice.correct);

        if (choice.correct) {
            if (onComplete) {
                setTimeout(() => onComplete(), 1500);
            }
        } else {
            setShakeWrong(true);
            setTimeout(() => setShakeWrong(false), 500);
            if (onWrongAnswer) {
                onWrongAnswer();
            }
        }
    };

    const handleRetry = () => {
        setSelected(null);
        setAnswered(false);
        setIsCorrect(false);
    };

    // Colors for choice buttons
    const choiceColors = ['#FF3B30', '#FF9500', '#34C759', '#007AFF'];

    return (
        <div className="w-full max-w-4xl mx-auto px-4">
            {/* Two column layout: Question left, Choices right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Question */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl border-4 border-black p-6"
                    style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                >
                    {speaker && (
                        <span className="inline-block px-3 py-1 text-sm font-bold bg-teal text-white rounded-lg mb-3">
                            {speaker}
                        </span>
                    )}
                    <p className="text-xl text-gray-800 leading-relaxed">{text}</p>
                </motion.div>

                {/* Choices */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`space-y-3 ${shakeWrong ? 'animate-shake' : ''}`}
                >
                    {choices.map((choice, index) => {
                        const isSelected = selected === choice.id;
                        const showResult = answered;
                        const baseColor = choiceColors[index % choiceColors.length];

                        let bgColor = 'white';
                        let borderColor = '#1C1C1E';
                        let textColor = '#1C1C1E';

                        if (showResult) {
                            if (isCorrect && choice.correct) {
                                bgColor = '#34C759';
                                borderColor = '#34C759';
                                textColor = 'white';
                            } else if (isSelected && !choice.correct) {
                                bgColor = '#FF3B30';
                                borderColor = '#FF3B30';
                                textColor = 'white';
                            }
                        } else if (isSelected) {
                            bgColor = '#FFCC00';
                        }

                        return (
                            <motion.button
                                key={choice.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={!answered ? { scale: 1.02, x: 5 } : {}}
                                whileTap={!answered ? { scale: 0.98 } : {}}
                                onClick={() => handleSelect(choice)}
                                disabled={answered}
                                className="w-full flex items-center gap-4 p-5 rounded-xl border-3 text-left transition-all"
                                style={{
                                    backgroundColor: bgColor,
                                    borderColor,
                                    color: textColor,
                                    boxShadow: '4px 4px 0 #1C1C1E',
                                }}
                            >
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 flex-shrink-0"
                                    style={{
                                        backgroundColor: showResult ? 'rgba(255,255,255,0.2)' : baseColor,
                                        color: showResult ? 'currentColor' : 'white',
                                        borderColor: showResult ? 'currentColor' : 'transparent'
                                    }}
                                >
                                    {String.fromCharCode(65 + index)}
                                </div>
                                <div className="flex-1 font-semibold">{choice.text}</div>
                                {showResult && isSelected && isCorrect && <Check className="w-6 h-6 flex-shrink-0" />}
                                {showResult && isSelected && !isCorrect && <X className="w-6 h-6 flex-shrink-0" />}
                                {!showResult && <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                            </motion.button>
                        );
                    })}

                    {/* Inline feedback */}
                    <AnimatePresence>
                        {answered && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={`p-4 rounded-xl border-3 border-black ${isCorrect ? 'bg-green' : 'bg-red'}`}
                                style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                            >
                                <div className="flex items-center gap-3 text-white">
                                    {isCorrect ? <Sparkles className="w-6 h-6" /> : <Heart className="w-6 h-6" />}
                                    <div className="flex-1">
                                        <p className="font-bold text-lg">
                                            {isCorrect ? 'Correct!' : `Wrong! ${lives !== undefined ? `${lives} lives left` : ''}`}
                                        </p>
                                        {feedback && isCorrect && <p className="text-white/90 text-sm">{feedback}</p>}
                                    </div>
                                </div>
                                {!isCorrect && lives > 0 && (
                                    <button onClick={handleRetry} className="btn-pop bg-white text-black mt-3 w-full">
                                        <RefreshCw className="w-5 h-5" />
                                        Try Again
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}

ChoicePanel.propTypes = {
    speaker: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        correct: PropTypes.bool,
    })).isRequired,
    feedback: PropTypes.string,
    onComplete: PropTypes.func,
    onWrongAnswer: PropTypes.func,
    lives: PropTypes.number,
};
