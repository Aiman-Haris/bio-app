import { isMobile } from 'react-device-detect';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import NiceAvatar from 'react-nice-avatar';
import {
    characterNames,
    characterColors,
    isHumanCharacter,
    isNarrator,
    detectMoodFromText,
    humanConfigs,
    CellAvatar
} from './Characters';
import { ChevronRight } from 'lucide-react';
// Big full-height portrait for humans
function HumanPortrait({ type, mood = 'happy', isActive = false }) {
    const configs = humanConfigs[type];
    if (!configs) return null;

    const config = configs[mood] || configs.happy;

    return (
        <motion.div
            animate={{ opacity: isActive ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
            className="h-full flex items-end justify-center"
            style={{
                width: 280,
                backgroundColor: config.bgColor || '#f0f0f0',
            }}
        >
            <NiceAvatar
                style={{ width: 350, height: 350 }}
                shape="square"
                {...config}
            />
        </motion.div>
    );
}

// Human dialogue with BIG side portraits - also used for narration
function HumanDialogue({ speaker, text, onContinue, mood, isNarration = false, image, hideDoctor = false }) {
    const name = isNarration ? 'Narrator' : characterNames[speaker];
    const accentColor = isNarration ? '#FFCC00' : characterColors[speaker];

    // Determine which avatar is active
    const ivanActive = speaker === 'ivan';
    const doctorActive = speaker === 'doctor';

    // DESKTOP LAYOUT (Original Fixed Split)
    if (!isMobile) {
        return (
            <div className="fixed inset-0 flex z-50">
                {/* Ivan on left - full height */}
                <div className="h-full border-r-4 border-black overflow-hidden relative hidden md:block">
                    <HumanPortrait
                        type="ivan"
                        mood={ivanActive ? mood : 'happy'}
                        isActive={ivanActive}
                    />
                </div>

                {/* Dialogue/Narration in center */}
                <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-b from-teal to-green">
                    <div className="w-full max-w-xl flex flex-col items-center">

                        {/* Optional Image Display */}
                        {image && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="mb-4 rounded-xl border-4 border-black overflow-hidden shadow-card w-64 h-48 bg-white"
                            >
                                {image === 'raw_meat_zoom' ? (
                                    <img
                                        src="/media/images/raw_meat_zoom.png"
                                        alt="Raw Meat Zoom"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-4xl">
                                        {image}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Text box */}
                        <div
                            className="relative bg-white rounded-2xl border-4 border-black p-8 w-full"
                            style={{ boxShadow: '8px 8px 0 #1C1C1E' }}
                        >
                            {/* Name tag */}
                            <motion.div
                                key={name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute -top-6 left-6 px-6 py-2 rounded-full font-bold text-lg border-4 border-black"
                                style={{
                                    backgroundColor: accentColor,
                                    color: isNarration ? '#1C1C1E' : 'white',
                                    boxShadow: '4px 4px 0 #1C1C1E'
                                }}
                            >
                                {name}
                            </motion.div>

                            {/* Dialogue text */}
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={text}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`text-xl leading-relaxed text-gray-800 mt-4 ${isNarration ? 'italic text-center' : ''}`}
                                >
                                    {isNarration ? `"${text}"` : text}
                                </motion.p>
                            </AnimatePresence>

                            {/* Continue button */}
                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={onContinue}
                                    className="btn-pop bg-yellow text-black flex items-center gap-2"
                                >
                                    Continue
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Doctor on right - full height */}
                {/* Doctor on right - full height */}
                {!hideDoctor && (
                    <div className="h-full border-l-4 border-black overflow-hidden hidden md:block">
                        <HumanPortrait
                            type="doctor"
                            mood={doctorActive ? mood : 'happy'}
                            isActive={doctorActive}
                        />
                    </div>
                )}
            </div>
        );
    }

    // MOBILE LAYOUT (Stacked: Ivan Top, Text Middle, Doctor Bottom)
    return (
        <div className="flex flex-col w-full min-h-[60vh] gap-4 py-2">
            {/* Top: Ivan */}
            <div className={`flex items-center gap-3 transition-opacity duration-300 ${ivanActive ? 'opacity-100' : 'opacity-60 grayscale'}`}>
                <div className="w-16 h-16 rounded-xl border-2 border-black overflow-hidden bg-blue-100 shadow-[2px_2px_0_#000]">
                    <NiceAvatar style={{ width: '100%', height: '100%' }} shape="square" {...humanConfigs.ivan[ivanActive ? mood : 'happy']} />
                </div>
                {ivanActive && (
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-lg border-2 border-black font-black text-sm shadow-[2px_2px_0_#000]">
                        IVAN
                    </div>
                )}
            </div>

            {/* Middle: Dialogue Box */}
            <div className="flex-1 flex flex-col justify-center">
                <div className="bg-white border-4 border-black p-5 rounded-2xl shadow-[6px_6px_0_#1C1C1E] relative">
                    {/* Speaker Name Tag */}
                    <div className="absolute -top-3 left-4 px-3 py-1 border-2 border-black rounded-full font-bold text-xs text-white"
                        style={{ backgroundColor: accentColor }}>
                        {name}
                    </div>

                    {image && (
                        <div className="bg-gray-100 border-2 border-black rounded-lg mb-3 h-28 flex items-center justify-center overflow-hidden">
                            {image === 'raw_meat_zoom' ?
                                <img src="/media/images/raw_meat_zoom.png" className="w-full h-full object-cover" /> :
                                <span className="text-2xl">{image}</span>
                            }
                        </div>
                    )}

                    <p className={`text-lg font-bold text-gray-800 leading-snug mt-2 ${isNarration ? 'italic text-center' : ''}`}>
                        {isNarration ? `"${text}"` : text}
                    </p>

                    <div className="flex justify-end mt-4">
                        <button onClick={onContinue} className="bg-yellow-400 text-black px-4 py-2 rounded-lg border-2 border-black font-black flex items-center gap-1 text-sm shadow-[3px_3px_0_#000] active:translate-y-1 active:shadow-none">
                            NEXT <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom: Doctor */}
            <div className={`flex items-center justify-end gap-3 transition-opacity duration-300 ${doctorActive ? 'opacity-100' : 'opacity-60 grayscale'}`}>
                {doctorActive && (
                    <div className="bg-teal-500 text-white px-3 py-1 rounded-lg border-2 border-black font-black text-sm shadow-[2px_2px_0_#000]">
                        DR. CHEN
                    </div>
                )}
                <div className="w-16 h-16 rounded-xl border-2 border-black overflow-hidden bg-teal-100 shadow-[2px_2px_0_#000]">
                    <NiceAvatar style={{ width: '100%', height: '100%' }} shape="square" {...humanConfigs.doctor[doctorActive ? mood : 'happy']} />
                </div>
            </div>
        </div>
    );
}

// Cell dialogue (immune cells, centered)
function CellDialogue({ speaker, text, onContinue, mood, image }) {
    const name = characterNames[speaker] || 'Unknown';
    const accentColor = characterColors[speaker] || '#007AFF';

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">

            {/* Optional Image */}
            {image && (
                <div className="mb-6 rounded-xl border-4 border-black overflow-hidden shadow-card bg-white p-2">
                    <div className="w-64 h-48 bg-gray-200 flex items-center justify-center text-4xl">
                        {image}
                    </div>
                </div>
            )}

            <div className="relative mb-4 w-full max-w-2xl">
                <div
                    className="relative bg-white rounded-2xl border-4 border-black p-6"
                    style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                >
                    <div
                        className="absolute -top-4 left-6 px-4 py-1 rounded-full font-bold text-white border-3 border-black"
                        style={{
                            backgroundColor: accentColor,
                            boxShadow: '2px 2px 0 #1C1C1E'
                        }}
                    >
                        {name}
                    </div>

                    {/* Smooth text transition */}
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={text}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-lg leading-relaxed text-gray-800 mt-2"
                        >
                            {text}
                        </motion.p>
                    </AnimatePresence>

                    <div className="flex justify-end mt-4">
                        <button
                            onClick={onContinue}
                            className="btn-pop bg-yellow text-black flex items-center gap-2"
                        >
                            Continue
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div
                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                    style={{
                        width: 0, height: 0,
                        borderLeft: '20px solid transparent',
                        borderRight: '20px solid transparent',
                        borderTop: '20px solid #1C1C1E',
                    }}
                />
                <div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                    style={{
                        width: 0, height: 0,
                        borderLeft: '16px solid transparent',
                        borderRight: '16px solid transparent',
                        borderTop: '16px solid white',
                    }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
            >
                <CellAvatar type={speaker} size={160} mood={mood} />
            </motion.div>
        </div>
    );
}

// Main DialogueBox
export function DialogueBox({ speaker, text, onContinue, showContinue = true, isSameSpeaker = false, image, hideDoctor = false }) {
    const mood = detectMoodFromText(text);

    // Narrator uses same layout as humans but with both dimmed
    if (isNarrator(speaker)) {
        return (
            <HumanDialogue
                speaker="narrator"
                text={text}
                onContinue={onContinue}
                mood="happy"
                isNarration={true}
                image={image}
                hideDoctor={hideDoctor}
            />
        );
    }

    if (isHumanCharacter(speaker)) {
        return (
            <HumanDialogue
                speaker={speaker}
                text={text}
                onContinue={onContinue}
                mood={mood}
                image={image}
                hideDoctor={hideDoctor}
            />
        );
    }

    return (
        <CellDialogue
            speaker={speaker}
            text={text}
            onContinue={onContinue}
            mood={mood}
            image={image}
        />
    );
}

DialogueBox.propTypes = {
    speaker: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onContinue: PropTypes.func,
    showContinue: PropTypes.bool,
    isSameSpeaker: PropTypes.bool,
    image: PropTypes.string,
    hideDoctor: PropTypes.bool,
};
