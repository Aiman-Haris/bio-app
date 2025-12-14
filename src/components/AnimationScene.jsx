import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { CellAvatar } from './Characters';

import { ArrowRight, Microscope } from 'lucide-react';

export default function AnimationScene({ animationName, text, onNext }) {
    const [canContinue, setCanContinue] = useState(false);

    useEffect(() => {
        // Force wait for animation to play out a bit before allowing skip
        const timer = setTimeout(() => setCanContinue(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 bg-indigo-50 overflow-hidden font-mono text-black selection:bg-yellow-300 flex flex-col items-center justify-center p-4">

            {/* Pop Art Patterns */}
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#000 3px, transparent 3px)', backgroundSize: '40px 40px' }}>
            </div>

            {/* Main Content Card */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="z-10 max-w-5xl w-full bg-white rounded-3xl border-4 border-black overflow-hidden flex flex-col mt-8"
                style={{ boxShadow: '12px 12px 0 #000' }}
            >
                {/* Header */}
                <div className="bg-black text-white p-6 flex justify-between items-center border-b-4 border-black">
                    <h2 className="text-2xl font-black italic tracking-wider flex items-center gap-3">
                        <Microscope className="w-8 h-8 text-yellow-400" strokeWidth={3} />
                        <span className="text-yellow-400">SCIENTIFIC VISUALIZATION</span>
                    </h2>
                    <div className="text-white text-sm font-bold font-mono uppercase tracking-widest bg-slate-800 px-3 py-1 rounded border-2 border-slate-600">
                        SIMULATION: {animationName.replace(/_/g, ' ')}
                    </div>
                </div>

                {/* Animation Stage */}
                <div className="relative w-full h-[300px] md:h-[400px] bg-blue-50 flex items-center justify-center overflow-hidden border-b-4 border-black">
                    {/* Inner Grid */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                    />
                    <ScientificDiagram name={animationName} />
                </div>

                {/* Explanation Text */}
                <div className="p-8 bg-white text-center">
                    <p className="text-xl md:text-2xl text-black leading-relaxed font-bold">
                        {text}
                    </p>

                    {/* Continue Button */}
                    <div className="mt-8 h-12">
                        <AnimatePresence>
                            {canContinue && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <button
                                        onClick={onNext}
                                        className="bg-yellow-400 hover:bg-yellow-300 text-black px-10 py-3 rounded-2xl text-xl border-4 border-black font-black flex items-center gap-3 mx-auto transform transition-transform active:scale-95 active:translate-y-1 active:shadow-none"
                                        style={{ boxShadow: '6px 6px 0 #000' }}
                                    >
                                        CONTINUE
                                        <ArrowRight className="w-8 h-8" strokeWidth={4} />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// Logic to choose which diagram to render
function ScientificDiagram({ name }) {
    if (name.includes('apc_present') || name.includes('macrophage_display')) return <DiagramAPCPresentation />;
    if (name.includes('binding') || name.includes('th_binding')) return <DiagramBinding />;
    if (name.includes('helper_activate') || name.includes('secrete_il2')) return <DiagramSignaling />;
    if (name.includes('proliferate')) return <DiagramProliferation type={name.includes('cytotoxic') ? 'cytotoxicT' : 'helperT'} />;
    if (name.includes('lysis')) return <DiagramLysis />;

    return <div className="text-slate-400">Loading simulation data...</div>;
}

// --- Specific Diagrams ---

// 1. APC Presentation
function DiagramAPCPresentation() {
    return (
        <div className="relative flex items-center justify-center w-full h-full">
            <div className="relative">
                {/* Macrophage */}
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
                >
                    <CellAvatar type="macrophage" size={200} mood="happy" />
                </motion.div>

                {/* Internal Digesting Animation */}
                <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-400/50 rounded-full blur-sm"
                />

                {/* Antigen Presentation Pop-up */}
                <motion.div
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: -80 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="absolute top-0 right-10"
                >
                    {/* MHC II Molecule */}
                    <div className="w-8 h-12 bg-yellow-400 rounded-t-lg border-2 border-yellow-600 flex items-center justify-center relative shadow-sm">
                        {/* Antigen Fragment */}
                        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px] border-t-red-600 absolute -top-3"></div>
                    </div>
                </motion.div>

                {/* Label */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 }}
                    className="absolute -top-24 -right-32 bg-yellow-100 border border-yellow-400 text-yellow-800 px-3 py-1 rounded text-sm font-bold shadow-sm"
                >
                    MHC Class II + Antigen
                </motion.div>
            </div>
        </div>
    );
}

// 2. Binding (Handshake)
function DiagramBinding() {
    return (
        <div className="flex items-center justify-center gap-4 relative">
            {/* Macrophage */}
            <div className="relative">
                <CellAvatar type="macrophage" size={180} mood="happy" />
                {/* MHC */}
                <div className="absolute top-10 -right-4 w-8 h-12 bg-yellow-400 rounded-t-lg border-2 border-yellow-600 z-10 flex justify-center">
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px] border-t-red-600 absolute -top-3"></div>
                </div>
            </div>

            {/* Helper T Moving In */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: -20, opacity: 1 }}
                transition={{ duration: 1, type: 'spring' }}
                className="relative z-20"
            >
                <CellAvatar type="helperT" size={160} mood="thinking" />

                {/* T Cell Receptor (TCR) */}
                <div className="absolute top-14 -left-2 w-6 h-10 bg-green-600 rounded-b-lg border-2 border-green-800"></div>

                {/* CD4 Label Pop-up */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute top-20 -left-6 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white shadow-lg z-30"
                >
                    CD4
                </motion.div>
            </motion.div>
        </div>
    );
}

// 3. Signaling (Cytokines)
function DiagramSignaling() {
    return (
        <div className="flex items-center justify-center gap-8 relative">
            {/* IL-1 Source: Macrophage */}
            <div className="relative">
                <CellAvatar type="macrophage" size={160} mood="happy" />
                <div className="absolute -bottom-8 text-center text-sm font-bold text-orange-600">APC</div>
            </div>

            {/* Cytokine Flow IL-1 */}
            <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                    <motion.div
                        key={`il1-${i}`}
                        initial={{ x: -40, opacity: 0 }}
                        animate={{ x: 40, opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        className="w-4 h-4 bg-purple-500 rounded-full"
                    />
                ))}
            </div>

            {/* Activated Helper T */}
            <div className="relative">
                <motion.div
                    animate={{ filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    <CellAvatar type="helperT" size={160} mood="excited" />
                </motion.div>
                <div className="absolute -bottom-8 text-center text-sm font-bold text-green-600">Active!</div>

                {/* IL-2 Secretion (Self loop or outward) */}
                {[1, 2, 3].map(i => (
                    <motion.div
                        key={`il2-${i}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0, y: -50 }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 + (i * 0.3) }}
                        className="absolute -top-4 right-1/2 w-5 h-5 bg-blue-400 rounded-full border-2 border-white"
                    />
                ))}
            </div>
        </div>
    );
}

// 4. Proliferation (Mitosis)
function DiagramProliferation({ type }) {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Split 1 -> 2 */}
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: -100 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <CellAvatar type={type} size={140} mood="happy" />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: 80 }}
                    transition={{ delay: 2 }}
                    className="absolute text-center w-full font-bold text-slate-500"
                >
                    Memory Clones
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ x: 0, opacity: 0, scale: 0 }}
                animate={{ x: 100, opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <CellAvatar type={type} size={140} mood="excited" />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: 80 }}
                    transition={{ delay: 2 }}
                    className="absolute text-center w-full font-bold text-blue-600"
                >
                    Effector Clones
                </motion.div>
            </motion.div>
        </div>
    );
}

// 5. Lysis (Attack)
function DiagramLysis() {
    return (
        <div className="flex items-center justify-center gap-12 relative">
            {/* Killer T */}
            <div className="relative">
                <CellAvatar type="cytotoxicT" size={150} mood="excited" />

                {/* Perforin Pellets */}
                <motion.div
                    animate={{ x: [0, 150], opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="absolute top-1/2 right-[-20px] w-3 h-3 bg-red-600 rounded-full shadow-sm"
                />
                <motion.div
                    animate={{ x: [0, 150], opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                    className="absolute top-1/3 right-[-20px] w-3 h-3 bg-red-600 rounded-full shadow-sm"
                />
            </div>

            {/* Infected Cell Dying */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 0.9, 1.2],
                    rotate: [0, 5, -5, 10],
                    filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)']
                }}
                transition={{ duration: 2 }}
                className="relative"
            >
                <CellAvatar type="pathogen" size={150} mood="sick" />

                {/* Explosion Overlay */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 2, opacity: [0, 1, 0] }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="absolute inset-0 bg-red-500 rounded-full flex items-center justify-center text-white font-black text-4xl"
                >
                    LYSIS!
                </motion.div>
            </motion.div>
        </div>
    );
}
