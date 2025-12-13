import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { Check, X } from 'lucide-react';
import { characterColors, characterNames } from './Characters';
import QuestionLayout from './QuestionLayout';

export function TrueFalsePanel({ speaker, statement, isTrue, onCorrect, onWrong, lives, actName, questionNumber, totalQuestions }) {
    const [selected, setSelected] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const accentColor = characterColors[speaker] || '#00C7BE';
    const name = characterNames[speaker] || 'True or False?';

    const handleChoice = (answer) => {
        if (showFeedback) return;

        setSelected(answer);
        // isTrue is the correct answer from storyData
        const correct = answer === isTrue;
        setIsCorrect(correct);
        setShowFeedback(true);
    };

    const handleContinue = () => {
        if (isCorrect) {
            onCorrect && onCorrect();
        }
    };

    const handleRetry = () => {
        setSelected(null);
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
            <div className="w-full h-full flex flex-col justify-start pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Left: Statement Card */}
                    <div
                        className="bg-white rounded-3xl border-4 border-black p-6 relative min-h-48 flex items-center justify-center"
                        style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                    >
                        <div
                            className="absolute -top-4 left-6 px-4 py-1 rounded-full font-bold text-white text-xs border-2 border-black"
                            style={{ backgroundColor: accentColor, boxShadow: '2px 2px 0 #1C1C1E' }}
                        >
                            {name}
                        </div>
                        <p className="text-xl leading-relaxed text-black text-center font-bold">{statement}</p>
                    </div>

                    {/* Right: True/False Buttons */}
                    <div className="flex flex-col gap-4 justify-center">
                        <motion.button
                            onClick={() => handleChoice(true)}
                            disabled={showFeedback}
                            whileHover={!showFeedback ? { scale: 1.03, x: 4 } : {}}
                            whileTap={!showFeedback ? { scale: 0.97 } : {}}
                            className={`
                                py-6 rounded-2xl border-4 border-black font-black text-2xl
                                flex items-center justify-center gap-4 relative overflow-hidden
                                transition-colors
                                ${showFeedback && isTrue === true && isCorrect
                                    ? 'bg-green-500 text-white'
                                    : showFeedback && selected === true && !isCorrect
                                        ? 'bg-red-500 text-white'
                                        : 'bg-white hover:bg-green-100 text-green-600'
                                }
                            `}
                            style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                        >
                            <Check className="w-8 h-8" strokeWidth={4} />
                            TRUE
                        </motion.button>

                        <motion.button
                            onClick={() => handleChoice(false)}
                            disabled={showFeedback}
                            whileHover={!showFeedback ? { scale: 1.03, x: 4 } : {}}
                            whileTap={!showFeedback ? { scale: 0.97 } : {}}
                            className={`
                                py-6 rounded-2xl border-4 border-black font-black text-2xl
                                flex items-center justify-center gap-4 relative overflow-hidden
                                transition-colors
                                ${showFeedback && isTrue === false && isCorrect
                                    ? 'bg-green-500 text-white'
                                    : showFeedback && selected === false && !isCorrect
                                        ? 'bg-red-500 text-white'
                                        : 'bg-white hover:bg-red-100 text-red-600'
                                }
                            `}
                            style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                        >
                            <X className="w-8 h-8" strokeWidth={4} />
                            FALSE
                        </motion.button>
                    </div>
                </div>

                {/* Feedback */}
                <AnimatePresence>
                    {showFeedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 text-center"
                        >
                            <div
                                className={`inline-block px-8 py-4 rounded-3xl border-4 border-black ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}
                                style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                            >
                                <p className="text-2xl font-black text-white mb-2">
                                    {isCorrect ? 'Correct!' : 'Wrong!'}
                                </p>
                                <div className="flex gap-4 justify-center">
                                    {!isCorrect && lives > 1 && (
                                        <button onClick={handleRetry} className="btn-pop bg-white text-black text-base px-6 py-2 rounded-xl border-2 border-black">
                                            Try Again
                                        </button>
                                    )}
                                    {!isCorrect && lives <= 1 && (
                                        <button onClick={() => onWrong && onWrong()} className="btn-pop bg-white text-black text-base px-6 py-2 rounded-xl border-2 border-black">
                                            Continue
                                        </button>
                                    )}
                                    {isCorrect && (
                                        <button onClick={handleContinue} className="btn-pop bg-yellow-400 text-black text-base px-6 py-2 rounded-xl border-2 border-black">
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

TrueFalsePanel.propTypes = {
    speaker: PropTypes.string,
    statement: PropTypes.string.isRequired,
    isTrue: PropTypes.bool.isRequired,
    onCorrect: PropTypes.func,
    onWrong: PropTypes.func,
    lives: PropTypes.number,
    actName: PropTypes.string,
    questionNumber: PropTypes.number,
    totalQuestions: PropTypes.number,
};
