import { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Check, AlertCircle, RefreshCw, ArrowRight } from 'lucide-react';

// Matching/Snap component - match items on left to items on right
export function MatchingPanel({ speaker, text, pairs, onComplete, onWrongAnswer, lives }) {
    const [selected, setSelected] = useState(null); // Currently selected left item
    const [matches, setMatches] = useState({}); // { leftId: rightId }
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [shakeWrong, setShakeWrong] = useState(false);

    // Shuffle right items
    const [rightItems] = useState(() => {
        return [...pairs].sort(() => Math.random() - 0.5);
    });

    const handleLeftClick = (leftId) => {
        if (submitted) return;
        setSelected(leftId);
    };

    const handleRightClick = (rightId) => {
        if (submitted || !selected) return;

        // Remove any existing match for this right item
        const newMatches = { ...matches };
        Object.keys(newMatches).forEach(key => {
            if (newMatches[key] === rightId) {
                delete newMatches[key];
            }
        });

        // Add new match
        newMatches[selected] = rightId;
        setMatches(newMatches);
        setSelected(null);
    };

    const handleSubmit = () => {
        if (Object.keys(matches).length !== pairs.length) return;

        // Check if all matches are correct
        const correct = pairs.every(pair => matches[pair.leftId] === pair.rightId);

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
        setSelected(null);
        setMatches({});
    };

    const getMatchedRight = (leftId) => matches[leftId];
    const isRightMatched = (rightId) => Object.values(matches).includes(rightId);

    return (
        <div className="max-w-3xl mx-auto">
            {/* Question */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border-4 border-black p-6 mb-6"
                style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
            >
                <p className="text-lg text-gray-800">{text}</p>
                <p className="text-sm text-gray-500 mt-2">Click a term, then click its match</p>
            </motion.div>

            {/* Matching grid */}
            <motion.div
                animate={shakeWrong ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 gap-8"
            >
                {/* Left column - terms */}
                <div className="space-y-3">
                    <h3 className="text-white font-bold mb-4">Terms</h3>
                    {pairs.map((pair) => {
                        const matchedRight = getMatchedRight(pair.leftId);
                        return (
                            <motion.button
                                key={pair.leftId}
                                onClick={() => handleLeftClick(pair.leftId)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                    w-full p-4 rounded-xl border-3 border-black text-left transition-all
                                    ${selected === pair.leftId ? 'bg-yellow ring-4 ring-yellow/50' : 'bg-white'}
                                    ${matchedRight ? 'bg-teal text-white' : ''}
                                    ${submitted && isCorrect ? 'bg-green text-white' : ''}
                                `}
                                style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                                disabled={submitted}
                            >
                                <span className="font-medium">{pair.leftText}</span>
                                {matchedRight && (
                                    <span className="ml-2 text-sm opacity-75">
                                        <ArrowRight className="inline w-4 h-4" />
                                    </span>
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Right column - definitions */}
                <div className="space-y-3">
                    <h3 className="text-white font-bold mb-4">Definitions</h3>
                    {rightItems.map((pair) => {
                        const matched = isRightMatched(pair.rightId);
                        return (
                            <motion.button
                                key={pair.rightId}
                                onClick={() => handleRightClick(pair.rightId)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                    w-full p-4 rounded-xl border-3 border-black text-left transition-all
                                    ${matched ? 'bg-teal text-white' : 'bg-white'}
                                    ${selected && !matched ? 'hover:bg-yellow/20' : ''}
                                    ${submitted && isCorrect ? 'bg-green text-white' : ''}
                                `}
                                style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                                disabled={submitted || matched}
                            >
                                <span className="font-medium">{pair.rightText}</span>
                            </motion.button>
                        );
                    })}
                </div>
            </motion.div>

            {/* Submit / Feedback */}
            {!submitted && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: Object.keys(matches).length === pairs.length ? 1 : 0.5 }}
                    onClick={handleSubmit}
                    disabled={Object.keys(matches).length !== pairs.length}
                    className="btn-pop bg-green text-white w-full mt-6"
                >
                    <Check className="w-5 h-5" />
                    Check Matches ({Object.keys(matches).length}/{pairs.length})
                </motion.button>
            )}

            {submitted && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-6 p-5 rounded-2xl border-3 border-black ${isCorrect ? 'bg-green' : 'bg-red'}`}
                    style={{ boxShadow: '5px 5px 0 #1C1C1E' }}
                >
                    <div className="flex items-center gap-4 text-white">
                        {isCorrect ? <Check className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
                        <div>
                            <p className="font-bold text-xl">
                                {isCorrect ? 'All matched correctly!' : `Wrong matches! ${lives !== undefined ? `${lives} lives left` : ''}`}
                            </p>
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

MatchingPanel.propTypes = {
    speaker: PropTypes.string,
    text: PropTypes.string.isRequired,
    pairs: PropTypes.arrayOf(PropTypes.shape({
        leftId: PropTypes.string.isRequired,
        leftText: PropTypes.string.isRequired,
        rightId: PropTypes.string.isRequired,
        rightText: PropTypes.string.isRequired,
    })).isRequired,
    onComplete: PropTypes.func,
    onWrongAnswer: PropTypes.func,
    lives: PropTypes.number,
};
