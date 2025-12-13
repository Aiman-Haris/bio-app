import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { Timer } from 'lucide-react';
import { characterColors, characterNames } from './Characters';
import QuestionLayout from './QuestionLayout';

export function TimerPanel({ speaker, question, choices, correctIndex, timeLimit = 10, onCorrect, onWrong, lives, actName, questionNumber, totalQuestions }) {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [isRunning, setIsRunning] = useState(true);
    const timerRef = useRef(null);

    const accentColor = characterColors[speaker] || '#FF9500';
    const name = characterNames[speaker] || 'Quick!';

    // Normalize choices to handle both string arrays and object arrays
    const normalizedChoices = choices.map((choice, idx) => {
        if (typeof choice === 'string') {
            return { text: choice, correct: idx === correctIndex };
        }
        return choice;
    });

    // Find correct index from normalized choices
    const actualCorrectIndex = normalizedChoices.findIndex(c => c.correct === true);

    useEffect(() => {
        if (!isRunning || showFeedback) return;

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setIsRunning(false);
                    setShowFeedback(true);
                    setIsCorrect(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [isRunning, showFeedback]);

    const handleChoice = (index) => {
        if (showFeedback || !isRunning) return;

        clearInterval(timerRef.current);
        setIsRunning(false);
        setSelectedIndex(index);
        const correct = normalizedChoices[index]?.correct === true;
        setIsCorrect(correct);
        setShowFeedback(true);
    };

    const handleContinue = () => {
        if (isCorrect) {
            onCorrect && onCorrect();
        }
    };

    const handleRetry = () => {
        setSelectedIndex(null);
        setShowFeedback(false);
        setIsCorrect(false);
        setTimeLeft(timeLimit);
        setIsRunning(true);
        onWrong && onWrong();
    };

    const timerPercentage = (timeLeft / timeLimit) * 100;

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
                {/* Timer bar */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-black font-bold text-lg">Time Remaining</span>
                        <span className={`font-black text-2xl ${timeLeft <= 3 ? 'text-red-500 animate-pulse' : 'text-black'}`}>
                            {timeLeft}s
                        </span>
                    </div>
                    <div className="h-5 bg-gray-200 rounded-full border-4 border-black overflow-hidden">
                        <motion.div
                            className={`h-full ${timeLeft <= 3 ? 'bg-red-500' : 'bg-yellow-400'}`}
                            animate={{ width: `${timerPercentage}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Left: Question Card */}
                    <div
                        className="bg-white rounded-3xl border-4 border-black p-6 relative"
                        style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                    >
                        <div
                            className="absolute -top-4 left-6 px-4 py-1 rounded-full font-bold text-white text-xs border-2 border-black"
                            style={{ backgroundColor: accentColor, boxShadow: '2px 2px 0 #1C1C1E' }}
                        >
                            {name}
                        </div>
                        <p className="text-xl leading-relaxed text-black font-medium mt-2">{question}</p>
                    </div>

                    {/* Right: Choices */}
                    <div className="space-y-3">
                        {normalizedChoices.map((choice, index) => (
                            <motion.button
                                key={choice.id || index}
                                onClick={() => handleChoice(index)}
                                disabled={showFeedback || !isRunning}
                                whileHover={isRunning && !showFeedback ? { scale: 1.02, x: 4 } : {}}
                                whileTap={isRunning && !showFeedback ? { scale: 0.98 } : {}}
                                className={`
                                    w-full text-left px-5 py-4 rounded-2xl border-4 border-black font-medium text-base relative
                                    ${showFeedback && isCorrect && index === selectedIndex
                                        ? 'bg-green-500 text-white'
                                        : showFeedback && index === selectedIndex && !isCorrect
                                            ? 'bg-red-500 text-white'
                                            : showFeedback && !isCorrect
                                                ? 'bg-white opacity-60 text-black'
                                                : !isRunning
                                                    ? 'bg-gray-100 text-gray-400'
                                                    : 'bg-white hover:bg-gray-50 text-black'
                                    }
                                `}
                                style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                            >
                                <span className="font-black mr-3 text-lg opacity-50">{String.fromCharCode(65 + index)}</span>
                                {choice.text}
                            </motion.button>
                        ))}
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
                                    {isCorrect ? 'Correct!' : timeLeft === 0 ? "Time's Up!" : 'Wrong!'}
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

TimerPanel.propTypes = {
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
    timeLimit: PropTypes.number,
    onCorrect: PropTypes.func,
    onWrong: PropTypes.func,
    lives: PropTypes.number,
    actName: PropTypes.string,
    questionNumber: PropTypes.number,
    totalQuestions: PropTypes.number,
};
