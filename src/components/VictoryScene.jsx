import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Trophy, RotateCcw, ArrowRight, Star, Sparkles } from 'lucide-react';
import { Ghost, Planet, IceCream, Cat, Browser } from 'react-kawaii';

export function VictoryScene({ title, description, onRestart, onSwitchPath }) {
    // Confetti-like floating characters
    const floatingCells = [
        { Component: Ghost, color: '#FF9500', delay: 0 },
        { Component: Planet, color: '#FF2D55', delay: 0.2 },
        { Component: IceCream, color: '#34C759', delay: 0.4 },
        { Component: Cat, color: '#FF3B30', delay: 0.6 },
        { Component: Browser, color: '#007AFF', delay: 0.8 },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden"
        >
            {/* Floating celebration cells */}
            {floatingCells.map((cell, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 100, x: (i - 2) * 150 }}
                    animate={{
                        opacity: 1,
                        y: [100, -20, 100],
                        x: (i - 2) * 150 + Math.sin(i) * 30,
                        rotate: [0, 360]
                    }}
                    transition={{
                        delay: cell.delay,
                        duration: 4,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut'
                    }}
                    className="absolute top-1/4"
                    style={{ left: `${20 + i * 15}%` }}
                >
                    <cell.Component size={50} mood="excited" color={cell.color} />
                </motion.div>
            ))}

            <div className="text-center max-w-xl relative z-10">
                {/* Trophy card */}
                <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-40 h-40 rounded-3xl bg-yellow border-4 border-black mx-auto mb-8 flex items-center justify-center"
                    style={{ boxShadow: '8px 8px 0 #1C1C1E' }}
                >
                    <motion.div
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <Trophy className="w-20 h-20 text-black" />
                    </motion.div>
                </motion.div>

                {/* Stars */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center gap-3 mb-6"
                >
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                        >
                            <Star
                                className="w-10 h-10 fill-yellow text-black"
                                strokeWidth={2}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white border-4 border-black rounded-2xl p-6 mb-6"
                    style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-3 flex items-center justify-center gap-3">
                        <Sparkles className="w-8 h-8 text-yellow" />
                        {title}
                        <Sparkles className="w-8 h-8 text-yellow" />
                    </h1>
                    <p className="text-lg text-gray-700">{description}</p>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row justify-center gap-4"
                >
                    <button
                        onClick={onRestart}
                        className="btn-pop bg-white text-black"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Play Again
                    </button>
                    <button
                        onClick={onSwitchPath}
                        className="btn-pop bg-blue text-white"
                    >
                        Try Other Path
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
}

VictoryScene.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onRestart: PropTypes.func,
    onSwitchPath: PropTypes.func,
};
