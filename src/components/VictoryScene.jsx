import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Trophy, RotateCcw, ArrowRight, Star, Sparkles } from 'lucide-react';
import { Ghost, Planet, IceCream, Cat, Browser } from 'react-kawaii';
import QuestionLayout from './QuestionLayout';

export function VictoryScene({ title, description, onRestart, onSwitchPath, lives, actName, questionNumber, totalQuestions }) {
    // Confetti-like floating characters
    const floatingCells = [
        { Component: Ghost, color: '#FF9500', delay: 0 },
        { Component: Planet, color: '#FF2D55', delay: 0.2 },
        { Component: IceCream, color: '#34C759', delay: 0.4 },
        { Component: Cat, color: '#FF3B30', delay: 0.6 },
        { Component: Browser, color: '#007AFF', delay: 0.8 },
    ];

    return (
        <QuestionLayout
            actName={actName}
            questionNumber={questionNumber || totalQuestions}
            totalQuestions={totalQuestions}
            lives={lives}
            character="macrophage"
            reaction="happy"
        >
            <div className="w-full h-full flex items-start justify-center pt-4 relative overflow-hidden">
                {/* Floating celebration cells */}
                {floatingCells.map((cell, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50, x: (i - 2) * 100 }}
                        animate={{
                            opacity: 0.4,
                            y: [50, -10, 50],
                            x: (i - 2) * 100 + Math.sin(i) * 20,
                            rotate: [0, 360]
                        }}
                        transition={{
                            delay: cell.delay,
                            duration: 4,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut'
                        }}
                        className="absolute top-20 pointer-events-none"
                        style={{ left: `${20 + i * 15}%` }}
                    >
                        <cell.Component size={40} mood="excited" color={cell.color} />
                    </motion.div>
                ))}

                <div className="text-center w-full max-w-3xl relative z-10 bg-white rounded-3xl border-4 border-black p-6" style={{ boxShadow: '8px 8px 0 #1C1C1E' }}>
                    {/* Trophy and Stars row */}
                    <div className="flex items-center justify-center gap-6 mb-4">
                        <motion.div
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                            className="w-24 h-24 rounded-2xl bg-yellow-400 border-4 border-black flex items-center justify-center"
                            style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                        >
                            <motion.div
                                animate={{ rotate: [0, -10, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <Trophy className="w-12 h-12 text-black" />
                            </motion.div>
                        </motion.div>

                        {/* Stars */}
                        <div className="flex gap-2">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                                >
                                    <Star
                                        className="w-8 h-8 fill-yellow-400 text-black"
                                        strokeWidth={2}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-4"
                    >
                        <h1 className="text-2xl md:text-3xl font-black text-black mb-2 flex items-center justify-center gap-2 uppercase">
                            <Sparkles className="w-6 h-6 text-yellow-500" />
                            {title}
                            <Sparkles className="w-6 h-6 text-yellow-500" />
                        </h1>
                        <p className="text-base text-gray-700 font-medium">{description}</p>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-row justify-center gap-4"
                    >
                        <button
                            onClick={onRestart}
                            className="btn-pop bg-gray-100 text-black text-base px-6 py-2 rounded-xl border-2 border-black flex items-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Play Again
                        </button>
                        <button
                            onClick={onSwitchPath}
                            className="btn-pop bg-blue-500 text-white text-base px-6 py-2 rounded-xl border-2 border-black flex items-center gap-2"
                        >
                            Try Other Path
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </QuestionLayout>
    );
}

VictoryScene.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onRestart: PropTypes.func,
    onSwitchPath: PropTypes.func,
    lives: PropTypes.number,
    actName: PropTypes.string,
    questionNumber: PropTypes.number,
    totalQuestions: PropTypes.number,
};
