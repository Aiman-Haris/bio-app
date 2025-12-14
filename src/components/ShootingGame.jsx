import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { CellAvatar } from './Characters';
import { Crosshair } from 'lucide-react'; // Removing Heart since HUD handles lives
import QuestionLayout from './QuestionLayout'; // Integrating standard layout

// Game constants
const GAME_DURATION = 30; // Increased time
const SPAWN_RATE = 600;   // Faster spawns
const TARGET_LIFETIME = 3000;
const VICTORY_SCORE = 10; // Reachable goal

export default function ShootingGame({ instruction, onComplete, onFail, lives, actName, questionNumber, totalQuestions }) {
    const [targets, setTargets] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [gameState, setGameState] = useState('playing'); // playing, won, lost
    const [particles, setParticles] = useState([]); // For hit effects
    const containerRef = useRef(null);

    // Timer
    useEffect(() => {
        if (gameState !== 'playing') return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    // If time runs out and we haven't reached the score...
                    if (score >= VICTORY_SCORE) {
                        setGameState('won');
                        setTimeout(onComplete, 2000);
                    } else {
                        setGameState('lost'); // Time ran out
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [gameState, score, onComplete]);

    // Spawner
    useEffect(() => {
        if (gameState !== 'playing') return;

        // Initial spawn
        const spawnInitial = () => {
            const initial = [];
            for (let i = 0; i < 8; i++) initial.push(createTarget(i)); // Increased initial targets
            setTargets(initial);
        };
        spawnInitial();

        const spawner = setInterval(() => {
            setTargets(prev => {
                if (prev.length > 12) return prev; // increased max targets
                return [...prev, createTarget(Date.now() + Math.random())];
            });
        }, SPAWN_RATE);

        return () => clearInterval(spawner);
    }, [gameState]);

    // Check win condition
    useEffect(() => {
        if (score >= VICTORY_SCORE && gameState === 'playing') {
            setGameState('won');
            setTimeout(onComplete, 1500); // Wait a bit then proceed
        }
    }, [score, gameState, onComplete]);

    // Lost state handling - lives logic is mainly visual here or passed from parent? 
    // Actually, handleWrongAnswer in App decrements global lives.
    // We should call onFail() when shooting a friend, which decrements a life.
    // If lives hit 0, App handles game over.
    // BUT visually we want to show it here too?
    // Let's rely on the props 'lives'. If lives drops to 0, App will unmount this eventually or show GameOver.

    useEffect(() => {
        if (lives <= 0) {
            setGameState('lost');
        }
    }, [lives]);

    const createTarget = (id) => {
        const isInfected = Math.random() > 0.4; // 60% chance infected
        return {
            id,
            isInfected,
            type: isInfected ? 'pathogen' : ['macrophage', 'bCell', 'helperT'][Math.floor(Math.random() * 3)],
            x: Math.random() * 80 + 10,
            y: Math.random() * 60 + 10, // Adjusted vertical range to not overlap too much with HUD/Bottom
            scale: 1,
        };
    };

    const handleShoot = (target) => {
        if (gameState !== 'playing') return;

        if (target.isInfected) {
            // HIT!
            setScore(s => s + 1);
            spawnParticle(target.x, target.y, '+1', 'text-green-600');
        } else {
            // MISS (Friendly Fire)!
            onFail(); // Deduct global life
            spawnParticle(target.x, target.y, 'OUCH!', 'text-red-600 font-bold text-xl');
        }

        // Remove target
        setTargets(prev => prev.filter(t => t.id !== target.id));
    };

    const spawnParticle = (x, y, text, colorClass) => {
        const id = Date.now() + Math.random();
        setParticles(prev => [...prev, { id, x, y, text, colorClass }]);
        setTimeout(() => {
            setParticles(prev => prev.filter(p => p.id !== id));
        }, 1000);
    };

    // Custom Cursor logic
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMove = (e) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setCursorPos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                });
            }
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    return (
        <QuestionLayout
            actName={actName}
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
            lives={lives}
            reaction={gameState === 'won' ? 'happy' : gameState === 'lost' ? 'sad' : 'neutral'}
        >
            <div
                ref={containerRef}
                className="relative w-full h-[50vh] md:h-[500px] bg-red-50 border-4 border-black rounded-3xl overflow-hidden cursor-none shadow-[8px_8px_0_#000]"
            >
                {/* Game Stats Overlay inside the game box */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20 pointer-events-none">
                    <div className="bg-white/80 backdrop-blur border-2 border-black px-2 py-1 md:px-4 md:py-2 rounded-xl font-black text-sm md:text-lg">
                        SCORE: {score}/{VICTORY_SCORE}
                    </div>
                    <div className={`bg-white/80 backdrop-blur border-2 border-black px-2 py-1 md:px-4 md:py-2 rounded-xl font-black text-sm md:text-lg ${timeLeft < 10 ? 'text-red-500 animate-pulse' : ''}`}>
                        TIME: {timeLeft}s
                    </div>
                </div>

                {/* Game Area */}
                <div className="absolute inset-0 z-10">
                    <AnimatePresence>
                        {targets.map(target => (
                            <Target
                                key={target.id}
                                target={target}
                                onShoot={() => handleShoot(target)}
                            />
                        ))}
                    </AnimatePresence>

                    {/* Particles */}
                    {particles.map(p => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 1, y: 0 }}
                            animate={{ opacity: 0, y: -50 }}
                            className={`absolute font-bold z-20 pointer-events-none ${p.colorClass}`}
                            style={{ left: `${p.x}%`, top: `${p.y}%` }}
                        >
                            {p.text}
                        </motion.div>
                    ))}
                </div>

                {/* Custom Scope Cursor - Hidden on mobile because touch input doesn't always have hover */}
                <div
                    className="pointer-events-none absolute z-50 transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
                    style={{ left: cursorPos.x, top: cursorPos.y }}
                >
                    <div className="relative">
                        <Crosshair size={48} className="text-red-600" strokeWidth={2} />
                        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                </div>

                {/* Start Instruction Overlay */}
                {gameState === 'playing' && timeLeft > (GAME_DURATION - 3) && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="absolute inset-0 z-40 bg-black/40 flex items-center justify-center pointer-events-none"
                    >
                        <div className="text-center text-white bg-black/80 p-4 md:p-6 rounded-xl border-4 border-white transform rotate-2">
                            <h2 className="text-2xl md:text-4xl font-black mb-2 text-yellow-400">SHOOT INFECTED!</h2>
                            <p className="text-sm md:text-xl font-bold">Avoid Friendly Cells!</p>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Helper Text below game box */}
            <div className="mt-4 text-center font-bold text-slate-500">
                {instruction}
            </div>
        </QuestionLayout>
    );
}

function Target({ target, onShoot }) {
    return (
        <motion.div
            layout // Smooth movement if we add it
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="absolute cursor-pointer"
            style={{
                left: `${target.x}%`,
                top: `${target.y}%`,
            }}
            onClick={(e) => {
                e.stopPropagation(); // Prevent bg click
                onShoot();
            }}
        >
            <div className={`
                relative p-4 rounded-full transition-transform transform hover:scale-110 active:scale-95
            `}>
                <CellAvatar
                    type={target.type}
                    size={80}
                    mood={target.isInfected ? 'sick' : 'worried'}
                />
            </div>
        </motion.div>
    );
}
