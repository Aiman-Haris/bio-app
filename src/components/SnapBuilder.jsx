import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import PropTypes from 'prop-types';

export function SnapBuilder({ parts = [], onComplete }) {
    const [snapped, setSnapped] = useState([]);

    const handleSnap = (part) => {
        if (!snapped.find((p) => p.id === part.id)) {
            const newSnapped = [...snapped, part];
            setSnapped(newSnapped);
            if (newSnapped.length === parts.length && onComplete) {
                onComplete();
            }
        }
    };

    const handleReset = () => setSnapped([]);
    const isComplete = snapped.length === parts.length;

    return (
        <div className="card-pop bg-white p-0 overflow-hidden relative">
            {/* Header */}
            <div className="bg-orange p-4 border-b-3 border-black flex justify-between items-center">
                <h3 className="text-xl font-bold text-black" style={{ fontFamily: 'var(--font-display)' }}>
                    🛠️ Build the Response
                </h3>
                <Button color="white" size="sm" onClick={handleReset}>
                    Reset
                </Button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Parts Pool */}
                <div>
                    <p className="text-sm font-bold mb-4 text-black uppercase tracking-wide">Available Parts</p>
                    <div className="flex flex-wrap gap-3">
                        {parts.map((part) => {
                            const isUsed = snapped.find(p => p.id === part.id);
                            return (
                                <motion.button
                                    key={part.id}
                                    onClick={() => handleSnap(part)}
                                    disabled={isUsed}
                                    whileHover={!isUsed ? { scale: 1.05, rotate: -2 } : {}}
                                    whileTap={!isUsed ? { scale: 0.95 } : {}}
                                    className={`px-5 py-3 border-bold rounded-xl font-bold shadow-pop-sm transition-opacity ${isUsed
                                            ? 'bg-gray-200 text-gray-400 opacity-40 cursor-not-allowed'
                                            : 'bg-yellow text-black cursor-pointer hover-lift'
                                        }`}
                                >
                                    {part.label}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Build Zone */}
                <div className="bg-cream border-4 border-dashed border-black/30 rounded-xl p-4 min-h-[200px] relative">
                    <p className="text-xs font-bold text-black/40 uppercase mb-4">Snap Zone</p>

                    {snapped.length === 0 && (
                        <div className="text-center text-black/40 py-10 italic">
                            Click parts to snap them here...
                        </div>
                    )}

                    <div className="space-y-2">
                        {snapped.map((part, index) => (
                            <motion.div
                                key={part.id}
                                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                className="p-3 bg-white border-bold rounded-lg flex items-center gap-3 shadow-pop-sm"
                            >
                                <div className="w-7 h-7 rounded-full bg-green flex items-center justify-center text-sm font-bold text-white border-2 border-black">
                                    {index + 1}
                                </div>
                                <span className="font-medium text-black">{part.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Victory Overlay */}
            {isComplete && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-green flex flex-col items-center justify-center text-center p-6 z-10"
                >
                    <div className="text-7xl mb-4">🏆</div>
                    <h2 className="text-4xl font-black text-white mb-2" style={{ textShadow: '3px 3px 0 #1C1C1E' }}>
                        System Built!
                    </h2>
                    <p className="text-xl text-white mb-6 max-w-xs">
                        You've assembled the immune response sequence.
                    </p>
                    <Button color="white" onClick={handleReset}>
                        Build Again
                    </Button>
                </motion.div>
            )}
        </div>
    );
}

SnapBuilder.propTypes = {
    parts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    })),
    onComplete: PropTypes.func,
};
