import { useState, useMemo } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import PropTypes from 'prop-types';
import { GripVertical } from 'lucide-react';
import { characterColors } from './Characters';
import QuestionLayout from './QuestionLayout';

// Fisher-Yates shuffle
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function MatchingPanel({ speaker, instruction, pairs, onCorrect, onWrong, lives, actName, questionNumber, totalQuestions }) {
    const accentColor = characterColors[speaker] || '#007AFF';

    // Normalize pairs - handle both {left, right} and {leftId, leftText, rightId, rightText} formats
    const normalizedPairs = useMemo(() => {
        return pairs.map((p, idx) => ({
            leftId: p.leftId || `left-${idx}`,
            leftText: p.leftText || p.left || '',
            rightId: p.rightId || `right-${idx}`,
            rightText: p.rightText || p.right || '',
        }));
    }, [pairs]);

    // Left items (terms) - STATIC, in original order
    const leftItems = useMemo(() => {
        return normalizedPairs.map(p => ({ id: p.leftId, text: p.leftText, matchId: p.rightId }));
    }, [normalizedPairs]);

    // Right items (definitions) - SHUFFLED initially, user reorders them
    const [rightItems, setRightItems] = useState(() => {
        const items = normalizedPairs.map(p => ({ id: p.rightId, text: p.rightText }));
        return shuffleArray(items);
    });

    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleCheck = () => {
        // Check if the order matches: rightItems[i].id should equal leftItems[i].matchId
        const allCorrect = leftItems.every((left, index) => {
            return rightItems[index]?.id === left.matchId;
        });
        setIsCorrect(allCorrect);
        setShowFeedback(true);
    };

    const handleContinue = () => {
        if (isCorrect) {
            onCorrect && onCorrect();
        }
    };

    const handleRetry = () => {
        setRightItems(shuffleArray(normalizedPairs.map(p => ({ id: p.rightId, text: p.rightText }))));
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
                {/* Instruction header */}
                <div
                    className="bg-white rounded-2xl border-4 border-black p-4 mb-4"
                    style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                >
                    <div
                        className="inline-block px-4 py-1 rounded-full font-bold text-white text-xs mb-2 border-2 border-black"
                        style={{ backgroundColor: accentColor }}
                    >
                        Match Pairs
                    </div>
                    <p className="text-lg text-black font-medium">{instruction}</p>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center bg-gray-100 text-xs">↕</span>
                        Drag definitions on the right to match the terms on the left
                    </p>
                </div>

                {/* Matching columns */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Left column - Static Terms */}
                    <div
                        className="bg-gray-100 p-3 rounded-3xl border-4 border-black"
                        style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                    >
                        <h4 className="text-black font-black text-center mb-5 text-lg uppercase tracking-wider">
                            Terms
                        </h4>
                        <div className="space-y-2">
                            {leftItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-3 p-4 bg-white rounded-xl border-4 border-black font-bold text-base"
                                    style={{ boxShadow: '3px 3px 0 #1C1C1E' }}
                                >
                                    <span className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white font-black rounded-lg text-sm border-2 border-black flex-shrink-0">
                                        {index + 1}
                                    </span>
                                    <span className="flex-1 text-black">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right column - Reorderable Definitions */}
                    <div
                        className="bg-gray-100 p-3 rounded-3xl border-4 border-black"
                        style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                    >
                        <h4 className="text-black font-black text-center mb-5 text-lg uppercase tracking-wider">
                            Definitions
                        </h4>
                        <Reorder.Group
                            axis="y"
                            values={rightItems}
                            onReorder={setRightItems}
                            className="space-y-2"
                        >
                            {rightItems.map((item, index) => (
                                <Reorder.Item
                                    key={item.id}
                                    value={item}
                                    className="flex items-center gap-3 p-4 bg-white rounded-xl border-4 border-black cursor-grab active:cursor-grabbing font-bold text-base"
                                    style={{ boxShadow: '3px 3px 0 #1C1C1E' }}
                                    initial={{ scale: 1 }}
                                    animate={{ scale: 1, backgroundColor: '#FFFFFF' }}
                                    whileDrag={{
                                        scale: 1.03,
                                        zIndex: 100,
                                        boxShadow: '6px 6px 0 #1C1C1E',
                                        backgroundColor: '#FFF9C4'
                                    }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <span className="flex items-center justify-center w-8 h-8 bg-purple-500 text-white font-black rounded-lg text-sm border-2 border-black flex-shrink-0">
                                        {index + 1}
                                    </span>
                                    <span className="flex-1 text-black">{item.text}</span>
                                    <GripVertical className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    </div>
                </div>

                {/* Check button */}
                {!showFeedback && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-10 text-center"
                    >
                        <button onClick={handleCheck} className="btn-pop bg-green-500 text-white text-lg px-10 py-3 font-black rounded-xl border-2 border-black">
                            Check Matches
                        </button>
                    </motion.div>
                )}

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
                                    {isCorrect ? 'Perfect Matches!' : 'Wrong Order!'}
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

MatchingPanel.propTypes = {
    speaker: PropTypes.string,
    instruction: PropTypes.string.isRequired,
    pairs: PropTypes.arrayOf(PropTypes.shape({
        left: PropTypes.string,
        right: PropTypes.string,
        leftId: PropTypes.string,
        leftText: PropTypes.string,
        rightId: PropTypes.string,
        rightText: PropTypes.string,
    })).isRequired,
    onCorrect: PropTypes.func,
    onWrong: PropTypes.func,
    lives: PropTypes.number,
    actName: PropTypes.string,
    questionNumber: PropTypes.number,
    totalQuestions: PropTypes.number,
};
