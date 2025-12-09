import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { Crosshair, RotateCcw } from 'lucide-react';
import { Ghost } from 'react-kawaii';

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
export function AttackFinale({ onComplete }) {
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
                            <Crosshair className="w-16 h-16 mx-auto text-red mb-4" />
                            <h1 className="text-4xl font-bold text-white mb-2">Final Attack</h1>
                            <p className="text-white/70 text-lg">
                                Click when the targeting circle enters the green zone
                            </p>
                        </div>

                        {/* Target preview with enemy */}
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

                        <button onClick={startAttack} className="btn-pop bg-red text-white text-xl px-12 py-4">
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
                        className="cursor-crosshair"
                    >
                        <p className="text-2xl font-bold text-white mb-6 animate-pulse">
                            CLICK TO DESTROY!
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
                                    <InfectedCellVisual size={50} />
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
                        {/* Explosion effect */}
                        <motion.div
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 0, 0], rotate: [0, 180, 360] }}
                            transition={{ duration: 0.8 }}
                            className="mb-4"
                        >
                            <InfectedCellVisual size={80} />
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.5, 1] }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <h1 className="text-6xl font-black text-green mb-4">
                                {isPerfect ? 'PERFECT!' : 'DESTROYED!'}
                            </h1>
                            <p className="text-2xl text-white">
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
                    >
                        {/* Enemy still alive */}
                        <motion.div
                            animate={{ x: [-10, 10, -10] }}
                            transition={{ duration: 0.3, repeat: 3 }}
                            className="mb-4"
                        >
                            <InfectedCellVisual size={80} />
                        </motion.div>

                        <h1 className="text-4xl font-bold text-red mb-4">
                            {circleSize > greenZoneMax ? 'Too Early!' : 'Too Late!'}
                        </h1>
                        <p className="text-white/70 mb-8">
                            Wait for the circle to enter the green zone
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

AttackFinale.propTypes = {
    onComplete: PropTypes.func,
};
