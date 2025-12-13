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

export function OrderingPanel({ speaker, instruction, items, correctOrder, onCorrect, onWrong, lives, actName, questionNumber, totalQuestions }) {
    // Normalize items to handle both string arrays and object arrays
    const normalizedItems = useMemo(() => items.map((item, idx) => {
        if (typeof item === 'string') {
            return { id: `item-${idx}`, text: item };
        }
        return item;
    }), [items]);

    // Normalize correctOrder similarly
    const normalizedCorrectOrder = useMemo(() => correctOrder ? correctOrder.map((item, idx) => {
        if (typeof item === 'string') {
            return { id: `item-${idx}`, text: item };
        }
        return item;
    }) : normalizedItems, [correctOrder, normalizedItems]);

    // Shuffle items initially so they don't appear in correct order
    const [orderedItems, setOrderedItems] = useState(() => shuffleArray(normalizedItems));
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const accentColor = characterColors[speaker] || '#007AFF';

    const handleCheck = () => {
        // Compare by text or id
        const correct = orderedItems.every((item, index) => {
            const correctItem = normalizedCorrectOrder[index];
            return item.text === correctItem.text || item.id === correctItem.id;
        });
        setIsCorrect(correct);
        setShowFeedback(true);
    };

    const handleContinue = () => {
        if (isCorrect) {
            onCorrect && onCorrect();
        }
    };

    const handleRetry = () => {
        setOrderedItems([...normalizedItems]);
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left: Instruction Card */}
                    <div
                        className="bg-white rounded-3xl border-4 border-black p-6 relative"
                        style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                    >
                        <div
                            className="inline-block px-4 py-1 rounded-full font-bold text-white text-xs mb-3 border-2 border-black"
                            style={{ backgroundColor: accentColor, boxShadow: '2px 2px 0 #1C1C1E' }}
                        >
                            Put in Order
                        </div>
                        <p className="text-xl leading-relaxed text-black font-medium">{instruction}</p>
                        <p className="mt-4 text-black/50 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full border-2 border-black/20 flex items-center justify-center bg-black/5 text-xs">↕</span>
                            Drag items to reorder
                        </p>
                    </div>

                    {/* Right: Reorderable List */}
                    <div
                        className="bg-gray-100 p-3 rounded-3xl border-4 border-black"
                        style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                    >
                        <Reorder.Group
                            axis="y"
                            values={orderedItems}
                            onReorder={setOrderedItems}
                            className="space-y-2"
                        >
                            {orderedItems.map((item, index) => (
                                <Reorder.Item
                                    key={item.id}
                                    value={item}
                                    className="flex items-center gap-3 p-4 bg-white rounded-xl border-4 border-black cursor-grab active:cursor-grabbing font-bold text-base"
                                    style={{ boxShadow: '3px 3px 0 #1C1C1E' }}
                                    whileDrag={{ scale: 1.03, zIndex: 100, boxShadow: '6px 6px 0 #1C1C1E', backgroundColor: '#FFF9C4' }}
                                >
                                    <span className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white font-black rounded-lg text-sm border-2 border-black">
                                        {index + 1}
                                    </span>
                                    <span className="flex-1 text-black">{item.text}</span>
                                    <GripVertical className="w-5 h-5 text-gray-400" />
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
                        className="mt-6 text-center"
                    >
                        <button onClick={handleCheck} className="btn-pop bg-green-500 text-white text-lg px-10 py-3 font-black rounded-xl border-2 border-black">
                            Check Order
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
                                    {isCorrect ? 'Correct!' : 'Wrong Order!'}
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

OrderingPanel.propTypes = {
    speaker: PropTypes.string,
    instruction: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
        })
    ])).isRequired,
    correctOrder: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            id: PropTypes.string,
            text: PropTypes.string,
        })
    ])),
    onCorrect: PropTypes.func,
    onWrong: PropTypes.func,
    lives: PropTypes.number,
    actName: PropTypes.string,
    questionNumber: PropTypes.number,
    totalQuestions: PropTypes.number,
};
