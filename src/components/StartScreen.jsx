import { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Ghost, Planet } from 'react-kawaii';
import { X, Volume2, VolumeX } from 'lucide-react';
import useSound from '../hooks/useSound';
import { useMusic } from '../context/MusicContext';

export function StartScreen({ onStart }) {
    const { play } = useSound();
    const { playMood, stop, isPlaying, toggleMute, isMuted } = useMusic();
    const [musicStarted, setMusicStarted] = useState(false);
    const [showNotes, setShowNotes] = useState(false);

    // Handle sound toggle - starts menu music
    const toggleSound = () => {
        if (musicStarted) {
            toggleMute();
        } else {
            playMood('menu');
            setMusicStarted(true);
        }
    };

    const handleStart = () => {
        play('click', 0.4);
        // Music will continue and change based on scene
        setTimeout(onStart, 100);
    };

    const soundEnabled = musicStarted && !isMuted;

    return (
        <div className="fixed inset-0 bg-[#FFEAEC] overflow-hidden flex flex-col items-center justify-center font-sans select-none">

            {/* Sound Toggle Button - Top Right */}
            <motion.button
                onClick={toggleSound}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-4 right-4 z-50 bg-white border-4 border-black rounded-full p-3 shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-y-[2px] transition-all"
                title={soundEnabled ? 'Mute' : 'Enable Sound'}
            >
                {soundEnabled ? (
                    <Volume2 className="w-6 h-6 text-black" />
                ) : (
                    <VolumeX className="w-6 h-6 text-black/50" />
                )}
            </motion.button>

            {/* 1. Subtle Radial Gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FFF0F5] to-[#FFD1DC]" />

            {/* 2. BACKGROUND CHARACTERS */}
            <div className="absolute inset-x-0 bottom-0 flex justify-between items-end opacity-20 z-0 pointer-events-none px-10">
                <Ghost size={300} mood="happy" color="#FF9500" />
                <Ghost size={400} mood="blissful" color="#34C759" />
                <Ghost size={300} mood="excited" color="#007AFF" />
            </div>

            {/* 3. CENTER STAGE */}
            <div className="relative z-20 flex flex-col items-center pt-20">

                {/* HERO GROUP */}
                <div className="relative mb-6">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl opacity-60" />

                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 flex items-end -space-x-8"
                    >
                        <div className="transform -rotate-12 scale-90 opacity-90">
                            <Ghost size={140} mood="ko" color="#FF3B30" />
                        </div>
                        <div className="transform scale-110 z-20">
                            <Ghost size={180} mood="excited" color="#E0B0FF" />
                            <div className="absolute -top-12 right-0 bg-black text-white px-4 py-2 rounded-xl font-black transform rotate-12 border-4 border-white shadow-lg">
                                READY?
                            </div>
                        </div>
                        <div className="transform rotate-12 scale-90 opacity-90">
                            <Planet size={140} mood="blissful" color="#007AFF" />
                        </div>
                    </motion.div>
                </div>

                {/* TITLE LOGO */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative flex flex-col items-center"
                    >
                        <h1 className="text-6xl md:text-8xl font-black text-black leading-none tracking-tighter">
                            IMMUNE
                        </h1>
                        <div className="bg-black text-yellow-400 px-6 py-0 rounded-lg transform -rotate-2 mt-[-10px] z-10 shadow-[6px_6px_0px_rgba(0,0,0,0.2)]">
                            <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
                                SQUAD
                            </h2>
                        </div>
                    </motion.div>
                </div>

                {/* BUTTONS */}
                <div className="flex flex-col gap-4 items-center w-full max-w-sm">
                    {/* START BUTTON */}
                    <motion.button
                        onClick={handleStart}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full relative bg-yellow-400 hover:bg-yellow-500 text-black px-10 py-4 rounded-xl font-black text-2xl md:text-3xl border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none transition-all uppercase tracking-widest"
                    >
                        PLAY GAME
                    </motion.button>

                    {/* NOTES BUTTON */}
                    <motion.button
                        onClick={() => setShowNotes(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full relative bg-white hover:bg-gray-50 text-black px-8 py-3 rounded-xl font-bold text-xl border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none transition-all uppercase tracking-widest"
                    >
                        VISUAL NOTES
                    </motion.button>
                </div>
            </div>

            {/* VISUAL NOTES MODAL */}
            {showNotes && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-3xl p-6 border-4 border-black w-full max-w-6xl h-[90vh] overflow-y-auto relative shadow-[8px_8px_0px_#000]"
                    >
                        <button
                            onClick={() => setShowNotes(false)}
                            className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full border-2 border-black hover:scale-110 transition-transform z-10"
                        >
                            <X size={24} strokeWidth={3} />
                        </button>

                        <h2 className="text-3xl md:text-4xl font-black text-center mb-8 uppercase tracking-tighter border-b-4 border-black inline-block px-8 py-2 w-full">Visual Notes</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-4 bg-blue-50 p-4 rounded-xl border-2 border-black">
                                <h3 className="text-xl font-black text-center bg-blue-500 text-white py-2 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000]">CELL MEDIATED</h3>
                                <div className="bg-white p-2 rounded-lg border-2 border-dashed border-black/20">
                                    <img src="visual notes/cell mediated.png" alt="Cell Mediated Response" className="w-full h-auto rounded" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 bg-green-50 p-4 rounded-xl border-2 border-black">
                                <h3 className="text-xl font-black text-center bg-green-500 text-white py-2 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000]">HUMORAL</h3>
                                <div className="bg-white p-2 rounded-lg border-2 border-dashed border-black/20">
                                    <img src="visual notes/humoral.png" alt="Humoral Response" className="w-full h-auto rounded" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* FOOTER */}
            <div className="absolute bottom-6 font-bold text-black/30 tracking-widest text-sm uppercase">
                Defend The Body • Survive The Invasion
            </div>

            {/* Sound hint */}
            {!musicStarted && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute top-4 right-20 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full border-2 border-black"
                >
                    Click for music →
                </motion.div>
            )}

        </div>
    );
}

StartScreen.propTypes = {
    onStart: PropTypes.func.isRequired,
};

export default StartScreen;
