import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import Button from './Button';

export function AttackGame({ onComplete }) {
    const [phase, setPhase] = useState('intro'); // intro, perforin, granzyme, lysis, victory
    const [poresCreated, setPoresCreated] = useState(0);
    const [granzymesLaunched, setGranzymesLaunched] = useState(0);
    const targetPores = 3;
    const targetGranzymes = 3;

    const handlePoreClick = (e) => {
        if (phase !== 'perforin' || poresCreated >= targetPores) return;
        setPoresCreated(prev => prev + 1);
    };

    const handleGranzymeClick = () => {
        if (phase !== 'granzyme' || granzymesLaunched >= targetGranzymes) return;
        setGranzymesLaunched(prev => prev + 1);
    };

    useEffect(() => {
        if (poresCreated >= targetPores && phase === 'perforin') {
            setTimeout(() => setPhase('granzyme'), 1000);
        }
    }, [poresCreated, phase]);

    useEffect(() => {
        if (granzymesLaunched >= targetGranzymes && phase === 'granzyme') {
            setTimeout(() => setPhase('lysis'), 1000);
        }
    }, [granzymesLaunched, phase]);

    useEffect(() => {
        if (phase === 'lysis') {
            setTimeout(() => {
                setPhase('victory');
                if (onComplete) onComplete();
            }, 2000);
        }
    }, [phase, onComplete]);

    return (
        <div className="card-pop bg-red p-8 text-white min-h-[500px] relative overflow-hidden">
            {/* Header */}
            <div className="mb-6 relative z-10">
                <span className="badge-pop bg-black text-white mb-4 inline-block">
                    ⚔️ Attack Mode
                </span>
                <h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                    Cytotoxic T Cell Attack!
                </h3>
            </div>

            {/* Game Area */}
            <div className="relative bg-white/10 rounded-xl p-8 min-h-[300px] flex items-center justify-center">

                {/* Intro Phase */}
                {phase === 'intro' && (
                    <div className="text-center">
                        <div className="text-8xl mb-6">🦠</div>
                        <p className="text-xl mb-6">An infected cell has been detected!</p>
                        <Button color="yellow" onClick={() => setPhase('perforin')}>
                            Launch Attack! 🚀
                        </Button>
                    </div>
                )}

                {/* Perforin Phase */}
                {phase === 'perforin' && (
                    <div className="text-center w-full">
                        <p className="text-lg mb-4">Release Perforin to create pores! Click the cell membrane.</p>
                        <p className="badge-pop bg-yellow text-black mb-4">
                            Pores: {poresCreated}/{targetPores}
                        </p>

                        {/* Cell to click */}
                        <motion.div
                            onClick={handlePoreClick}
                            className="w-48 h-48 mx-auto rounded-full bg-pink border-4 border-white cursor-crosshair relative"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center text-6xl">
                                🦠
                            </div>
                            {/* Pores */}
                            {[...Array(poresCreated)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute w-6 h-6 bg-black rounded-full border-2 border-yellow"
                                    style={{
                                        top: `${20 + i * 25}%`,
                                        left: `${70 + (i % 2) * 15}%`,
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>
                )}

                {/* Granzyme Phase */}
                {phase === 'granzyme' && (
                    <div className="text-center w-full">
                        <p className="text-lg mb-4">Fire Granzymes through the pores!</p>
                        <p className="badge-pop bg-green text-white mb-4">
                            Granzymes: {granzymesLaunched}/{targetGranzymes}
                        </p>

                        <div className="flex justify-center gap-8 items-center">
                            {/* Granzyme launcher */}
                            <motion.button
                                onClick={handleGranzymeClick}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9, rotate: -10 }}
                                className="w-24 h-24 bg-yellow border-bold rounded-full flex items-center justify-center text-4xl shadow-pop cursor-pointer"
                            >
                                💉
                            </motion.button>

                            {/* Arrow */}
                            <motion.div
                                animate={{ x: [0, 20, 0] }}
                                transition={{ repeat: Infinity, duration: 0.5 }}
                                className="text-4xl"
                            >
                                →
                            </motion.div>

                            {/* Target cell with pores */}
                            <div className="w-32 h-32 rounded-full bg-pink border-4 border-white relative">
                                <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-50">
                                    🦠
                                </div>
                                {[...Array(targetPores)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute w-4 h-4 bg-black rounded-full border border-yellow"
                                        style={{
                                            top: `${20 + i * 25}%`,
                                            right: '10%',
                                        }}
                                    />
                                ))}
                                {/* Granzymes inside */}
                                {[...Array(granzymesLaunched)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        className="absolute text-2xl"
                                        style={{
                                            top: `${30 + i * 20}%`,
                                            left: '40%',
                                        }}
                                    >
                                        💀
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Lysis Phase */}
                {phase === 'lysis' && (
                    <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.5, 0], rotate: [0, 180, 360] }}
                        transition={{ duration: 1.5 }}
                        className="text-center"
                    >
                        <div className="text-9xl">💥</div>
                        <p className="text-2xl font-bold mt-4">CELL LYSIS!</p>
                    </motion.div>
                )}

                {/* Victory Phase */}
                <AnimatePresence>
                    {phase === 'victory' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 bg-green flex flex-col items-center justify-center rounded-xl"
                        >
                            <div className="text-8xl mb-4">🏆</div>
                            <h2 className="text-3xl font-bold text-white mb-2" style={{ textShadow: '2px 2px 0 #000' }}>
                                Infected Cell Destroyed!
                            </h2>
                            <p className="text-white text-lg">
                                Perforin + Granzymes = Apoptosis
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

AttackGame.propTypes = {
    onComplete: PropTypes.func,
};
