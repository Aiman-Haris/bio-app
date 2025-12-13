import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { CharacterAvatar } from './Characters';

export default function CertificateView({ title, description, onRestart }) {
    const [name, setName] = useState('');
    const [showCert, setShowCert] = useState(false);

    const handlePrint = () => {
        window.print();
    };

    if (!showCert) {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8 text-white">
                <h1 className="text-4xl font-bold mb-8">Mission Accomplished!</h1>
                <p className="mb-8 text-xl text-center max-w-lg">
                    You have successfully defended Ivan from the infection.
                    Please enter your name to receive your commendation.
                </p>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="px-6 py-3 rounded-lg text-black text-xl mb-8 w-full max-w-md focus:ring-4 ring-blue-500 outline-none"
                />
                <Button
                    onClick={() => { if (name.trim()) setShowCert(true); }}
                    disabled={!name.trim()}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Generate Certificate
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8 print:p-0 print:bg-white">
            <div className="max-w-4xl w-full bg-white text-black p-12 border-[20px] border-double border-yellow-600 rounded-lg shadow-2xl relative overflow-hidden print:shadow-none print:border-8">

                {/* Decorative corner */}
                <div className="absolute top-0 left-0 w-32 h-32 border-b-[40px] border-r-[40px] border-yellow-600 rounded-br-full -translate-x-16 -translate-y-16 opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 border-t-[40px] border-l-[40px] border-yellow-600 rounded-tl-full translate-x-16 translate-y-16 opacity-50"></div>

                <div className="text-center relative z-10">
                    <div className="mb-4">
                        <CharacterAvatar speaker="doctor" size={100} mood="happy" />
                    </div>

                    <h1 className="text-6xl font-serif font-bold text-yellow-700 mb-2 font-display uppercase tracking-widest">Certificate</h1>
                    <h2 className="text-2xl font-serif text-gray-500 mb-8 uppercase tracking-widest">of Completion</h2>

                    <p className="text-xl text-gray-700 italic mb-8">This certifies that</p>

                    <div className="text-5xl font-script font-bold text-blue-800 mb-8 border-b-2 border-gray-300 inline-block px-12 pb-2">
                        {name}
                    </div>

                    <p className="text-xl text-gray-700 mb-6">
                        Has successfully completed the training module:
                    </p>

                    <h3 className="text-3xl font-bold text-gray-900 mb-8">{title}</h3>

                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12">
                        {description}
                    </p>

                    <div className="flex justify-between items-end mt-12 px-12">
                        <div className="text-center">
                            <div className="font-script text-2xl text-blue-600 mb-2">Dr. Sarah Chen</div>
                            <div className="border-t border-gray-400 w-48 mx-auto pt-2 text-sm text-gray-500 uppercase">Chief Immunologist</div>
                        </div>

                        <div className="text-center">
                            <div className="text-yellow-600">★★★★★</div>
                            <div className="border-t border-gray-400 w-48 mx-auto pt-2 text-sm text-gray-500 uppercase">Class S Defender</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex gap-4 print:hidden">
                <Button onClick={handlePrint} className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg">
                    🖨️ Print Certificate
                </Button>
                <Button onClick={onRestart} className="bg-gray-800 text-white px-8 py-3 rounded-lg shadow-lg">
                    🔄 Play Again
                </Button>
            </div>
        </div>
    );
}
