import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { Check, RefreshCw } from 'lucide-react';
import { CharacterAvatar, characterColors } from './Characters';
import QuestionLayout from './QuestionLayout';

export function RecruitPanel({ speaker, text, options, correctCount, successText, onComplete, onWrongAnswer, lives, actName, questionNumber, totalQuestions }) {
    const [selected, setSelected] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const toggleSelect = (optionId) => {
        if (submitted) return;
        if (selected.includes(optionId)) {
            setSelected(selected.filter(id => id !== optionId));
        } else if (selected.length < correctCount) {
            setSelected([...selected, optionId]);
        }
    };

    useEffect(() => {
        if (selected.length === correctCount && !submitted) {
            const timer = setTimeout(() => {
                const correctAnswers = options.filter(o => o.correct).map(o => o.id);
                const allCorrect = selected.every(id => correctAnswers.includes(id));
                setIsCorrect(allCorrect);
                setSubmitted(true);
                if (allCorrect && onComplete) {
                    setTimeout(() => onComplete(), 1500);
                } else if (onWrongAnswer) {
                    onWrongAnswer();
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [selected, correctCount, options, onComplete, onWrongAnswer, submitted]);

    const handleRetry = () => {
        setSelected([]);
        setSubmitted(false);
        setIsCorrect(false);
    };

    return (
        <QuestionLayout
            actName={actName}
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
            lives={lives}
            character={speaker}
            reaction={!submitted ? 'neutral' : isCorrect ? 'happy' : 'sad'}
        >
            <div className="w-full h-full flex flex-col justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left: Instructions */}
                    <div
                        className="bg-white rounded-3xl border-4 border-black p-8 relative flex flex-col justify-center gap-6"
                        style={{ boxShadow: '8px 8px 0 #1C1C1E' }}
                    >
                        <div>
                            <div
                                className="inline-block px-4 py-1 md:px-6 md:py-2 rounded-full font-bold text-white text-xs md:text-sm mb-4 border-2 border-black"
                                style={{ backgroundColor: characterColors[speaker] || '#00C7BE', boxShadow: '2px 2px 0 #1C1C1E' }}
                            >
                                Recruit Cells
                            </div>
                            <p className="text-xl md:text-2xl leading-relaxed text-gray-800 font-medium">{text}</p>
                        </div>

                        {/* Selection counter */}
                        <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-2xl border-2 border-black/10">
                            <span className="font-bold text-gray-700 uppercase tracking-wider text-sm">Target:</span>
                            <div className="flex gap-3">
                                {[...Array(correctCount)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-10 h-10 rounded-full border-4 border-black flex items-center justify-center transition-all ${i < selected.length ? 'bg-yellow scale-110 shadow-sm' : 'bg-white'}`}
                                    >
                                        {i < selected.length && <Check className="w-6 h-6 text-black" strokeWidth={4} />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Character grid */}
                    <div className="grid grid-cols-2 gap-4 auto-rows-fr">
                        {options.map((option) => {
                            const isSelected = selected.includes(option.id);
                            const showResult = submitted;
                            const accentColor = characterColors[option.id] || '#FFCC00';

                            return (
                                <motion.button
                                    key={option.id}
                                    onClick={() => toggleSelect(option.id)}
                                    disabled={submitted}
                                    whileHover={!submitted ? { scale: 1.05, zIndex: 10 } : {}}
                                    whileTap={!submitted ? { scale: 0.95 } : {}}
                                    className={`
                                        p-4 rounded-3xl border-4 border-black text-center transition-all flex flex-col items-center justify-center gap-2 relative overflow-hidden
                                        ${showResult && isCorrect && option.correct ? 'bg-green-500' : ''}
                                        ${showResult && isCorrect && isSelected ? 'bg-green-500' : ''}
                                        ${showResult && !isCorrect && isSelected ? 'bg-red-500' : ''}
                                        ${!showResult && isSelected ? 'bg-white ring-4 ring-yellow-400 ring-offset-2' : ''}
                                        ${!showResult && !isSelected ? 'bg-white hover:bg-gray-50' : ''}
                                        ${showResult && !isSelected ? 'bg-white opacity-60' : ''}
                                    `}
                                    style={{ boxShadow: isSelected ? 'none' : '4px 4px 0 #1C1C1E' }}
                                >
                                    <div className="relative">
                                        <CharacterAvatar speaker={option.id} size={60} mood={isSelected ? 'excited' : 'happy'} />
                                        {isSelected && !submitted && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute -top-2 -right-2 bg-yellow text-black rounded-full p-1 border-2 border-black"
                                            >
                                                <Check className="w-4 h-4" strokeWidth={4} />
                                            </motion.div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className={`font-black text-lg leading-tight ${showResult && isSelected ? 'text-white' : ''}`} style={{ color: showResult && isSelected ? undefined : accentColor }}>
                                            {option.name}
                                        </h4>
                                        <p className={`text-xs font-bold leading-tight mt-1 ${showResult && isSelected ? 'text-white/80' : 'text-gray-400'}`}>{option.description}</p>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Feedback */}
                <AnimatePresence>
                    {submitted && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 text-center"
                        >
                            <div
                                className={`inline-block px-8 py-4 rounded-3xl border-4 border-black ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}
                                style={{ boxShadow: '6px 6px 0 #1C1C1E' }}
                            >
                                <p className="text-2xl font-black text-white mb-2">
                                    {isCorrect ? (successText || 'Great team!') : 'Wrong selection!'}
                                </p>
                                <div className="flex gap-4 justify-center">
                                    {!isCorrect && lives > 1 && (
                                        <button onClick={handleRetry} className="btn-pop bg-white text-black text-base px-6 py-2 rounded-xl border-2 border-black flex items-center gap-2">
                                            <RefreshCw className="w-4 h-4" /> Try Again
                                        </button>
                                    )}
                                    {!isCorrect && lives <= 1 && (
                                        <button onClick={() => onWrong && onWrong()} className="btn-pop bg-white text-black text-base px-6 py-2 rounded-xl border-2 border-black">
                                            Continue
                                        </button>
                                    )}
                                    {isCorrect && (
                                        <button onClick={() => onComplete && onComplete()} className="btn-pop bg-yellow-400 text-black text-base px-6 py-2 rounded-xl border-2 border-black">
                                            Continue
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </QuestionLayout>
    );
}

RecruitPanel.propTypes = {
    speaker: PropTypes.string,
    text: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        correct: PropTypes.bool.isRequired,
    })).isRequired,
    correctCount: PropTypes.number.isRequired,
    successText: PropTypes.string,
    onComplete: PropTypes.func,
    onWrongAnswer: PropTypes.func,
    lives: PropTypes.number,
    actName: PropTypes.string,
    questionNumber: PropTypes.number,
    totalQuestions: PropTypes.number,
};
