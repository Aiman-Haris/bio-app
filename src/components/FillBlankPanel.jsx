import { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Check, AlertCircle, RefreshCw } from 'lucide-react';

// Fill in the blank - type the missing word
export function FillBlankPanel({ speaker, text, blank, answer, hint, onComplete, onWrongAnswer, lives }) {
    const [input, setInput] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [shakeWrong, setShakeWrong] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Check if answer matches (case insensitive)
        const correct = input.trim().toLowerCase() === answer.toLowerCase();

        setIsCorrect(correct);
        setSubmitted(true);

        if (correct) {
            setTimeout(() => onComplete && onComplete(), 1500);
        } else {
            setShakeWrong(true);
            setTimeout(() => setShakeWrong(false), 500);
            if (onWrongAnswer) onWrongAnswer();
        }
    };

    const handleRetry = () => {
        setSubmitted(false);
        setIsCorrect(false);
        setInput('');
    };

    // Split text by blank marker
    const parts = text.split('_____');

    return (
        <div className="max-w-2xl mx-auto">
            {/* Question with blank */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border-4 border-black p-6 mb-6"
                style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
            >
                <p className="text-lg text-gray-800 leading-relaxed">
                    {parts[0]}
                    <span className="inline-block mx-2 px-4 py-1 bg-yellow rounded-lg border-2 border-black font-bold min-w-[120px] text-center">
                        {submitted ? (isCorrect ? answer : input) : (input || '?')}
                    </span>
                    {parts[1]}
                </p>
                {hint && !submitted && (
                    <p className="text-sm text-gray-500 mt-3">Hint: {hint}</p>
                )}
            </motion.div>

            {/* Input form */}
            {!submitted && (
                <motion.form
                    onSubmit={handleSubmit}
                    animate={shakeWrong ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your answer..."
                        className="w-full p-4 text-lg rounded-xl border-3 border-black bg-white focus:ring-4 focus:ring-yellow/50 outline-none"
                        style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="btn-pop bg-green text-white w-full disabled:opacity-50"
                    >
                        <Check className="w-5 h-5" />
                        Check Answer
                    </button>
                </motion.form>
            )}

            {/* Feedback */}
            {submitted && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-5 rounded-2xl border-3 border-black ${isCorrect ? 'bg-green' : 'bg-red'}`}
                    style={{ boxShadow: '5px 5px 0 #1C1C1E' }}
                >
                    <div className="flex items-center gap-4 text-white">
                        {isCorrect ? <Check className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
                        <div>
                            <p className="font-bold text-xl">
                                {isCorrect ? 'Correct!' : `Wrong! The answer was "${answer}"`}
                            </p>
                            {!isCorrect && lives !== undefined && (
                                <p className="text-white/80">{lives} lives left</p>
                            )}
                        </div>
                    </div>
                    {!isCorrect && lives > 0 && (
                        <button onClick={handleRetry} className="btn-pop bg-white text-black mt-4 w-full">
                            <RefreshCw className="w-5 h-5" />
                            Try Again
                        </button>
                    )}
                </motion.div>
            )}
        </div>
    );
}

FillBlankPanel.propTypes = {
    speaker: PropTypes.string,
    text: PropTypes.string.isRequired,
    blank: PropTypes.string,
    answer: PropTypes.string.isRequired,
    hint: PropTypes.string,
    onComplete: PropTypes.func,
    onWrongAnswer: PropTypes.func,
    lives: PropTypes.number,
};
