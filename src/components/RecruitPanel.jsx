import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { Check, RefreshCw, Sparkles, Heart } from 'lucide-react';
import { DialogueBox } from './DialogueBox';
import { CharacterAvatar, characterColors } from './Characters';

export function RecruitPanel({ speaker, text, options, correctCount, successText, onComplete, onWrongAnswer, lives }) {
    const [selected, setSelected] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [shakeWrong, setShakeWrong] = useState(false);

    const toggleSelect = (optionId) => {
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
            const timer = setTimeout(() => {
                const correctAnswers = options.filter(o => o.correct).map(o => o.id);
                const allCorrect = selected.every(id => correctAnswers.includes(id));

                setIsCorrect(allCorrect);
                setSubmitted(true);

                if (allCorrect) {
                    if (onComplete) {
                        setTimeout(() => onComplete(), 1500);
                    }
                } else {
                    // Wrong answer
                    setShakeWrong(true);
                    setTimeout(() => setShakeWrong(false), 500);

                    if (onWrongAnswer) {
                        onWrongAnswer();
                    }
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [selected, correctCount, options, onComplete, onWrongAnswer, submitted]);

    const handleRetry = () => {
        setSelected([]);
        setSubmitted(false);
        setIsCorrect(false);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <DialogueBox speaker={speaker} text={text} showContinue={false} />

            {/* Selection counter */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center items-center gap-3 my-6"
            >
                <span className="text-white font-bold text-lg">Select {correctCount}:</span>
                <div className="flex gap-2">
                    {[...Array(correctCount)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`w-12 h-12 rounded-full border-3 border-black flex items-center justify-center transition-all
                                ${i < selected.length
                                    ? 'bg-yellow'
                                    : 'bg-white/20'
                                }`}
                            style={{ boxShadow: i < selected.length ? '3px 3px 0 #1C1C1E' : 'none' }}
                        >
                            {i < selected.length && <Check className="w-6 h-6 text-black" />}
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Recruit cards - using colorful character avatars */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${shakeWrong ? 'animate-shake' : ''}`}
            >
                {options.map((option, index) => {
                    const isSelected = selected.includes(option.id);
                    const showResult = submitted;
                    const accentColor = characterColors[option.id] || '#FFCC00';

                    let cardStyle = 'bg-white';
                    let borderColor = '#1C1C1E';
                    let shadowColor = '#1C1C1E';

                    if (showResult) {
                        if (isCorrect && isSelected && option.correct) {
                            // Only show green if player got ALL correct
                            cardStyle = 'bg-green';
                            borderColor = '#34C759';
                            shadowColor = '#22C55E';
                        } else if (isSelected && !option.correct) {
                            // Show red for wrong selections
                            cardStyle = 'bg-red';
                            borderColor = '#FF3B30';
                            shadowColor = '#DC2626';
                        }
                        // DON'T highlight correct answers if player got it wrong
                    } else if (isSelected) {
                        cardStyle = 'bg-yellow';
                        borderColor = '#FFCC00';
                    }

                    return (
                        <motion.button
                            key={option.id}
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{
                                delay: 0.4 + index * 0.1,
                                type: 'spring',
                                stiffness: 200
                            }}
                            whileHover={!submitted ? { scale: 1.05, rotate: 2 } : {}}
                            whileTap={!submitted ? { scale: 0.95 } : {}}
                            onClick={() => toggleSelect(option.id)}
                            disabled={submitted || (selected.length >= correctCount && !isSelected)}
                            className={`${cardStyle} relative p-6 rounded-2xl border-3 transition-all flex flex-col items-center`}
                            style={{
                                borderColor,
                                boxShadow: `5px 5px 0 ${shadowColor}`,
                            }}
                        >
                            {/* Character Avatar */}
                            <div className="mb-3">
                                <CharacterAvatar
                                    speaker={option.id}
                                    size={70}
                                    mood={isSelected ? 'excited' : 'happy'}
                                />
                            </div>

                            {/* Name */}
                            <span
                                className="font-bold text-center text-sm"
                                style={{ color: showResult && isSelected ? 'white' : accentColor }}
                            >
                                {option.name}
                            </span>

                            {/* Selected indicator */}
                            {isSelected && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className={`absolute -top-2 -right-2 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center shadow-pop-sm
                                        ${showResult && !option.correct ? 'bg-red' : 'bg-yellow'}`}
                                >
                                    {showResult && !option.correct ? (
                                        <span className="text-white font-bold">✕</span>
                                    ) : (
                                        <Check className="w-5 h-5 text-black" />
                                    )}
                                </motion.div>
                            )}
                        </motion.button>
                    );
                })}
            </motion.div>

            {/* Feedback */}
            <AnimatePresence>
                {submitted && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className={`mt-8 p-6 rounded-2xl border-3 border-black ${isCorrect ? 'bg-green' : 'bg-red'}`}
                        style={{ boxShadow: '5px 5px 0 #1C1C1E' }}
                    >
                        <div className="flex items-center gap-4 text-white">
                            {isCorrect ? (
                                <Sparkles className="w-8 h-8" />
                            ) : (
                                <Heart className="w-8 h-8" />
                            )}
                            <div>
                                <p className="font-bold text-xl">
                                    {isCorrect ? 'Team Assembled!' : `Wrong selection! ${lives !== undefined ? `${lives} lives left` : ''}`}
                                </p>
                                <p className="text-white/90 mt-1">
                                    {isCorrect ? successText : 'Some selections were incorrect. Try again!'}
                                </p>
                            </div>
                        </div>

                        {!isCorrect && lives > 0 && (
                            <button
                                onClick={handleRetry}
                                className="btn-pop bg-white text-black mt-4 w-full"
                            >
                                <RefreshCw className="w-5 h-5" />
                                Try Again
                            </button>
                        )}
                        {!isCorrect && lives <= 0 && (
                            <p className="text-white/90 mt-3 text-center font-bold animate-pulse">
                                Game Over...
                            </p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

RecruitPanel.propTypes = {
    speaker: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        correct: PropTypes.bool.isRequired,
    })).isRequired,
    correctCount: PropTypes.number.isRequired,
    successText: PropTypes.string,
    onComplete: PropTypes.func,
    onWrongAnswer: PropTypes.func,
    lives: PropTypes.number,
};
