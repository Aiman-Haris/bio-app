import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { Target, RotateCcw } from 'lucide-react';
import { Planet } from 'react-kawaii';

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
export function AntibodyFinale({ onComplete }) {
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
        <div className="w-full max-w-2xl mx-auto px-4 text-center">
            <AnimatePresence mode="wait">
                {/* Intro */}
                {phase === 'intro' && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="mb-6">
                            <Target className="w-16 h-16 mx-auto text-blue mb-4" />
                            <h1 className="text-4xl font-bold text-white mb-2">Neutralize Pathogen</h1>
                            <p className="text-white/70 text-lg">
                                Click when the antibody lock enters the green zone
                            </p>
                        </div>

                        {/* Target preview with pathogen */}
                        <div className="relative w-56 h-56 mx-auto mb-8">
                            {/* Green zone ring */}
                            <div
                                className="absolute rounded-full border-4 border-green/50"
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
                                <PathogenVisual size={60} />
                            </div>
                        </div>

                        <button onClick={startAttack} className="btn-pop bg-blue text-white text-xl px-12 py-4">
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
                        className="cursor-crosshair"
                    >
                        <p className="text-2xl font-bold text-white mb-6 animate-pulse">
                            CLICK TO NEUTRALIZE!
                        </p>

                        <div className="relative w-72 h-72 mx-auto">
                            {/* Green zone ring */}
                            <div
                                className="absolute rounded-full border-8 border-green"
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

                        <p className="text-white/50 mt-6">Click anywhere when in green zone</p>
                    </motion.div>
                )}

                {/* Success */}
                {phase === 'success' && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        {/* Antibodies covering pathogen */}
                        <div className="relative mb-4">
                            <motion.div
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 1 }}
                            >
                                <PathogenVisual size={80} />
                            </motion.div>

                            {/* Y antibodies attaching */}
                            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                                <motion.span
                                    key={angle}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="absolute text-blue font-bold text-2xl"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-50px)`,
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
                            <h1 className="text-6xl font-black text-green mb-4">
                                {isPerfect ? 'PERFECT!' : 'NEUTRALIZED!'}
                            </h1>
                            <p className="text-2xl text-white">
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
                    >
                        {/* Pathogen still alive */}
                        <motion.div
                            animate={{ x: [-10, 10, -10] }}
                            transition={{ duration: 0.3, repeat: 3 }}
                            className="mb-4"
                        >
                            <PathogenVisual size={80} />
                        </motion.div>

                        <h1 className="text-4xl font-bold text-red mb-4">
                            {circleSize > greenZoneMax ? 'Too Early!' : 'Too Late!'}
                        </h1>
                        <p className="text-white/70 mb-8">
                            Wait for the antibody lock to reach the green zone
                        </p>
                        <button onClick={handleRetry} className="btn-pop bg-white text-black">
                            <RotateCcw className="w-5 h-5" />
                            Try Again
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

AntibodyFinale.propTypes = {
    onComplete: PropTypes.func,
};
