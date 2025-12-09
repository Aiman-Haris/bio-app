import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Clock, Check, X, Zap, RefreshCw } from 'lucide-react';

// Timer Challenge - MCQ with countdown (Full Width Layout)
export function TimerPanel({ speaker, text, choices, timeLimit = 10, onComplete, onWrongAnswer, lives }) {
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [timedOut, setTimedOut] = useState(false);

    useEffect(() => {
        if (answered || timedOut) return;

        if (timeLeft <= 0) {
            setTimedOut(true);
            if (onWrongAnswer) onWrongAnswer();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, answered, timedOut, onWrongAnswer]);

    const handleSelect = (choice) => {
        if (answered || timedOut) return;

        const correct = choice.correct;
        setSelected(choice.id);
        setIsCorrect(correct);
        setAnswered(true);

        if (correct) {
            setTimeout(() => onComplete && onComplete(), 1500);
        } else {
            if (onWrongAnswer) onWrongAnswer();
        }
    };

    const handleRetry = () => {
        setTimeLeft(timeLimit);
        setSelected(null);
        setAnswered(false);
        setIsCorrect(false);
        setTimedOut(false);
    };

    const getTimerColor = () => {
        if (timeLeft <= 3) return 'bg-red';
        if (timeLeft <= 6) return 'bg-orange';
        return 'bg-green';
    };

    const timerPercent = (timeLeft / timeLimit) * 100;

    return (
        <div className="w-full max-w-4xl mx-auto px-4">
            {/* Timer bar at top */}
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-white">
                    <Zap className="w-6 h-6" />
                    <span className="font-bold text-lg">SPEED ROUND</span>
                </div>
                <div className="flex-1 h-4 bg-white/20 rounded-full overflow-hidden border-2 border-black">
                    <motion.div
                        className={`h-full ${getTimerColor()}`}
                        animate={{ width: `${timerPercent}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <div className="flex items-center gap-2 text-white">
                    <Clock className="w-6 h-6" />
                    <span className="font-bold text-3xl">{timeLeft}s</span>
                </div>
            </div>

            {/* Two column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Question */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl border-4 border-black p-6"
                    style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                >
                    <p className="text-xl text-gray-800">{text}</p>
                </motion.div>

                {/* Choices or Timeout */}
                <div className="space-y-3">
                    {!timedOut && choices.map((choice, index) => {
                        const isSelected = selected === choice.id;
                        const showResult = answered && isSelected;

                        return (
                            <motion.button
                                key={choice.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={!answered ? { scale: 1.02, x: 5 } : {}}
                                whileTap={!answered ? { scale: 0.98 } : {}}
                                onClick={() => handleSelect(choice)}
                                disabled={answered}
                                className={`
                                    w-full p-5 rounded-xl border-3 border-black text-left font-medium transition-all
                                    ${!answered ? 'bg-white hover:bg-yellow/20' : ''}
                                    ${showResult && isCorrect ? 'bg-green text-white' : ''}
                                    ${showResult && !isCorrect ? 'bg-red text-white' : ''}
                                    ${answered && !isSelected ? 'opacity-50' : ''}
                                `}
                                style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                            >
                                <div className="flex items-center gap-4">
                                    <span className="w-10 h-10 rounded-full bg-yellow text-black flex items-center justify-center font-bold text-lg border-2 border-black">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span className="flex-1 text-lg">{choice.text}</span>
                                    {showResult && (isCorrect ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />)}
                                </div>
                            </motion.button>
                        );
                    })}

                    {/* Timeout message */}
                    {timedOut && !answered && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-6 rounded-2xl border-4 border-black bg-red text-white text-center"
                            style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                        >
                            <Clock className="w-12 h-12 mx-auto mb-3" />
                            <p className="font-bold text-2xl mb-2">Time's Up!</p>
                            {lives !== undefined && <p className="mb-4">{lives} lives left</p>}
                            {lives > 0 && (
                                <button onClick={handleRetry} className="btn-pop bg-white text-black w-full">
                                    <RefreshCw className="w-5 h-5" />
                                    Try Again
                                </button>
                            )}
                        </motion.div>
                    )}

                    {/* Wrong answer feedback */}
                    {answered && !isCorrect && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-xl border-3 border-black bg-red"
                            style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                        >
                            <div className="flex items-center gap-3 text-white mb-3">
                                <X className="w-6 h-6" />
                                <span className="font-bold text-lg">Wrong! {lives !== undefined && `${lives} lives left`}</span>
                            </div>
                            {lives > 0 && (
                                <button onClick={handleRetry} className="btn-pop bg-white text-black w-full">
                                    <RefreshCw className="w-5 h-5" />
                                    Try Again
                                </button>
                            )}
                        </motion.div>
                    )}

                    {/* Correct feedback */}
                    {answered && isCorrect && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-xl border-3 border-black bg-green"
                            style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                        >
                            <div className="flex items-center gap-3 text-white">
                                <Check className="w-6 h-6" />
                                <span className="font-bold text-lg">Fast and correct!</span>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

TimerPanel.propTypes = {
    speaker: PropTypes.string,
    text: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        correct: PropTypes.bool.isRequired,
    })).isRequired,
    timeLimit: PropTypes.number,
    onComplete: PropTypes.func,
    onWrongAnswer: PropTypes.func,
    lives: PropTypes.number,
};
