import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { RotateCcw } from 'lucide-react';
import QuestionLayout from './QuestionLayout';

export function GameOverScreen({ onRestart }) {
    return (
        <div className="fixed inset-0 bg-red-600 flex flex-col items-center justify-center p-8 z-[100] text-center overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '30px 30px' }}
            />

            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative z-10"
            >
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="text-9xl mb-4 font-black text-white drop-shadow-[8px_8px_0_rgba(0,0,0,0.5)]"
                >
                    GAME OVER
                </motion.div>

                <p className="text-3xl text-white font-bold mb-12 max-w-2xl mx-auto drop-shadow-md">
                    The infection has spread. Ivan's immune system has collapsed.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onRestart}
                    className="bg-white text-red-600 px-12 py-6 rounded-full text-3xl font-black border-8 border-black shadow-[10px_10px_0_0_rgba(0,0,0,1)] flex items-center gap-4 mx-auto"
                >
                    <RotateCcw className="w-10 h-10" strokeWidth={4} />
                    TRY AGAIN
                </motion.button>
            </motion.div>
        </div>
    );
}

GameOverScreen.propTypes = {
    onRestart: PropTypes.func.isRequired,
    lives: PropTypes.number,
    actName: PropTypes.string,
    questionNumber: PropTypes.number,
    totalQuestions: PropTypes.number,
};
