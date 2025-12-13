import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { characterColors } from './Characters';
import QuestionLayout from './QuestionLayout';

export function CategorySortPanel({ speaker, instruction, items, categories, onCorrect, onWrong, lives, actName, questionNumber, totalQuestions }) {
    // Handle both string arrays and object arrays for categories
    const categoryList = categories.map(cat => typeof cat === 'string' ? { id: cat, name: cat } : cat);

    const [sorted, setSorted] = useState(() => {
        const initial = {};
        categoryList.forEach(cat => {
            initial[cat.id] = [];
        });
        return initial;
    });
    const [unsorted, setUnsorted] = useState([...items]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const dropRefs = useRef({});

    const accentColor = characterColors[speaker] || '#007AFF';

    const handleDragEnd = (item, event, info) => {
        for (const cat of categoryList) {
            const dropZone = dropRefs.current[cat.id];
            if (!dropZone) continue;

            const rect = dropZone.getBoundingClientRect();
            const point = { x: info.point.x, y: info.point.y };

            if (
                point.x >= rect.left &&
                point.x <= rect.right &&
                point.y >= rect.top &&
                point.y <= rect.bottom
            ) {
                setUnsorted(prev => prev.filter(i => i.text !== item.text));
                setSorted(prev => ({
                    ...prev,
                    [cat.id]: [...prev[cat.id], item],
                }));
                return;
            }
        }
    };

    const handleCheck = () => {
        let allCorrect = true;
        for (const cat of categoryList) {
            for (const item of sorted[cat.id]) {
                if (item.category !== cat.id) {
                    allCorrect = false;
                    break;
                }
            }
        }
        if (unsorted.length > 0) {
            allCorrect = false;
        }
        setIsCorrect(allCorrect);
        setShowFeedback(true);
    };

    const handleContinue = () => {
        if (isCorrect) {
            onCorrect && onCorrect();
        }
    };

    const handleRetry = () => {
        const initial = {};
        categoryList.forEach(cat => {
            initial[cat.id] = [];
        });
        setSorted(initial);
        setUnsorted([...items]);
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
                {/* Instruction header */}
                <div
                    className="bg-white rounded-2xl border-4 border-black p-4 mb-4"
                    style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                >
                    <div
                        className="inline-block px-4 py-1 rounded-full font-bold text-white text-xs mb-2 border-2 border-black"
                        style={{ backgroundColor: accentColor }}
                    >
                        Sort Items
                    </div>
                    <p className="text-lg text-black font-medium">{instruction}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left: Unsorted items */}
                    <div className="bg-gray-100 rounded-2xl border-4 border-black p-4 min-h-[200px] flex flex-col items-center justify-center">
                        <h4 className="text-black font-black text-base mb-4 uppercase tracking-wider">Drag Items Below</h4>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {unsorted.map((item) => (
                                <motion.div
                                    key={item.id || item.text}
                                    drag
                                    dragSnapToOrigin
                                    onDragEnd={(e, info) => handleDragEnd(item, e, info)}
                                    whileDrag={{ scale: 1.1, zIndex: 100 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 bg-yellow-400 rounded-xl border-3 border-black font-bold text-sm cursor-grab active:cursor-grabbing shadow-[3px_3px_0_#1C1C1E]"
                                >
                                    {item.text}
                                </motion.div>
                            ))}
                            {unsorted.length === 0 && (
                                <p className="text-gray-400 font-bold text-base">All items sorted!</p>
                            )}
                        </div>
                    </div>

                    {/* Right: Drop zones */}
                    <div className="space-y-3">
                        {categoryList.map((cat) => (
                            <div
                                key={cat.id}
                                ref={(el) => (dropRefs.current[cat.id] = el)}
                                className="p-4 bg-white rounded-2xl border-4 border-black min-h-[90px] flex flex-col relative"
                                style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                            >
                                <h4 className="font-black text-center mb-2 text-base text-black uppercase border-b-2 border-gray-100 pb-1">{cat.name}</h4>
                                <div className="flex flex-wrap gap-2 justify-center flex-1 items-center">
                                    {sorted[cat.id].map((item) => (
                                        <motion.div
                                            key={item.id || item.text}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="px-3 py-1 bg-green-500 text-white rounded-lg border-2 border-black text-xs font-bold shadow-[2px_2px_0_#1C1C1E]"
                                        >
                                            {item.text}
                                        </motion.div>
                                    ))}
                                    {sorted[cat.id].length === 0 && (
                                        <span className="text-gray-300 font-bold text-xs uppercase">Drop here</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Check button */}
                {unsorted.length === 0 && !showFeedback && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-center"
                    >
                        <button onClick={handleCheck} className="btn-pop bg-green-500 text-white text-lg px-10 py-3 font-black rounded-xl border-2 border-black">
                            Check Answers
                        </button>
                    </motion.div>
                )}

                {/* Feedback */}
                <AnimatePresence>
                    {showFeedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 text-center"
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

CategorySortPanel.propTypes = {
    speaker: PropTypes.string,
    instruction: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
    })).isRequired,
    categories: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ])).isRequired,
    onCorrect: PropTypes.func,
    onWrong: PropTypes.func,
    lives: PropTypes.number,
    actName: PropTypes.string,
    questionNumber: PropTypes.number,
    totalQuestions: PropTypes.number,
};
