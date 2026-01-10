import React, { useState } from 'react';
import Button from './Button';
import { Award, Printer, RotateCcw, PenTool, ShieldCheck } from 'lucide-react';

export default function CertificateView({ title, description, onRestart }) {
    const [name, setName] = useState('');
    const [showCert, setShowCert] = useState(false);

    const handlePrint = () => {
        window.print();
    };

    if (!showCert) {
        return (
            <div className="min-h-screen bg-[#F0F4F8] flex flex-col items-center justify-center p-4 selection:bg-yellow-200">
                <div className="max-w-md w-full bg-white border-2 border-black rounded-3xl p-8 shadow-[8px_8px_0px_#000]">
                    <div className="flex justify-center mb-6">
                        <div className="bg-yellow-400 p-4 rounded-full border-2 border-black shadow-[4px_4px_0px_#000]">
                            <Award className="w-10 h-10 text-black" strokeWidth={2} />
                        </div>
                    </div>

                    <h1 className="text-3xl font-black mb-4 text-center text-black uppercase tracking-tight">Mission Complete!</h1>
                    <p className="mb-8 text-center text-gray-600 font-medium">
                        You've mastered the defense systems. Enter your name to certify your achievement.
                    </p>

                    <div className="relative mb-8">
                        <PenTool className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            className="w-full pl-12 pr-4 py-4 rounded-xl text-black text-lg border-2 border-black font-bold focus:ring-4 ring-yellow-400/50 outline-none transition-all placeholder:font-normal"
                        />
                    </div>

                    <Button
                        onClick={() => { if (name.trim()) setShowCert(true); }}
                        disabled={!name.trim()}
                        className="w-full bg-black hover:bg-gray-800 text-white px-6 py-4 rounded-xl text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_#888] active:shadow-none active:translate-y-1 transition-all flex justify-center items-center gap-2"
                    >
                        Generate Certificate
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#E5E5E5] flex flex-col items-center justify-center p-4 md:p-8 print:p-0 print:bg-white">

            {/* CERTIFICATE CONTAINER */}
            <div className="max-w-5xl w-full bg-[#FFFAFA] relative overflow-hidden shadow-2xl print:shadow-none">

                {/* Decorative Frame */}
                <div className="p-2 bg-black print:hidden">
                    <div className="border-4 border-yellow-500 p-1">
                        <div className="border-2 border-white p-1"></div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="p-12 md:p-16 border-[16px] border-double border-gray-900 mx-auto bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] relative">

                    {/* Corner Ornaments */}
                    <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-yellow-600 rounded-tl-3xl opacity-50"></div>
                    <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-yellow-600 rounded-tr-3xl opacity-50"></div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-yellow-600 rounded-bl-3xl opacity-50"></div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-yellow-600 rounded-br-3xl opacity-50"></div>

                    <div className="text-center relative z-10">
                        {/* Header */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-500 uppercase tracking-[0.3em] mb-4">Official Document</h2>
                            <h1 className="text-5xl md:text-7xl font-serif font-black text-black mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Certificate
                            </h1>
                            <p className="text-xl md:text-2xl font-serif italic text-yellow-700">of Achievement</p>
                        </div>

                        <p className="text-lg text-gray-600 mb-8 uppercase tracking-widest font-bold">This is to certify that</p>

                        {/* Name - Dynamic Font */}
                        <div className="mb-12">
                            <h2 className="text-4xl md:text-6xl font-serif text-black border-b-2 border-gray-300 inline-block px-12 pb-4 font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                                {name}
                            </h2>
                        </div>

                        <p className="text-lg text-gray-600 mb-6 uppercase tracking-widest font-bold">Has successfully completed the training in</p>

                        <h3 className="text-3xl md:text-4xl font-black text-black mb-8 uppercase tracking-tight">
                            {title}
                        </h3>

                        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-16 italic font-serif text-lg">
                            "{description}"
                        </p>

                        {/* Signatures & Seal */}
                        <div className="flex flex-col md:flex-row justify-center items-end gap-20 mt-auto border-t-2 border-gray-100 pt-12">

                            <div className="flex flex-col items-center">
                                {/* Refined Premium Seal */}
                                <div className="relative flex items-center justify-center w-24 h-24">
                                    {/* Rosette Background */}
                                    <div className="absolute inset-0 bg-yellow-600 rounded-full shadow-lg"></div>
                                    <div className="absolute inset-1 bg-yellow-500 rounded-full border-2 border-yellow-300 border-dashed animate-spin-slow"></div>

                                    {/* Main Seal Body */}
                                    <div className="absolute inset-3 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full border-2 border-yellow-700 flex items-center justify-center shadow-inner z-10">
                                        <ShieldCheck className="w-10 h-10 text-yellow-900" strokeWidth={2.5} />
                                    </div>

                                    {/* Bottom Ribbons */}
                                    <div className="absolute -bottom-6 flex gap-2 z-0">
                                        <div className="w-6 h-10 bg-yellow-700 transform -skew-x-12 origin-top rounded-b-sm shadow-md border-r border-yellow-800"></div>
                                        <div className="w-6 h-10 bg-yellow-700 transform skew-x-12 origin-top rounded-b-sm shadow-md border-l border-yellow-800"></div>
                                    </div>
                                </div>
                                <div className="text-yellow-900 font-black text-[10px] uppercase tracking-[0.2em] mt-8 bg-yellow-200/50 px-3 py-1 rounded-full border border-yellow-300">Certified</div>
                            </div>

                            <div className="text-center w-48">
                                <div className="font-mono text-lg mb-2">{new Date().toLocaleDateString()}</div>
                                <div className="border-t border-black pt-2 text-xs uppercase tracking-widest font-bold text-gray-500">Date Issued</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 flex flex-col md:flex-row gap-4 print:hidden w-full max-w-xl">
                <Button
                    onClick={handlePrint}
                    className="flex-1 bg-white hover:bg-gray-50 text-black border-2 border-black px-6 py-4 rounded-xl font-bold shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
                >
                    <Printer size={20} /> Print
                </Button>
                <Button
                    onClick={onRestart}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-black px-6 py-4 rounded-xl font-bold shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
                >
                    <RotateCcw size={20} /> Play Again
                </Button>
            </div>
        </div>
    );
}
