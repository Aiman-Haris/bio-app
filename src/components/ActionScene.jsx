import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { Timer, CheckCircle2, XCircle } from 'lucide-react';
import { Ghost, Planet } from 'react-kawaii';
import QuestionLayout from './QuestionLayout';

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
                <Component size={100} mood={mood} color={color} />
            </motion.div>
            <span className="mt-2 text-black/70 text-sm font-bold bg-white/80 px-3 py-1 rounded-full border-2 border-black">{label}</span>
        </div>
    );
}

// Quick Time Event - Press key at the right moment
export function ActionScene({ speaker, text, action, onComplete, lives, actName, questionNumber, totalQuestions }) {
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

    const topicMap = {
        engulf: 'macrophage',
        present: 'macrophage',
        attack: 'tcell',
        activate: 'tcell'
    };
    const currentTopic = topicMap[action] || 'default';

    // Get reaction based on phase
    const getReaction = () => {
        if (phase === 'success') return 'happy';
        if (phase === 'fail') return 'sad';
        return 'neutral';
    };

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
        <QuestionLayout
            actName={actName}
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
            lives={lives}
            character={speaker}
            reaction={!completed ? 'neutral' : 'happy'}
        >
            <div className="w-full h-full flex flex-col justify-start pt-2">
                {/* Context card */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl border-4 border-black p-5 mb-4 relative"
                    style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                >
                    {speaker && (
                        <span className="inline-block px-3 py-1 text-xs font-bold bg-teal-500 text-white rounded-full border-2 border-black mb-2">
                            {speaker}
                        </span>
                    )}
                    <p className="text-lg text-black font-medium">{text}</p>
                </motion.div>

                {/* Action area */}
                <div className="text-center relative">
                    <AnimatePresence mode="wait">
                        {/* Ready state */}
                        {phase === 'ready' && (
                            <motion.div
                                key="ready"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-gray-800 p-6 rounded-3xl border-4 border-black"
                                style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                            >
                                {/* Enemy visual */}
                                <div className="mb-4">
                                    <EnemyVisual action={action} />
                                </div>

                                <div className="mb-4">
                                    <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-wide">
                                        {currentAction.verb}
                                    </h2>
                                    <p className="text-white font-medium text-base bg-black/40 inline-block px-4 py-2 rounded-xl border-2 border-white/30">
                                        {currentAction.instruction}
                                    </p>
                                </div>
                                <button
                                    onClick={startAction}
                                    className="btn-pop bg-green-500 text-white text-xl px-12 py-4 font-black rounded-2xl border-4 border-black"
                                    style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                                >
                                    Ready!
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
                                className="py-8 bg-gray-800 rounded-3xl border-4 border-black"
                                style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                            >
                                <div className="mb-6">
                                    <EnemyVisual action={action} />
                                </div>
                                <motion.div
                                    key={countdown}
                                    initial={{ scale: 3, opacity: 0 }}
                                    animate={{ scale: 1.2, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    className="text-8xl font-black text-yellow-400"
                                    style={{ textShadow: '4px 4px 0 #1C1C1E' }}
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
                                className="bg-gray-800 p-6 rounded-3xl border-4 border-black"
                                style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                            >
                                {/* Enemy pulsing */}
                                <motion.div
                                    className="mb-4"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 0.4, repeat: Infinity }}
                                >
                                    <EnemyVisual action={action} />
                                </motion.div>

                                <div className="mb-4">
                                    <Timer className="w-10 h-10 mx-auto text-yellow-400 mb-2 animate-spin" />
                                    <p className="text-2xl font-black text-yellow-400">PRESS SPACE!</p>
                                </div>

                                {/* Timing bar */}
                                <div className="relative h-16 bg-gray-900 rounded-2xl border-4 border-black overflow-hidden mb-6">
                                    {/* Green zone indicator */}
                                    <div
                                        className="absolute top-0 bottom-0 bg-green-500/50 border-x-4 border-green-400"
                                        style={{ left: '30%', right: '30%' }}
                                    />
                                    {/* Moving cursor */}
                                    <motion.div
                                        className="absolute top-1 bottom-1 w-3 bg-white rounded-lg"
                                        style={{ left: `${timeWindow}%`, boxShadow: '0 0 15px white, 0 0 30px white' }}
                                    />
                                </div>

                                <div className="inline-flex items-center gap-3 px-6 py-3 bg-yellow-400 rounded-xl border-4 border-black" style={{ boxShadow: '4px 4px 0 #1C1C1E' }}>
                                    <span className="font-black text-xl text-black">
                                        PRESS SPACE
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
                                className="py-6 bg-green-500 rounded-3xl border-4 border-black p-6"
                                style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                            >
                                {/* Captured enemy */}
                                <motion.div
                                    animate={{ scale: [1, 0], opacity: [1, 0], rotate: 360 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <EnemyVisual action={action} />
                                </motion.div>

                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <CheckCircle2 className="w-20 h-20 mx-auto text-white mb-3" />
                                    <h2 className="text-4xl font-black text-white mb-2">
                                        {result === 'perfect' ? 'PERFECT!' : 'GOOD!'}
                                    </h2>
                                    <p className="text-white/90 text-lg font-bold">
                                        {currentAction.verb} Successful
                                    </p>
                                </motion.div>
                            </motion.div>
                        )}

                        {/* Fail */}
                        {phase === 'fail' && (
                            <motion.div
                                key="fail"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-6 bg-red-500 rounded-3xl border-4 border-black p-6"
                                style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                            >
                                {/* Enemy still there */}
                                <div className="mb-4">
                                    <EnemyVisual action={action} />
                                </div>

                                <XCircle className="w-20 h-20 mx-auto text-white mb-3" />
                                <h2 className="text-4xl font-black text-white mb-4">
                                    MISSED!
                                </h2>
                                <button
                                    onClick={handleRetry}
                                    className="btn-pop bg-white text-black text-lg px-8 py-3 rounded-xl border-2 border-black"
                                >
                                    Try Again
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </QuestionLayout>
    );
}

ActionScene.propTypes = {
    speaker: PropTypes.string,
    text: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    onComplete: PropTypes.func,
    lives: PropTypes.number,
    actName: PropTypes.string,
    questionNumber: PropTypes.number,
    totalQuestions: PropTypes.number,
};
