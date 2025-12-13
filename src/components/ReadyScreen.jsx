import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

export default function ReadyScreen({ text, onContinue }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black/80 text-white p-8 text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                    COMBAT READY?
                </h1>
                <p className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed">
                    {text}
                </p>

                <Button
                    onClick={onContinue}
                    className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-2xl rounded-full shadow-lg border-2 border-red-400 animate-pulse"
                >
                    ⚔️ READY FOR BATTLE
                </Button>
            </motion.div>
        </div>
    );
}
