import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { ArrowRight, Play } from 'lucide-react';

export default function GifAnimationScene({ gifSrc, text, onNext }) {
    const [canContinue, setCanContinue] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        // Allow continue after animation plays for a bit
        const timer = setTimeout(() => setCanContinue(true), 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 bg-[#FFEAEC] overflow-hidden font-sans text-gray-900 selection:bg-yellow-300 flex flex-col items-center justify-center p-4">

            {/* Background Pattern - Subtle dots */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#FF69B4 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
            </div>

            {/* Floating Blobs (optional decoration) */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-10 right-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

            {/* Main Content Card */}
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="z-10 max-w-4xl w-full bg-white rounded-3xl border-4 border-black overflow-hidden flex flex-col"
                style={{ boxShadow: '12px 12px 0 rgba(0,0,0,1)' }}
            >
                {/* Header */}
                <div className="bg-yellow-400 text-black p-4 flex justify-between items-center border-b-4 border-black">
                    <h2 className="text-xl md:text-2xl font-black flex items-center gap-3 uppercase tracking-wider">
                        <Play className="w-6 h-6 text-black" fill="currentColor" />
                        <span>Visual Note</span>
                    </h2>
                </div>

                {/* Animation Stage */}
                <div className="relative w-full bg-gray-100 flex items-center justify-center overflow-hidden border-b-4 border-black"
                    style={{ minHeight: '300px', maxHeight: '400px' }}
                >
                    {!imageLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
                            />
                        </div>
                    )}
                    <img
                        src={gifSrc}
                        alt="Animation"
                        className="max-w-full max-h-[400px] object-contain"
                        onLoad={() => setImageLoaded(true)}
                    />
                </div>

                {/* Caption Text */}
                <div className="p-6 md:p-8 bg-white text-center">
                    <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-bold">
                        {text}
                    </p>

                    {/* Continue Button */}
                    <div className="mt-6 h-14">
                        <AnimatePresence>
                            {canContinue && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <button
                                        onClick={onNext}
                                        className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-3 rounded-2xl text-lg md:text-xl border-4 border-black font-black flex items-center gap-3 mx-auto transform transition-transform active:scale-95 active:translate-y-1 active:shadow-none"
                                        style={{ boxShadow: '6px 6px 0 #000' }}
                                    >
                                        CONTINUE
                                        <ArrowRight className="w-6 h-6" strokeWidth={3} />
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

GifAnimationScene.propTypes = {
    gifSrc: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onNext: PropTypes.func.isRequired,
};
