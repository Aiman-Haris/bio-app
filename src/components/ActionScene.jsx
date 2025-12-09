import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { Timer, CheckCircle2, XCircle } from 'lucide-react';
import { Ghost, Planet } from 'react-kawaii';

// Enemy visual component
function EnemyVisual({ action }) {
    const enemyConfig = {
        engulf: { Component: Ghost, color: '#9B59B6', mood: 'ko', label: 'Bacteria' },
        present: { Component: Planet, color: '#8E44AD', mood: 'sad', label: 'Antigen Fragment' },
        attack: { Component: Ghost, color: '#E74C3C', mood: 'ko', label: 'Infected Cell' },
        activate: { Component: Planet, color: '#3498DB', mood: 'blissful', label: 'T Cell' },
    };

    const config = enemyConfig[action] || enemyConfig.engulf;
    const { Component, color, mood, label } = config;

    return (
        <div className="flex flex-col items-center">
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <Component size={120} mood={mood} color={color} />
            </motion.div>
            <span className="mt-2 text-white/70 text-sm font-medium">{label}</span>
        </div>
    );
}

// Quick Time Event - Press key at the right moment
export function ActionScene({ speaker, text, action, onComplete }) {
    const [phase, setPhase] = useState('ready'); // ready, countdown, active, success, fail
    const [countdown, setCountdown] = useState(3);
    const [timeWindow, setTimeWindow] = useState(100);
    const [result, setResult] = useState(null);

    const actionLabels = {
        engulf: { verb: 'Engulf', instruction: 'Press SPACE when the bar is in the green zone' },
        present: { verb: 'Present', instruction: 'Press SPACE when the bar is in the green zone' },
        attack: { verb: 'Attack', instruction: 'Press SPACE when the bar is in the green zone' },
        activate: { verb: 'Activate', instruction: 'Press SPACE when the bar is in the green zone' },
    };

    const currentAction = actionLabels[action] || actionLabels.engulf;

    const startAction = () => {
        setPhase('countdown');
    };

    useEffect(() => {
        if (phase !== 'countdown') return;

        if (countdown <= 0) {
            setPhase('active');
            return;
        }

        const timer = setTimeout(() => {
            setCountdown(prev => prev - 1);
        }, 800);

        return () => clearTimeout(timer);
    }, [phase, countdown]);

    useEffect(() => {
        if (phase !== 'active') return;

        const interval = setInterval(() => {
            setTimeWindow(prev => {
                if (prev <= 0) {
                    setPhase('fail');
                    return 0;
                }
                return prev - 2;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [phase]);

    const handleKeyPress = useCallback((e) => {
        if (e.code === 'Space' && phase === 'active') {
            e.preventDefault();

            if (timeWindow >= 30 && timeWindow <= 70) {
                setPhase('success');
                setResult('perfect');
                setTimeout(() => onComplete && onComplete(), 1500);
            } else if (timeWindow >= 15 && timeWindow <= 85) {
                setPhase('success');
                setResult('good');
                setTimeout(() => onComplete && onComplete(), 1500);
            } else {
                setPhase('fail');
            }
        }
    }, [phase, timeWindow, onComplete]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    const handleRetry = () => {
        setPhase('ready');
        setCountdown(3);
        setTimeWindow(100);
        setResult(null);
    };

    return (
        <div className="w-full max-w-3xl mx-auto px-4">
            {/* Context card */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border-4 border-black p-6 mb-8"
                style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
            >
                {speaker && (
                    <span className="inline-block px-3 py-1 text-sm font-bold bg-teal text-white rounded-lg mb-3">
                        {speaker}
                    </span>
                )}
                <p className="text-xl text-gray-800">{text}</p>
            </motion.div>

            {/* Action area */}
            <div className="text-center">
                <AnimatePresence mode="wait">
                    {/* Ready state */}
                    {phase === 'ready' && (
                        <motion.div
                            key="ready"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            {/* Enemy visual */}
                            <div className="mb-6">
                                <EnemyVisual action={action} />
                            </div>

                            <div className="mb-6">
                                <h2 className="text-3xl font-bold text-white mb-2">
                                    Quick Action: {currentAction.verb}
                                </h2>
                                <p className="text-white/70">{currentAction.instruction}</p>
                            </div>
                            <button
                                onClick={startAction}
                                className="btn-pop bg-green text-white text-xl px-12 py-4"
                            >
                                Ready
                            </button>
                        </motion.div>
                    )}

                    {/* Countdown */}
                    {phase === 'countdown' && (
                        <motion.div
                            key="countdown"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="py-8"
                        >
                            <div className="mb-4">
                                <EnemyVisual action={action} />
                            </div>
                            <motion.div
                                key={countdown}
                                initial={{ scale: 2, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                className="text-8xl font-bold text-white"
                            >
                                {countdown || 'GO!'}
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Active - Timing bar */}
                    {phase === 'active' && (
                        <motion.div
                            key="active"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {/* Enemy pulsing */}
                            <motion.div
                                className="mb-6"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            >
                                <EnemyVisual action={action} />
                            </motion.div>

                            <div className="mb-6">
                                <Timer className="w-10 h-10 mx-auto text-yellow mb-2 animate-pulse" />
                                <p className="text-2xl font-bold text-white">Press SPACE now!</p>
                            </div>

                            {/* Timing bar */}
                            <div className="relative h-16 bg-gray-800 rounded-2xl border-4 border-black overflow-hidden mb-6">
                                <div
                                    className="absolute top-0 bottom-0 bg-green/30"
                                    style={{ left: '30%', right: '30%' }}
                                />
                                <div
                                    className="absolute top-0 bottom-0 w-1 bg-green"
                                    style={{ left: '30%' }}
                                />
                                <div
                                    className="absolute top-0 bottom-0 w-1 bg-green"
                                    style={{ right: '30%' }}
                                />
                                <motion.div
                                    className="absolute top-2 bottom-2 w-3 bg-white rounded-full"
                                    style={{ left: `${timeWindow}%` }}
                                />
                            </div>

                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 rounded-xl border-2 border-white/20">
                                <span className="px-3 py-1 bg-white text-black font-mono font-bold rounded">
                                    SPACE
                                </span>
                            </div>
                        </motion.div>
                    )}

                    {/* Success */}
                    {phase === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="py-8"
                        >
                            {/* Captured enemy */}
                            <motion.div
                                animate={{ scale: [1, 0.5, 0], opacity: [1, 0.5, 0] }}
                                transition={{ duration: 1 }}
                            >
                                <EnemyVisual action={action} />
                            </motion.div>

                            <CheckCircle2 className="w-20 h-20 mx-auto text-green mb-4" />
                            <h2 className="text-4xl font-bold text-green mb-2">
                                {result === 'perfect' ? 'Perfect!' : 'Good!'}
                            </h2>
                            <p className="text-white/70">
                                {currentAction.verb} successful
                            </p>
                        </motion.div>
                    )}

                    {/* Fail */}
                    {phase === 'fail' && (
                        <motion.div
                            key="fail"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            {/* Enemy still there */}
                            <div className="mb-4">
                                <EnemyVisual action={action} />
                            </div>

                            <XCircle className="w-20 h-20 mx-auto text-red mb-4" />
                            <h2 className="text-4xl font-bold text-red mb-4">
                                Missed!
                            </h2>
                            <button
                                onClick={handleRetry}
                                className="btn-pop bg-white text-black"
                            >
                                Try Again
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

ActionScene.propTypes = {
    speaker: PropTypes.string,
    text: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    onComplete: PropTypes.func,
};
