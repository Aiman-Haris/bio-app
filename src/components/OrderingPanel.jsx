import { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import PropTypes from 'prop-types';
import { Check, AlertCircle, RefreshCw, GripVertical } from 'lucide-react';

// Ordering/Sequence component - Full Width Layout
export function OrderingPanel({ speaker, text, items, onComplete, onWrongAnswer, lives }) {
    const [orderedItems, setOrderedItems] = useState(() => {
        return [...items].sort(() => Math.random() - 0.5);
    });
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [shakeWrong, setShakeWrong] = useState(false);

    const handleSubmit = () => {
        const correctOrder = items.map(item => item.id);
        const currentOrder = orderedItems.map(item => item.id);
        const correct = JSON.stringify(correctOrder) === JSON.stringify(currentOrder);

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
        setOrderedItems([...items].sort(() => Math.random() - 0.5));
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4">
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
                    <p className="text-sm text-gray-500 mt-3">Drag items to reorder</p>
                </motion.div>

                {/* Reorderable list */}
                <motion.div
                    animate={shakeWrong ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                >
                    <Reorder.Group
                        values={orderedItems}
                        onReorder={setOrderedItems}
                        className="space-y-3"
                    >
                        {orderedItems.map((item, index) => (
                            <Reorder.Item
                                key={item.id}
                                value={item}
                                className={`
                                    flex items-center gap-4 p-4 rounded-xl border-3 border-black cursor-grab active:cursor-grabbing
                                    ${submitted && isCorrect ? 'bg-green' : 'bg-white'}
                                    ${submitted && !isCorrect ? 'bg-red/20' : ''}
                                `}
                                style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                                disabled={submitted}
                            >
                                <span className="w-10 h-10 rounded-full bg-yellow text-black flex items-center justify-center font-bold text-lg border-2 border-black">
                                    {index + 1}
                                </span>
                                <GripVertical className="w-5 h-5 text-gray-400" />
                                <span className={`flex-1 font-medium text-lg ${submitted && isCorrect ? 'text-white' : 'text-gray-800'}`}>
                                    {item.text}
                                </span>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>

                    {/* Submit / Feedback */}
                    {!submitted && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={handleSubmit}
                            className="btn-pop bg-green text-white w-full mt-6"
                        >
                            <Check className="w-5 h-5" />
                            Check Order
                        </motion.button>
                    )}

                    {submitted && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-6 p-5 rounded-2xl border-3 border-black ${isCorrect ? 'bg-green' : 'bg-red'}`}
                            style={{ boxShadow: '5px 5px 0 #1C1C1E' }}
                        >
                            <div className="flex items-center gap-4 text-white">
                                {isCorrect ? <Check className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
                                <p className="font-bold text-xl">
                                    {isCorrect ? 'Perfect order!' : `Wrong! ${lives !== undefined ? `${lives} lives left` : ''}`}
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
                </motion.div>
            </div>
        </div>
    );
}

OrderingPanel.propTypes = {
    speaker: PropTypes.string,
    text: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    })).isRequired,
    onComplete: PropTypes.func,
    onWrongAnswer: PropTypes.func,
    lives: PropTypes.number,
};
