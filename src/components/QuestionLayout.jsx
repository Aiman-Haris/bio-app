import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { Ghost } from 'react-kawaii'; // Fallback
import { Heart } from 'lucide-react';
import { cellCharacters } from './Characters';

function TopHUD({ actName, questionNumber, totalQuestions, lives, maxLives }) {
    const progress = totalQuestions > 0 ? (questionNumber / totalQuestions) * 100 : 0;

    return (
        <div className="bg-white border-b-4 border-black p-4 flex items-center justify-between shadow-lg z-50 relative rounded-b-3xl mx-4 mt-2">
            {/* Left: Act Name */}
            <div className="flex items-center gap-4">
                <div className="bg-black text-white font-black text-xl px-6 py-3 rounded-2xl border-4 border-black transform -rotate-2 hover:rotate-0 transition-transform hidden md:block">
                    {actName || 'ACT 1'}
                </div>
            </div>

            {/* Center: Progress Bar */}
            <div className="flex-1 max-w-2xl mx-8">
                <div className="flex items-center justify-between mb-2 px-2">
                    <span className="font-black text-sm uppercase tracking-wider">Mission Progress</span>
                    <span className="font-black text-sm bg-yellow-300 px-2 rounded-md border-2 border-black">{Math.round(progress)}%</span>
                </div>
                <div className="h-6 w-full bg-gray-100 border-4 border-black rounded-full overflow-hidden relative">
                    <motion.div
                        className="h-full bg-green-400 border-r-4 border-black"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: 'spring', stiffness: 50 }}
                    />
                </div>
            </div>

            {/* Right: Lives */}
            <div className="flex items-center gap-3 bg-yellow-300 border-4 border-black px-6 py-3 rounded-2xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] transform rotate-2">
                <span className="font-black uppercase tracking-wider hidden md:inline">Lives</span>
                <div className="flex gap-1">
                    {[...Array(maxLives)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Heart
                                className={`w-7 h-7 ${i < lives ? 'fill-red-500 text-black' : 'text-black/20 fill-none'}`}
                                strokeWidth={3}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Memoized Mascot Component to prevent re-renders on every parent update
const MemoizedMascot = React.memo(function Mascot({ mood, color, Component, reaction, bubbleText }) {
    return (
        <motion.div
            className="fixed bottom-[-10px] right-[-10px] md:right-4 md:bottom-[-20px] z-20 pointer-events-none origin-bottom-right transform scale-75 md:scale-100"
            animate={
                reaction === 'happy' ? { y: [0, -20, 0] } :
                    reaction === 'sad' ? { x: [-5, 5, -5, 5, 0] } :
                        { y: [0, -5, 0] }
            }
            transition={
                reaction === 'happy' ? { duration: 0.5, repeat: Infinity, repeatType: "reverse" } :
                    reaction === 'sad' ? { duration: 0.4 } :
                        { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            }
        >
            <div className="relative flex flex-col items-end">
                {/* Speech Bubble - Always visible with encouraging message */}
                <AnimatePresence>
                    <motion.div
                        key={bubbleText}
                        initial={{ scale: 0, opacity: 0, y: 20, x: -50 }}
                        animate={{ scale: 1, opacity: 1, y: 0, x: -50 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className={`absolute bottom-[180px] md:bottom-[240px] right-[10px] md:right-[20px] border-4 border-black px-4 py-2 md:px-6 md:py-3 rounded-2xl z-30 shadow-[4px_4px_0_0_rgba(0,0,0,1)] md:shadow-[6px_6px_0_0_rgba(0,0,0,1)] max-w-[160px] md:max-w-[220px]
                            ${reaction === 'happy' ? 'bg-green-400' : reaction === 'sad' ? 'bg-red-400' : 'bg-white'}
                        `}
                    >
                        <h2 className={`text-sm md:text-lg font-black italic leading-tight ${reaction === 'neutral' ? 'text-black' : 'text-white'}`}>{bubbleText}</h2>
                        {/* Triangle pointer */}
                        <div className={`absolute -bottom-4 right-10 w-0 h-0 border-l-[15px] border-l-transparent border-t-[15px] border-r-[0px] border-r-transparent
                            ${reaction === 'happy' ? 'border-t-green-400' : reaction === 'sad' ? 'border-t-red-400' : 'border-t-black'}
                        `}></div>
                        <div className={`absolute -bottom-[10px] right-[13px] w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-r-[0px] border-r-transparent
                            ${reaction === 'happy' ? 'border-t-green-400' : reaction === 'sad' ? 'border-t-red-400' : 'border-t-white'}
                        `}></div>
                    </motion.div>
                </AnimatePresence>

                <div className="filter drop-shadow-[6px_6px_0_rgba(0,0,0,1)]">
                    <Component size={220} mood={mood} color={color} />
                </div>
            </div>
        </motion.div>
    );
});

export function QuestionLayout({
    children,
    actName,
    questionNumber = 0,
    totalQuestions = 0,
    lives = 3,
    maxLives = 3,
    character = 'macrophage', // Default to mac if none provided
    reaction = 'neutral', // 'neutral', 'happy', 'sad'
    topic // deprecated but kept for compatibility logic helper if needed
}) {
    // Encouraging phrases for different reactions
    const encouragingPhrases = {
        neutral: [
            "You got this!",
            "Think carefully...",
            "Take your time!",
            "I believe in you!",
            "Focus and conquer!",
            "Let's do this!",
        ],
        happy: [
            "AMAZING! You're a genius!",
            "YES! Nailed it!",
            "Brilliant work!",
            "You're on FIRE!",
            "That's the spirit!",
            "Unstoppable!",
        ],
        sad: [
            "Don't give up!",
            "You can do it!",
            "Keep trying!",
            "Almost there!",
            "Stay strong!",
            "Learn and grow!",
        ],
    };

    // Pick a random phrase based on reaction
    const getRandomPhrase = (type) => {
        const phrases = encouragingPhrases[type] || encouragingPhrases.neutral;
        return phrases[Math.floor(Math.random() * phrases.length)];
    };

    // --- MASCOT CONFIGURATION ---
    // The mascot is a consistent character (The "Immune Buddy") throughout the game
    const MASCOT = {
        Component: Ghost,
        color: '#E0B0FF', // Mauve/Lavender - distinct friendly color
        defaultMood: 'blissful'
    };

    // React-Kawaii mood mapping for Mascot
    // Memoize mood and text so they don't change on every parent render (e.g. mouse movement)
    const { mood, bubbleText } = React.useMemo(() => {
        let currentMood = MASCOT.defaultMood;
        let currentText = getRandomPhrase('neutral');

        if (reaction === 'happy') {
            currentMood = 'lovestruck';
            currentText = getRandomPhrase('happy');
        } else if (reaction === 'sad') {
            currentMood = 'ko';
            currentText = getRandomPhrase('sad');
        }

        return { mood: currentMood, bubbleText: currentText };
    }, [reaction]); // Only update when reaction changes (Win/Loss)

    // We ignore the 'character' prop for the visual, as the user requested a consistent mascot
    const { Component, color } = MASCOT;

    return (
        <div className="fixed inset-0 bg-indigo-50 font-mono text-black selection:bg-yellow-300 flex flex-col">
            {/* Pop Art Patterns */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#000 3px, transparent 3px)', backgroundSize: '40px 40px' }}
            />

            {/* Top HUD - Fixed at top via flex layout */}
            <div className="flex-none z-30">
                <TopHUD
                    actName={actName}
                    questionNumber={questionNumber}
                    totalQuestions={totalQuestions}
                    lives={lives}
                    maxLives={maxLives}
                />
            </div>

            {/* Main Content Stage - Scrollable Area */}
            <div className="relative z-10 flex-1 w-full overflow-y-auto overflow-x-hidden flex flex-col md:flex-row items-start justify-center p-4 pt-4">

                {/* Content Container */}
                <div className="w-full max-w-5xl relative z-10 md:mr-64 mt-4 pb-32">
                    {children}
                </div>

                {/* Hero Character (Bottom-Right) */}
                <MemoizedMascot
                    mood={mood}
                    color={color}
                    Component={Component}
                    reaction={reaction}
                    bubbleText={bubbleText}
                />
            </div>
        </div>
    );
}

QuestionLayout.propTypes = {
    children: PropTypes.node.isRequired,
    actName: PropTypes.string,
    questionNumber: PropTypes.number,
    totalQuestions: PropTypes.number,
    lives: PropTypes.number,
    maxLives: PropTypes.number,
    topic: PropTypes.string,
    reaction: PropTypes.oneOf(['neutral', 'happy', 'sad']),
};

export default QuestionLayout;
