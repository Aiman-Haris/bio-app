import { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Check, X, ThumbsUp, ThumbsDown } from 'lucide-react';

// True/False question
export function TrueFalsePanel({ speaker, text, statement, isTrue, explanation, onComplete, onWrongAnswer, lives }) {
    const [answered, setAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleAnswer = (answer) => {
        const correct = answer === isTrue;
        setSelectedAnswer(answer);
        setIsCorrect(correct);
        setAnswered(true);

        if (correct) {
            setTimeout(() => onComplete && onComplete(), 1500);
        } else {
            if (onWrongAnswer) onWrongAnswer();
        }
    };

    const handleRetry = () => {
        setAnswered(false);
        setSelectedAnswer(null);
        setIsCorrect(false);
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Question */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border-4 border-black p-6 mb-6"
                style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
            >
                <p className="text-sm text-gray-500 mb-2">True or False?</p>
                <p className="text-xl text-gray-800 font-medium">{statement}</p>
            </motion.div>

            {/* True/False buttons */}
            {!answered && (
                <div className="grid grid-cols-2 gap-4">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(true)}
                        className="p-6 rounded-2xl border-4 border-black bg-green text-white font-bold text-2xl flex flex-col items-center gap-3"
                        style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                    >
                        <ThumbsUp className="w-12 h-12" />
                        TRUE
                    </motion.button>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(false)}
                        className="p-6 rounded-2xl border-4 border-black bg-red text-white font-bold text-2xl flex flex-col items-center gap-3"
                        style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                    >
                        <ThumbsDown className="w-12 h-12" />
                        FALSE
                    </motion.button>
                </div>
            )}

            {/* Feedback */}
            {answered && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-6 rounded-2xl border-4 border-black ${isCorrect ? 'bg-green' : 'bg-red'}`}
                    style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                >
                    <div className="flex items-center gap-4 text-white mb-4">
                        {isCorrect ? <Check className="w-10 h-10" /> : <X className="w-10 h-10" />}
                        <div>
                            <p className="font-bold text-2xl">
                                {isCorrect ? 'Correct!' : 'Wrong!'}
                            </p>
                            <p className="text-white/80">
                                The statement is {isTrue ? 'TRUE' : 'FALSE'}
                            </p>
                        </div>
                    </div>

                    {explanation && (
                        <p className="text-white/90 bg-black/20 rounded-xl p-4 mb-4">
                            {explanation}
                        </p>
                    )}

                    {!isCorrect && lives !== undefined && (
                        <p className="text-white/80 mb-4">{lives} lives left</p>
                    )}

                    {!isCorrect && lives > 0 && (
                        <button onClick={handleRetry} className="btn-pop bg-white text-black w-full">
                            Try Again
                        </button>
                    )}
                </motion.div>
            )}
        </div>
    );
}

TrueFalsePanel.propTypes = {
    speaker: PropTypes.string,
    text: PropTypes.string,
    statement: PropTypes.string.isRequired,
    isTrue: PropTypes.bool.isRequired,
    explanation: PropTypes.string,
    onComplete: PropTypes.func,
    onWrongAnswer: PropTypes.func,
    lives: PropTypes.number,
};
