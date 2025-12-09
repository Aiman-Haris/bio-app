import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import {
    characterNames,
    characterColors,
    isHumanCharacter,
    isNarrator,
    detectMoodFromText,
    HumanAvatar,
    CellAvatar
} from './Characters';
import { ChevronRight } from 'lucide-react';

// Cinematic narration overlay component (no avatar, floating text)
function NarrationOverlay({ text, onContinue }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-4xl mx-auto text-center"
        >
            {/* Cinematic narration text */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative px-8 py-6"
            >
                {/* Decorative lines */}
                <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="h-0.5 w-16 bg-white/40" />
                    <span className="text-white/60 text-sm uppercase tracking-widest">narrator</span>
                    <div className="h-0.5 w-16 bg-white/40" />
                </div>

                {/* Narration text - italic, elegant */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl text-white font-light italic leading-relaxed"
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
                >
                    "{text}"
                </motion.p>

                {/* Continue button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8"
                >
                    <button
                        onClick={onContinue}
                        className="btn-pop bg-yellow text-black flex items-center gap-2 mx-auto"
                    >
                        Continue
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

// Character with speech bubble
function CharacterDialogue({ speaker, text, onContinue, isSameSpeaker, mood }) {
    const name = characterNames[speaker] || 'Unknown';
    const accentColor = characterColors[speaker] || '#007AFF';
    const isHuman = isHumanCharacter(speaker);

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
            {/* Speech bubble / Dialogue box */}
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                key={text}
                className="relative mb-4 w-full max-w-2xl"
            >
                {/* Main dialogue box */}
                <div
                    className="relative bg-white rounded-2xl border-4 border-black p-6"
                    style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                >
                    {/* Name tag */}
                    <div
                        className="absolute -top-4 left-6 px-4 py-1 rounded-full font-bold text-white border-3 border-black"
                        style={{
                            backgroundColor: accentColor,
                            boxShadow: '2px 2px 0 #1C1C1E'
                        }}
                    >
                        {name}
                    </div>

                    {/* Dialogue text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg leading-relaxed text-gray-800 mt-2"
                    >
                        {text}
                    </motion.p>

                    {/* Continue button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-end mt-4"
                    >
                        <button
                            onClick={onContinue}
                            className="btn-pop bg-yellow text-black flex items-center gap-2"
                        >
                            Continue
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                </div>

                {/* Speech bubble pointer */}
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
            </motion.div>

            {/* Character avatar with expression */}
            <motion.div
                initial={isSameSpeaker ? false : { opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
            >
                {isHuman ? (
                    <HumanAvatar type={speaker} size={180} mood={mood} />
                ) : (
                    <CellAvatar type={speaker} size={160} mood={mood} />
                )}
            </motion.div>
        </div>
    );
}

// Main DialogueBox - handles both narration and character dialogue
export function DialogueBox({ speaker, text, onContinue, showContinue = true, isSameSpeaker = false }) {
    const mood = detectMoodFromText(text);

    // Narrator gets cinematic overlay treatment
    if (isNarrator(speaker)) {
        return <NarrationOverlay text={text} onContinue={onContinue} />;
    }

    // Regular character dialogue with avatar
    return (
        <CharacterDialogue
            speaker={speaker}
            text={text}
            onContinue={onContinue}
            isSameSpeaker={isSameSpeaker}
            mood={mood}
        />
    );
}

DialogueBox.propTypes = {
    speaker: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onContinue: PropTypes.func,
    showContinue: PropTypes.bool,
    isSameSpeaker: PropTypes.bool,
};
