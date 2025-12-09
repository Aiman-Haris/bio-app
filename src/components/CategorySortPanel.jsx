import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import PropTypes from 'prop-types';
import { Check, AlertCircle, RefreshCw } from 'lucide-react';

// Draggable Item Component
function DraggableItem({ item, onDrop, categoryRefs, disabled }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const scale = useTransform([x, y], ([latestX, latestY]) => {
        const distance = Math.sqrt(latestX * latestX + latestY * latestY);
        return distance > 10 ? 1.05 : 1;
    });

    const handleDragEnd = (event, info) => {
        // Check which category the item was dropped on
        const dropPoint = { x: info.point.x, y: info.point.y };

        for (const [categoryId, ref] of Object.entries(categoryRefs)) {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                if (
                    dropPoint.x >= rect.left &&
                    dropPoint.x <= rect.right &&
                    dropPoint.y >= rect.top &&
                    dropPoint.y <= rect.bottom
                ) {
                    onDrop(item.id, categoryId);
                    return;
                }
            }
        }

        // Snap back if not dropped on a category
        animate(x, 0, { type: 'spring', stiffness: 500, damping: 30 });
        animate(y, 0, { type: 'spring', stiffness: 500, damping: 30 });
    };

    return (
        <motion.div
            drag={!disabled}
            dragMomentum={false}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            style={{ x, y, scale }}
            whileDrag={{ zIndex: 100, cursor: 'grabbing' }}
            className={`
                px-4 py-3 rounded-xl border-3 border-black font-medium bg-white 
                cursor-grab active:cursor-grabbing select-none
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            layoutId={item.id}
        >
            {item.text}
        </motion.div>
    );
}

// Category Drop Zone Component
function CategoryDropZone({ category, items, innerRef, isActive }) {
    return (
        <motion.div
            ref={innerRef}
            animate={{
                scale: isActive ? 1.02 : 1,
                boxShadow: isActive ? '0 0 0 4px #FFCC00, 6px 6px 0 #1C1C1E' : '6px 6px 0 #1C1C1E'
            }}
            className="p-4 rounded-2xl border-4 border-black min-h-[250px] transition-colors"
            style={{ backgroundColor: category.color || '#f0f0f0' }}
        >
            <h4 className="font-bold text-xl mb-4 text-center text-white border-b-2 border-white/30 pb-2">
                {category.name}
            </h4>
            <div className="space-y-2 min-h-[100px]">
                {items.length === 0 && (
                    <div className="text-white/50 text-center py-8 border-2 border-dashed border-white/30 rounded-lg">
                        Drop here
                    </div>
                )}
                {items.map(item => (
                    <motion.div
                        key={item.id}
                        layoutId={item.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="px-4 py-3 bg-white rounded-xl border-3 border-black font-medium"
                        style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.3)' }}
                    >
                        {item.text}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// Main Component
export function CategorySortPanel({ speaker, text, categories, items, onComplete, onWrongAnswer, lives }) {
    const [sorted, setSorted] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);

    // Create refs for each category drop zone
    const categoryRefs = {};
    categories.forEach(cat => {
        categoryRefs[cat.id] = useRef(null);
    });

    const handleDrop = (itemId, categoryId) => {
        setSorted(prev => ({ ...prev, [itemId]: categoryId }));
    };

    const handleSubmit = () => {
        if (Object.keys(sorted).length !== items.length) return;
        const correct = items.every(item => sorted[item.id] === item.category);
        setIsCorrect(correct);
        setSubmitted(true);
        if (correct) {
            setTimeout(() => onComplete && onComplete(), 1500);
        } else {
            if (onWrongAnswer) onWrongAnswer();
        }
    };

    const handleRetry = () => {
        setSubmitted(false);
        setIsCorrect(false);
        setSorted({});
    };

    const getItemsInCategory = (categoryId) => items.filter(item => sorted[item.id] === categoryId);
    const unsortedItems = items.filter(item => !sorted[item.id]);

    return (
        <div className="w-full max-w-5xl mx-auto px-4">
            {/* Question */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border-4 border-black p-6 mb-6"
                style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
            >
                <p className="text-xl text-gray-800">{text}</p>
                <p className="text-sm text-gray-500 mt-2">Drag items into the correct category</p>
            </motion.div>

            {/* Three column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Unsorted items */}
                <div className="bg-white/10 rounded-2xl p-4 border-2 border-white/20 min-h-[250px]">
                    <h3 className="text-white font-bold mb-4 text-center text-lg">Drag these items</h3>
                    <div className="space-y-3">
                        {unsortedItems.map(item => (
                            <DraggableItem
                                key={item.id}
                                item={item}
                                onDrop={handleDrop}
                                categoryRefs={categoryRefs}
                                disabled={submitted}
                            />
                        ))}
                        {unsortedItems.length === 0 && (
                            <p className="text-white/60 text-center py-8">All items sorted!</p>
                        )}
                    </div>
                </div>

                {/* Categories as drop zones */}
                {categories.map(category => (
                    <CategoryDropZone
                        key={category.id}
                        category={category}
                        items={getItemsInCategory(category.id)}
                        innerRef={categoryRefs[category.id]}
                        isActive={activeCategory === category.id}
                    />
                ))}
            </div>

            {/* Submit / Feedback */}
            <div className="mt-6">
                {!submitted && (
                    <button
                        onClick={handleSubmit}
                        disabled={Object.keys(sorted).length !== items.length}
                        className="btn-pop bg-green text-white w-full disabled:opacity-50"
                    >
                        <Check className="w-5 h-5" />
                        Check Sorting ({Object.keys(sorted).length}/{items.length})
                    </button>
                )}

                {submitted && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-5 rounded-2xl border-3 border-black ${isCorrect ? 'bg-green' : 'bg-red'}`}
                        style={{ boxShadow: '5px 5px 0 #1C1C1E' }}
                    >
                        <div className="flex items-center gap-4 text-white">
                            {isCorrect ? <Check className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
                            <p className="font-bold text-xl">
                                {isCorrect ? 'All sorted correctly!' : `Wrong! ${lives !== undefined ? `${lives} lives left` : ''}`}
                            </p>
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
        </div>
    );
}

CategorySortPanel.propTypes = {
    speaker: PropTypes.string,
    text: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        color: PropTypes.string,
    })).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
    })).isRequired,
    onComplete: PropTypes.func,
    onWrongAnswer: PropTypes.func,
    lives: PropTypes.number,
};
