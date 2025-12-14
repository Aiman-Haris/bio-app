import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { characterColors, characterNames } from './Characters';
import QuestionLayout from './QuestionLayout';

export function FillBlankPanel({ speaker, question, correctAnswer, onCorrect, onWrong, lives, actName, questionNumber, totalQuestions }) {
    const [answer, setAnswer] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const accentColor = characterColors[speaker] || '#00C7BE';
    const name = characterNames[speaker] || 'Fill in the blank';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (showFeedback || !answer.trim()) return;

        const correct = answer.trim().toLowerCase() === correctAnswer.toLowerCase();
        setIsCorrect(correct);
        setShowFeedback(true);
    };

    const handleContinue = () => {
        if (isCorrect) {
            onCorrect && onCorrect();
        }
    };

    const handleRetry = () => {
        setAnswer('');
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 items-center">
                    {/* Left: Question Card */}
                    <div
                        className="bg-white rounded-3xl border-4 border-black p-4 md:p-6 relative"
                        style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                    >
                        <div
                            className="absolute -top-3 md:-top-4 left-4 md:left-6 px-3 md:px-4 py-1 rounded-full font-bold text-white text-xs border-2 border-black"
                            style={{ backgroundColor: accentColor, boxShadow: '2px 2px 0 #1C1C1E' }}
                        >
                            {name}
                        </div>
                        <p className="text-lg md:text-xl leading-relaxed text-black font-medium mt-2">{question}</p>
                    </div>

                    {/* Right: Input */}
                    <div className="flex flex-col justify-center bg-teal-100 p-4 md:p-6 rounded-3xl border-4 border-black" style={{ boxShadow: '4px 4px 0 #1C1C1E' }}>
                        <form onSubmit={handleSubmit}>
                            <label className="block text-black font-black text-lg md:text-xl mb-3 md:mb-4 text-center">Your Answer</label>
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Type here..."
                                disabled={showFeedback}
                                className="w-full px-4 md:px-6 py-3 md:py-4 text-lg md:text-xl text-center font-bold border-4 border-black rounded-2xl mb-3 md:mb-4 focus:outline-none focus:ring-4 focus:ring-teal-400 shadow-[4px_4px_0_#1C1C1E] text-black bg-white"
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={showFeedback || !answer.trim()}
                                className="btn-pop bg-teal-500 text-white w-full text-base md:text-lg py-2 md:py-3 font-bold disabled:opacity-50 disabled:cursor-not-allowed rounded-xl border-4 border-black"
                                style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                            >
                                Submit Answer
                            </button>
                        </form>
                    </div>
                </div>

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

FillBlankPanel.propTypes = {
    speaker: PropTypes.string,
    question: PropTypes.string.isRequired,
    correctAnswer: PropTypes.string.isRequired,
    onCorrect: PropTypes.func,
    onWrong: PropTypes.func,
    lives: PropTypes.number,
    actName: PropTypes.string,
    questionNumber: PropTypes.number,
    totalQuestions: PropTypes.number,
};
