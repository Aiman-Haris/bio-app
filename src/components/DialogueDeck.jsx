import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import Badge from './Badge';
import PropTypes from 'prop-types';

export function DialogueDeck({ cards }) {
    const [index, setIndex] = useState(0);

    const nextCard = () => {
        if (index < cards.length - 1) setIndex(index + 1);
    };

    const prevCard = () => {
        if (index > 0) setIndex(index - 1);
    };

    const currentCard = cards[index];

    return (
        <div className="relative w-full max-w-md mx-auto" style={{ perspective: '1000px' }}>
            {/* Stack Effect */}
            <div className="absolute inset-0 bg-blue border-bold rounded-3xl translate-x-3 translate-y-3 -z-10"></div>
            <div className="absolute inset-0 bg-pink border-bold rounded-3xl translate-x-6 translate-y-6 -z-20"></div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border-bold rounded-3xl p-8 shadow-pop flex flex-col items-center text-center min-h-[450px]"
                >
                    <div className="flex-1 flex flex-col justify-center items-center gap-6">
                        {/* Icon */}
                        <div className="w-28 h-28 bg-teal border-bold rounded-full flex items-center justify-center text-6xl shadow-pop-sm">
                            {currentCard.icon || '💬'}
                        </div>

                        {/* Topic Badge */}
                        <Badge color="yellow">{currentCard.topic}</Badge>

                        {/* Title */}
                        <h3 className="text-3xl font-black text-black" style={{ fontFamily: 'var(--font-display)' }}>
                            {currentCard.title}
                        </h3>

                        {/* Content */}
                        <p className="text-lg text-black opacity-80 max-w-xs">
                            {currentCard.content}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="w-full pt-6 border-t-3 border-dashed border-black/20 flex justify-between items-center mt-6">
                        <Button
                            color="white"
                            size="sm"
                            onClick={prevCard}
                            disabled={index === 0}
                        >
                            ← Prev
                        </Button>

                        <span className="font-bold font-mono text-black/50 text-lg">
                            {index + 1} / {cards.length}
                        </span>

                        <Button
                            color="blue"
                            size="sm"
                            onClick={nextCard}
                            disabled={index === cards.length - 1}
                        >
                            Next →
                        </Button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

DialogueDeck.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        icon: PropTypes.string,
        topic: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.string
    })).isRequired
};
