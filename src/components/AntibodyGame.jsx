import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import Button from './Button';

export function AntibodyGame({ onComplete }) {
    const [phase, setPhase] = useState('intro'); // intro, neutralize, opsonize, complement, victory
    const [neutralized, setNeutralized] = useState(0);
    const [tagged, setTagged] = useState(0);
    const [complementActivated, setComplementActivated] = useState(false);

    const pathogens = [
        { id: 'p1', x: '20%', y: '30%' },
        { id: 'p2', x: '60%', y: '20%' },
        { id: 'p3', x: '40%', y: '60%' },
    ];

    const handleNeutralize = (id) => {
        if (phase === 'neutralize' && neutralized < 3) {
            setNeutralized(prev => prev + 1);
            if (neutralized + 1 >= 3) {
                setTimeout(() => setPhase('opsonize'), 1000);
            }
        }
    };

    const handleTag = () => {
        if (phase === 'opsonize' && tagged < 3) {
            setTagged(prev => prev + 1);
            if (tagged + 1 >= 3) {
                setTimeout(() => setPhase('complement'), 1000);
            }
        }
    };

    const handleComplement = () => {
        if (phase === 'complement') {
            setComplementActivated(true);
            setTimeout(() => {
                setPhase('victory');
                if (onComplete) onComplete();
            }, 2000);
        }
    };

    return (
        <div className="card-pop bg-blue p-8 text-white min-h-[500px] relative overflow-hidden">
            <div className="mb-6 relative z-10">
                <span className="badge-pop bg-yellow text-black mb-4 inline-block">
                    💉 Antibody Action
                </span>
                <h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                    Humoral Response Finale!
                </h3>
            </div>

            <div className="relative bg-white/10 rounded-xl p-8 min-h-[350px]">

                {/* Intro */}
                {phase === 'intro' && (
                    <div className="text-center">
                        <div className="text-8xl mb-6">🦠🦠🦠</div>
                        <p className="text-xl mb-4">Extracellular pathogens detected!</p>
                        <p className="text-lg mb-6 opacity-80">Use antibodies to neutralize, tag, and destroy them.</p>
                        <Button color="yellow" onClick={() => setPhase('neutralize')}>
                            Deploy Antibodies! 🚀
                        </Button>
                    </div>
                )}

                {/* Neutralization Phase */}
                {phase === 'neutralize' && (
                    <div className="text-center">
                        <p className="text-lg mb-2">NEUTRALIZATION: Click pathogens to block them!</p>
                        <p className="badge-pop bg-teal text-black mb-4">
                            Neutralized: {neutralized}/3
                        </p>

                        <div className="relative h-48 bg-white/5 rounded-xl">
                            {pathogens.map((p, i) => (
                                <motion.button
                                    key={p.id}
                                    onClick={() => handleNeutralize(p.id)}
                                    disabled={i < neutralized}
                                    className={`absolute text-5xl transition-all ${i < neutralized ? 'opacity-30 cursor-default' : 'cursor-pointer'}`}
                                    style={{ left: p.x, top: p.y }}
                                    whileHover={i >= neutralized ? { scale: 1.2 } : {}}
                                    whileTap={i >= neutralized ? { scale: 0.9 } : {}}
                                >
                                    {i < neutralized ? '🔒' : '🦠'}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Opsonization Phase */}
                {phase === 'opsonize' && (
                    <div className="text-center">
                        <p className="text-lg mb-2">OPSONIZATION: Tag pathogens for macrophages!</p>
                        <p className="badge-pop bg-orange text-black mb-4">
                            Tagged: {tagged}/3
                        </p>

                        <div className="flex justify-center gap-8 items-center">
                            <motion.button
                                onClick={handleTag}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-20 h-20 bg-yellow border-bold rounded-full flex items-center justify-center text-3xl shadow-pop cursor-pointer"
                            >
                                🏷️
                            </motion.button>

                            <span className="text-3xl">→</span>

                            <div className="flex gap-2">
                                {[0, 1, 2].map(i => (
                                    <div key={i} className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl border-2 border-dashed border-white/50">
                                        {i < tagged ? '🏷️🦠' : '🦠'}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Complement Phase */}
                {phase === 'complement' && !complementActivated && (
                    <div className="text-center">
                        <p className="text-lg mb-2">COMPLEMENT SYSTEM: Activate the cascade!</p>
                        <p className="text-white/80 mb-6">Click to trigger membrane attack complex (MAC)</p>

                        <motion.button
                            onClick={handleComplement}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-32 h-32 bg-red border-bold rounded-full flex items-center justify-center text-5xl shadow-pop cursor-pointer mx-auto"
                            animate={{
                                boxShadow: ['0 0 0 0 rgba(255,255,255,0.4)', '0 0 0 20px rgba(255,255,255,0)', '0 0 0 0 rgba(255,255,255,0.4)']
                            }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            💥
                        </motion.button>
                    </div>
                )}

                {/* Complement Activation Animation */}
                {phase === 'complement' && complementActivated && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <motion.div
                            animate={{ scale: [1, 2, 1], rotate: [0, 360] }}
                            transition={{ duration: 1.5 }}
                            className="text-9xl"
                        >
                            💥
                        </motion.div>
                        <p className="text-2xl font-bold mt-4">MAC ACTIVATED!</p>
                    </motion.div>
                )}

                {/* Victory */}
                <AnimatePresence>
                    {phase === 'victory' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 bg-green flex flex-col items-center justify-center rounded-xl"
                        >
                            <div className="text-8xl mb-4">🏆</div>
                            <h2 className="text-3xl font-bold text-white mb-2" style={{ textShadow: '2px 2px 0 #000' }}>
                                Pathogens Eliminated!
                            </h2>
                            <p className="text-white text-lg text-center max-w-sm">
                                Neutralization + Opsonization + Complement = Victory!
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

AntibodyGame.propTypes = {
    onComplete: PropTypes.func,
};
