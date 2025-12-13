import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { Target, RotateCcw } from 'lucide-react';
import { Planet } from 'react-kawaii';
import QuestionLayout from './QuestionLayout';

// Pathogen/Virus Visual - spiky and angry
function PathogenVisual({ size = 100 }) {
    return (
        <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
            <Planet size={size} mood="ko" color="#9B59B6" />
        </motion.div>
    );
}

// Antibody Y shape
function AntibodyVisual() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-blue font-bold text-4xl"
        >
            Y
        </motion.div>
    );
}

// Shrinking Circle Finale for Humoral Path
export function AntibodyFinale({ onComplete, lives, actName, questionNumber, totalQuestions }) {
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
        if (circleSize > greenZoneMax) return '#007AFF';
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
            topic="bcell"
            character="bCell"
            reaction={phase === 'success' ? 'happy' : phase === 'fail' ? 'sad' : 'neutral'}
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
                            className="bg-gray-800 p-6 rounded-3xl border-4 border-black text-center max-w-lg"
                            style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                        >
                            <div className="mb-4">
                                <Target className="w-12 h-12 mx-auto text-blue-400 mb-3" />
                                <h1 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">Neutralize Pathogen</h1>
                                <p className="text-gray-300 text-base font-medium">
                                    Click when the antibody lock enters the green zone
                                </p>
                            </div>

                            {/* Target preview with pathogen */}
                            <div className="relative w-40 h-40 mx-auto mb-4 bg-gray-900 rounded-full border-4 border-gray-700">
                                {/* Green zone ring */}
                                <div
                                    className="absolute rounded-full border-4 border-green-500"
                                    style={{
                                        width: greenZoneMax * 0.7,
                                        height: greenZoneMax * 0.7,
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                />
                                {/* Pathogen in center */}
                                <div
                                    className="absolute"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                >
                                    <PathogenVisual size={40} />
                                </div>
                            </div>

                            <button onClick={startAttack} className="btn-pop bg-blue-500 text-white text-lg px-10 py-3 rounded-xl border-2 border-black">
                                Lock On Target
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
                                CLICK TO NEUTRALIZE!
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

                                {/* Pathogen in center */}
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
                                        <PathogenVisual size={50} />
                                    </motion.div>
                                </div>

                                {/* Shrinking circle with Y antibodies */}
                                <motion.div
                                    className="absolute rounded-full border-4 flex items-center justify-center"
                                    style={{
                                        width: circleSize,
                                        height: circleSize,
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        borderColor: getCircleColor(),
                                        boxShadow: `0 0 30px ${getCircleColor()}60`,
                                    }}
                                >
                                    {/* Y antibodies around the circle */}
                                    {[0, 90, 180, 270].map(angle => (
                                        <span
                                            key={angle}
                                            className="absolute text-blue font-bold text-xl"
                                            style={{
                                                transform: `rotate(${angle}deg) translateY(-${circleSize / 2 - 10}px)`,
                                            }}
                                        >
                                            Y
                                        </span>
                                    ))}
                                </motion.div>
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
                            {/* Antibodies covering pathogen */}
                            <div className="relative mb-8 w-64 h-64 mx-auto flex items-center justify-center">
                                <motion.div
                                    initial={{ opacity: 1 }}
                                    animate={{ opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 1 }}
                                >
                                    <PathogenVisual size={100} />
                                </motion.div>

                                {/* Y antibodies attaching */}
                                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                                    <motion.span
                                        key={angle}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="absolute text-blue font-bold text-4xl"
                                        style={{
                                            top: '50%',
                                            left: '50%',
                                            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-60px)`,
                                        }}
                                    >
                                        Y
                                    </motion.span>
                                ))}
                            </div>

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: [0, 1.5, 1] }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                            >
                                <h1 className="text-7xl font-black text-green-400 mb-4">
                                    {isPerfect ? 'PERFECT!' : 'NEUTRALIZED!'}
                                </h1>
                                <p className="text-2xl text-gray-200 font-bold">
                                    Pathogen neutralized by antibodies
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
                            {/* Pathogen still alive */}
                            <motion.div
                                animate={{ x: [-10, 10, -10] }}
                                transition={{ duration: 0.3, repeat: 3 }}
                                className="mb-8"
                            >
                                <PathogenVisual size={100} />
                            </motion.div>

                            <h1 className="text-5xl font-black text-red-400 mb-6">
                                {circleSize > greenZoneMax ? 'Too Early!' : 'Too Late!'}
                            </h1>
                            <p className="text-gray-200 text-xl font-bold mb-8">
                                Wait for the antibody lock to reach the green zone
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

AntibodyFinale.propTypes = {
    onComplete: PropTypes.func,
    lives: PropTypes.number,
    actName: PropTypes.string,
    questionNumber: PropTypes.number,
    totalQuestions: PropTypes.number,
};
