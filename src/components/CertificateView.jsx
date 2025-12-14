import React, { useState } from 'react';
import Button from './Button';

export default function CertificateView({ title, description, onRestart }) {
    const [name, setName] = useState('');
    const [showCert, setShowCert] = useState(false);

    const handlePrint = () => {
        window.print();
    };

    if (!showCert) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 md:p-8">
                <div className="max-w-md w-full border-4 border-black rounded-2xl p-8 shadow-lg">
                    <h1 className="text-3xl md:text-4xl font-black mb-4 text-center text-black">Mission Accomplished!</h1>
                    <p className="mb-6 text-lg text-center text-gray-700">
                        Enter your name to receive your certificate.
                    </p>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-lg text-black text-lg mb-6 border-2 border-gray-300 font-medium focus:ring-2 ring-blue-500 outline-none"
                    />
                    <Button
                        onClick={() => { if (name.trim()) setShowCert(true); }}
                        disabled={!name.trim()}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Generate Certificate
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 md:p-8 print:p-0">
            <div className="max-w-4xl w-full bg-yellow-50 text-black p-12 md:p-16 border-8 border-double border-gray-800 print:border-4">
                <div className="text-center">
                    {/* Certificate Header */}
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-800 mb-2">
                        Certificate
                    </h1>
                    <h2 className="text-xl md:text-2xl text-gray-600 mb-12 uppercase tracking-widest">
                        of Completion
                    </h2>

                    <p className="text-lg md:text-xl text-gray-700 mb-8">This certifies that</p>

                    {/* Name */}
                    <div className="text-4xl md:text-5xl font-serif text-black mb-12 border-b-2 border-gray-400 inline-block px-12 pb-3">
                        {name}
                    </div>

                    <p className="text-lg md:text-xl text-gray-700 mb-6">
                        Has successfully completed
                    </p>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-black mb-8">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-16">
                        {description}
                    </p>
                </div>
            </div>

            {/* Buttons - Hidden when printing */}
            <div className="mt-8 flex flex-col md:flex-row gap-3 md:gap-4 print:hidden w-full md:w-auto">
                <Button
                    onClick={handlePrint}
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 md:px-8 md:py-3 rounded-lg font-bold text-base"
                >
                    Print Certificate
                </Button>
                <Button
                    onClick={onRestart}
                    className="w-full md:w-auto bg-gray-800 hover:bg-gray-900 text-white px-6 py-4 md:px-8 md:py-3 rounded-lg font-bold text-base"
                >
                    Play Again
                </Button>
            </div>
        </div>
    );
}
