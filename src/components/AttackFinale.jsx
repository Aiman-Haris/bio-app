import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { Crosshair, RotateCcw } from 'lucide-react';
import { Ghost } from 'react-kawaii';
import QuestionLayout from './QuestionLayout';

// Infected Cell Visual - looks sick/angry
function InfectedCellVisual({ size = 100 }) {
    return (
        <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            <Ghost size={size} mood="ko" color="#E74C3C" />
        </motion.div>
    );
}

// Shrinking Circle Finale - Click when circle is in the green zone
export function AttackFinale({ onComplete, lives, actName, questionNumber, totalQuestions }) {
    const [phase, setPhase] = useState('intro');
    const [circleSize, setCircleSize] = useState(200);
    const [isAnimating, setIsAnimating] = useState(false);

    const greenZoneMin = 70;
    const greenZoneMax = 90;
    const perfectZone = 80;

    const startAttack = () => {
        setPhase('active');
        setCircleSize(200);
        setIsAnimating(true);
    };

    useEffect(() => {
        if (phase !== 'active' || !isAnimating) return;

        const interval = setInterval(() => {
            setCircleSize(prev => {
                if (prev <= 30) {
                    setIsAnimating(false);
                    setPhase('fail');
                    return 30;
                }
                return prev - 1.5;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [phase, isAnimating]);

    const handleClick = () => {
        if (phase !== 'active') return;

        setIsAnimating(false);

        if (circleSize >= greenZoneMin && circleSize <= greenZoneMax) {
            setPhase('success');
            setTimeout(() => onComplete && onComplete(), 2000);
        } else {
            setPhase('fail');
        }
    };

    const handleRetry = () => {
        setPhase('intro');
        setCircleSize(200);
        setIsAnimating(false);
    };

    const getCircleColor = () => {
        if (circleSize > greenZoneMax) return '#FF3B30';
        if (circleSize >= greenZoneMin && circleSize <= greenZoneMax) return '#34C759';
        return '#FF3B30';
    };

    const isPerfect = Math.abs(circleSize - perfectZone) < 8;

    return (
        <QuestionLayout
            actName={actName}
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
            lives={lives}
            topic="tcell"
            character="cytotoxicT"
            reaction={completed ? 'happy' : phase === 'fail' ? 'sad' : 'neutral'}
        >
            <div className="w-full h-full flex flex-col justify-center items-center">
                <AnimatePresence mode="wait">
                    {/* Intro */}
                    {phase === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-gray-800 p-8 rounded-3xl border-4 border-black text-center max-w-2xl"
                            style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                        >
                            <div className="mb-6">
                                <Crosshair className="w-16 h-16 mx-auto text-red-400 mb-4" />
                                <h1 className="text-4xl font-black text-yellow-400 mb-2 uppercase tracking-wide">Final Attack</h1>
                                <p className="text-gray-200 text-xl font-medium">
                                    Click when the targeting circle enters the green zone
                                </p>
                            </div>

                            {/* Target preview with enemy */}
                            <div className="relative w-56 h-56 mx-auto mb-8 bg-gray-900 rounded-full border-4 border-gray-600">
                                {/* Green zone ring */}
                                <div
                                    className="absolute rounded-full border-4 border-green"
                                    style={{
                                        width: greenZoneMax,
                                        height: greenZoneMax,
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                />
                                {/* Infected cell in center */}
                                <div
                                    className="absolute"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                >
                                    <InfectedCellVisual size={60} />
                                </div>
                            </div>

                            <button onClick={startAttack} className="btn-pop bg-red-500 text-white text-2xl px-12 py-4 rounded-xl border-2 border-black">
                                Begin Attack
                            </button>
                        </motion.div>
                    )}

                    {/* Active - Shrinking circle */}
                    {phase === 'active' && (
                        <motion.div
                            key="active"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClick}
                            className="cursor-crosshair w-full h-full flex flex-col items-center justify-center py-20"
                        >
                            <p className="text-3xl font-black text-yellow-400 mb-12 animate-pulse pointer-events-none select-none" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                                CLICK TO DESTROY!
                            </p>

                            <div className="relative w-80 h-80 mx-auto select-none pointer-events-none">
                                {/* Green zone ring */}
                                <div
                                    className="absolute rounded-full border-8 border-green box-shadow-[0_0_20px_#34C759]"
                                    style={{
                                        width: greenZoneMax,
                                        height: greenZoneMax,
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                />

                                {/* Infected cell in center */}
                                <div
                                    className="absolute"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                >
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                    >
                                        <InfectedCellVisual size={60} />
                                    </motion.div>
                                </div>

                                {/* Shrinking circle */}
                                <motion.div
                                    className="absolute rounded-full border-4"
                                    style={{
                                        width: circleSize,
                                        height: circleSize,
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        borderColor: getCircleColor(),
                                        boxShadow: `0 0 30px ${getCircleColor()}60`,
                                    }}
                                />
                            </div>

                            <p className="text-gray-300 mt-12 text-xl font-bold select-none pointer-events-none" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Click anywhere when inside the green zone</p>
                        </motion.div>
                    )}

                    {/* Success */}
                    {phase === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center bg-gray-800 p-12 rounded-3xl border-4 border-green-500"
                            style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                        >
                            {/* Explosion effect */}
                            <motion.div
                                initial={{ scale: 1 }}
                                animate={{ scale: [1, 0, 0], rotate: [0, 180, 360] }}
                                transition={{ duration: 0.8 }}
                                className="mb-8"
                            >
                                <InfectedCellVisual size={100} />
                            </motion.div>

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: [0, 1.5, 1] }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <h1 className="text-7xl font-black text-green-400 mb-4">
                                    {isPerfect ? 'PERFECT!' : 'DESTROYED!'}
                                </h1>
                                <p className="text-2xl text-gray-200 font-bold">
                                    Infected cell eliminated
                                </p>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Fail */}
                    {phase === 'fail' && (
                        <motion.div
                            key="fail"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center bg-gray-800 p-12 rounded-3xl border-4 border-red-500"
                            style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                        >
                            {/* Enemy still alive */}
                            <motion.div
                                animate={{ x: [-10, 10, -10] }}
                                transition={{ duration: 0.3, repeat: 3 }}
                                className="mb-8"
                            >
                                <InfectedCellVisual size={100} />
                            </motion.div>

                            <h1 className="text-5xl font-black text-red-400 mb-6">
                                {circleSize > greenZoneMax ? 'Too Early!' : 'Too Late!'}
                            </h1>
                            <p className="text-gray-200 text-xl font-bold mb-8">
                                Wait for the circle to enter the green zone
                            </p>
                            <button onClick={handleRetry} className="btn-pop bg-white text-black text-xl px-10 py-4">
                                <RotateCcw className="w-6 h-6" />
                                Try Again
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </QuestionLayout>
    );
}

AttackFinale.propTypes = {
    onComplete: PropTypes.func,
    lives: PropTypes.number,
    actName: PropTypes.string,
    questionNumber: PropTypes.number,
    totalQuestions: PropTypes.number,
};
