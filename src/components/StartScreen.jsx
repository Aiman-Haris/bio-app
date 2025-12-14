import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Ghost, Planet } from 'react-kawaii';

export function StartScreen({ onStart }) {
    return (
        <div className="fixed inset-0 bg-[#FFEAEC] overflow-hidden flex flex-col items-center justify-center font-sans select-none">

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

                {/* HERO GROUP - Lowered */}
                <div className="relative mb-6">
                    {/* Glow effect */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl opacity-60" />

                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 flex items-end -space-x-8"
                    >
                        {/* Sidekick Left */}
                        <div className="transform -rotate-12 scale-90 opacity-90">
                            <Ghost size={140} mood="ko" color="#FF3B30" />
                        </div>

                        {/* Captain */}
                        <div className="transform scale-110 z-20">
                            <Ghost size={180} mood="excited" color="#E0B0FF" />
                            <div className="absolute -top-12 right-0 bg-black text-white px-4 py-2 rounded-xl font-black transform rotate-12 border-4 border-white shadow-lg">
                                READY?
                            </div>
                        </div>

                        {/* Sidekick Right */}
                        <div className="transform rotate-12 scale-90 opacity-90">
                            <Planet size={140} mood="blissful" color="#007AFF" />
                        </div>
                    </motion.div>
                </div>

                {/* TITLE LOGO - Standard Font */}
                <div className="text-center mb-8"> {/* Reduced margin bottom */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative flex flex-col items-center"
                    >
                        {/* IMMUNE */}
                        <h1 className="text-6xl md:text-8xl font-black text-black leading-none tracking-tighter">
                            IMMUNE
                        </h1>

                        {/* SQUAD */}
                        <div className="bg-black text-yellow-400 px-6 py-0 rounded-lg transform -rotate-2 mt-[-10px] z-10 shadow-[6px_6px_0px_rgba(0,0,0,0.2)]">
                            <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
                                SQUAD
                            </h2>
                        </div>
                    </motion.div>
                </div>

                {/* START BUTTON - Moved UP */}
                <motion.button
                    onClick={onStart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative bg-yellow-400 hover:bg-yellow-500 text-black px-10 py-4 rounded-xl font-black text-2xl md:text-3xl border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none transition-all uppercase tracking-widest"
                >
                    PLAY GAME
                </motion.button>

            </div>

            {/* FOOTER */}
            <div className="absolute bottom-6 font-bold text-black/30 tracking-widest text-sm uppercase">
                Defend The Body • Survive The Invasion
            </div>

        </div>
    );
}

StartScreen.propTypes = {
    onStart: PropTypes.func.isRequired,
};

export default StartScreen;
