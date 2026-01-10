import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { characterColors, characterNames } from './Characters';
import QuestionLayout from './QuestionLayout';
import useSound from '../hooks/useSound';

export function ChoicePanel({ speaker, question, choices, correctIndex, onCorrect, onWrong, lives, actName, questionNumber, totalQuestions, isMultiSelect = false }) {
    // We use an array for selection to support both single (length 1) and multi-select
    const [selectedIndices, setSelectedIndices] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const { play } = useSound();

    const accentColor = characterColors[speaker] || '#00C7BE';
    const name = characterNames[speaker] || 'Question';

    // Normalize choices to handle both string arrays and object arrays
    const normalizedChoices = choices.map((choice, idx) => {
        if (typeof choice === 'string') {
            return { text: choice, correct: idx === correctIndex };
        }
        return choice;
    });

    const handleChoice = (index) => {
        if (showFeedback) return;
        play('click', 0.3);

        if (isMultiSelect) {
            // Toggle selection for multi-select
            if (selectedIndices.includes(index)) {
                setSelectedIndices(selectedIndices.filter(i => i !== index));
            } else {
                setSelectedIndices([...selectedIndices, index]);
            }
        } else {
            // Single select replacement
            setSelectedIndices([index]);
        }
    };

    const handleSubmit = () => {
        if (selectedIndices.length === 0 || showFeedback) return;

        let correct;
        if (isMultiSelect) {
            // All selected must be correct, and all correct must be selected
            const allCorrectIndices = normalizedChoices
                .map((c, i) => c.correct ? i : null)
                .filter(i => i !== null);

            const selectedSet = new Set(selectedIndices);
            const correctSet = new Set(allCorrectIndices);

            // Check sizes match and every selected item is in correct set
            correct = selectedSet.size === correctSet.size &&
                [...selectedSet].every(i => correctSet.has(i));
        } else {
            // Single select logic
            correct = normalizedChoices[selectedIndices[0]]?.correct === true;
        }

        setIsCorrect(correct);
        setShowFeedback(true);

        // Play sound based on result
        setTimeout(() => {
            play(correct ? 'correct' : 'wrong', 0.5);
        }, 100);
    };

    const handleContinue = () => {
        if (isCorrect) {
            onCorrect && onCorrect();
        }
    };

    const handleRetry = () => {
        setSelectedIndices([]);
        setShowFeedback(false);
        setIsCorrect(false);
        onWrong && onWrong();
    };

    return (
        <QuestionLayout
            actName={actName}
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
            lives={lives}
            character={speaker}
            reaction={!showFeedback ? 'neutral' : isCorrect ? 'happy' : 'sad'}
        >
            <div className="w-full h-full flex flex-col justify-start pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 items-start">
                    {/* Left: Question Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl border-4 border-black p-4 md:p-6 relative"
                        style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                    >
                        <div
                            className="absolute -top-3 md:-top-4 left-4 md:left-6 px-3 md:px-4 py-1 rounded-full font-bold text-white text-xs border-2 border-black"
                            style={{ backgroundColor: accentColor, boxShadow: '2px 2px 0 #1C1C1E' }}
                        >
                            {name}
                        </div>
                        <p className="text-lg md:text-xl leading-relaxed text-black font-medium mt-2">
                            {question}
                            {isMultiSelect && <span className="block text-sm text-gray-500 mt-2 font-bold">(Select all that apply)</span>}
                        </p>
                    </motion.div>

                    {/* Right: Choices */}
                    <div className="space-y-2 md:space-y-3">
                        {normalizedChoices.map((choice, index) => {
                            const isSelected = selectedIndices.includes(index);
                            return (
                                <motion.button
                                    key={choice.id || index}
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => handleChoice(index)}
                                    disabled={showFeedback}
                                    whileHover={!showFeedback ? { scale: 1.02, x: 4 } : {}}
                                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                                    className={`
                                        w-full text-left px-4 py-3 md:px-5 md:py-4 rounded-2xl border-4 border-black font-medium text-sm md:text-base relative
                                        transition-colors
                                        ${showFeedback && isCorrect && choice.correct
                                            ? 'bg-green-500 text-white'
                                            : showFeedback && isSelected && !isCorrect
                                                ? 'bg-red-500 text-white'
                                                : showFeedback && !isCorrect
                                                    ? 'bg-white opacity-60 text-black'
                                                    : isSelected
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-white hover:bg-gray-50 text-black'
                                        }
                                    `}
                                    style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                                >
                                    <span className="font-black mr-2 md:mr-3 text-base md:text-lg opacity-50">{String.fromCharCode(65 + index)}</span>
                                    {choice.text}
                                    {isSelected && <span className="float-right">✓</span>}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Submit Button - Shows when answer is selected but before feedback */}
                {selectedIndices.length > 0 && !showFeedback && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 md:mt-6 text-center"
                    >
                        <button
                            onClick={handleSubmit}
                            className="bg-yellow-400 text-black px-8 py-3 md:px-12 md:py-4 rounded-2xl border-4 border-black font-black text-lg md:text-xl shadow-[4px_4px_0px_#1C1C1E] hover:shadow-[2px_2px_0px_#1C1C1E] hover:translate-y-1 transition-all"
                        >
                            SUBMIT ANSWER
                        </button>
                    </motion.div>
                )}

                {/* Feedback */}
                <AnimatePresence>
                    {showFeedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 md:mt-6 text-center"
                        >
                            <div
                                className={`inline-block px-4 py-3 md:px-8 md:py-4 rounded-3xl border-4 border-black ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}
                                style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                            >
                                <p className="text-lg md:text-2xl font-black text-white mb-2">
                                    {isCorrect ? 'Correct!' : 'Wrong!'}
                                </p>
                                <div className="flex gap-2 md:gap-4 justify-center flex-wrap">
                                    {!isCorrect && lives > 1 && (
                                        <button onClick={handleRetry} className="btn-pop bg-white text-black text-sm md:text-base px-4 py-2 md:px-6 md:py-2 rounded-xl border-2 border-black">
                                            Try Again
                                        </button>
                                    )}
                                    {!isCorrect && lives <= 1 && (
                                        <button onClick={() => onWrong && onWrong()} className="btn-pop bg-white text-black text-sm md:text-base px-4 py-2 md:px-6 md:py-2 rounded-xl border-2 border-black">
                                            Continue
                                        </button>
                                    )}
                                    {isCorrect && (
                                        <button onClick={handleContinue} className="btn-pop bg-yellow-400 text-black text-sm md:text-base px-4 py-2 md:px-6 md:py-2 rounded-xl border-2 border-black">
                                            Continue
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </QuestionLayout>
    );
}

ChoicePanel.propTypes = {
    speaker: PropTypes.string,
    question: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            id: PropTypes.string,
            text: PropTypes.string.isRequired,
            correct: PropTypes.bool,
        })
    ])).isRequired,
    correctIndex: PropTypes.number,
    onCorrect: PropTypes.func,
    onWrong: PropTypes.func,
    lives: PropTypes.number,
    actName: PropTypes.string,
    questionNumber: PropTypes.number,
    totalQuestions: PropTypes.number,
    isMultiSelect: PropTypes.bool,
};
