import { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import PropTypes from 'prop-types';

export function DragMatch({ items = [] }) {
    const [terms, setTerms] = useState(items);
    const isCorrect = terms.every((term, index) => term.id === items[index].id);

    return (
        <div className="card-pop bg-teal p-8">
            <h3 className="text-2xl font-bold mb-2 text-black" style={{ fontFamily: 'var(--font-display)' }}>
                🧩 Match the Terms
            </h3>
            <p className="mb-6 text-black opacity-80">Drag the terms on the left to reorder them to match definitions on the right.</p>

            <div className="flex gap-6">
                {/* Draggable Terms */}
                <div className="flex-1">
                    <p className="text-sm font-bold mb-3 text-black uppercase tracking-wide">Terms (Drag to reorder)</p>
                    <Reorder.Group axis="y" values={terms} onReorder={setTerms} className="space-y-3">
                        {terms.map((item) => (
                            <Reorder.Item key={item.id} value={item}>
                                <motion.div
                                    className="bg-yellow text-black p-4 border-bold rounded-xl cursor-grab active:cursor-grabbing shadow-pop-sm"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="font-bold">{item.term}</span>
                                </motion.div>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </div>

                {/* Static Definitions */}
                <div className="flex-1">
                    <p className="text-sm font-bold mb-3 text-black uppercase tracking-wide">Definitions</p>
                    <div className="space-y-3">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white text-black p-4 border-3 border-dashed border-black/30 rounded-xl flex items-center"
                                style={{ minHeight: '60px' }}
                            >
                                <span className="font-medium">{item.definition}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Feedback */}
            <div className="mt-6 flex justify-center">
                <div className={`badge-pop text-lg ${isCorrect ? 'bg-green text-white' : 'bg-white text-black'}`}>
                    {isCorrect ? '🎉 Perfect Match!' : '🔄 Keep trying...'}
                </div>
            </div>
        </div>
    );
}

DragMatch.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        term: PropTypes.string.isRequired,
        definition: PropTypes.string.isRequired
    })),
};
