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
        <div className="min-h-screen bg-[#E5E5E5] flex flex-col items-center justify-center p-4 md:p-8 print:p-0 print:bg-white print:block">
            {/* Global Print Styles */}
            <style>
                {`
                @media print {
                    @page {
                        size: auto;
                        margin: 10mm;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .certificate-container {
                        width: 100% !important;
                        max-width: none !important;
                        height: auto !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        transform: scale(0.9) !important;
                        transform-origin: top center !important;
                        box-shadow: none !important;
                    }
                    .action-bar {
                        display: none !important;
                    }
                }
                `}
            </style>

            {/* CERTIFICATE CONTAINER */}
            <div className="max-w-5xl w-full bg-[#FFFAFA] relative overflow-hidden shadow-2xl print:shadow-none certificate-container">
                {/* Decorative Frame */}
                <div className="p-1 bg-black print:p-0.5">
                    <div className="border-[2px] border-yellow-500 p-0.5">
                        <div className="border-[1px] border-white p-0.5"></div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="p-8 md:p-12 border-[12px] border-double border-gray-900 mx-auto bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] relative">

                    {/* Corner Ornaments */}
                    <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-yellow-600 rounded-tl-2xl opacity-50"></div>
                    <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-yellow-600 rounded-tr-2xl opacity-50"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-yellow-600 rounded-bl-2xl opacity-50"></div>
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-yellow-600 rounded-br-2xl opacity-50"></div>

                    <div className="text-center relative z-10">
                        {/* Header */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Official Document</h2>
                            <h1 className="text-4xl md:text-6xl font-serif font-black text-black mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Certificate
                            </h1>
                            <p className="text-lg md:text-xl font-serif italic text-yellow-700">of Achievement</p>
                        </div>

                        <p className="text-sm text-gray-600 mb-6 uppercase tracking-widest font-bold">This is to certify that</p>

                        {/* Name - Dynamic Font */}
                        <div className="mb-8">
                            <h2 className="text-3xl md:text-5xl font-serif text-black border-b-2 border-gray-300 inline-block px-10 pb-2 font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                                {name}
                            </h2>
                        </div>

                        <p className="text-sm text-gray-600 mb-4 uppercase tracking-widest font-bold">Has successfully completed the training in</p>

                        <h3 className="text-2xl md:text-3xl font-black text-black mb-6 uppercase tracking-tight">
                            {title}
                        </h3>

                        <p className="text-gray-600 max-w-xl mx-auto leading-relaxed mb-10 italic font-serif text-base">
                            "{description}"
                        </p>

                        {/* Signatures & Seal */}
                        <div className="flex flex-row justify-center items-end gap-16 mt-auto border-t-2 border-gray-100 pt-8">

                            <div className="flex flex-col items-center">
                                {/* Refined Premium Seal */}
                                <div className="relative flex items-center justify-center w-20 h-20">
                                    {/* Rosette Background */}
                                    <div className="absolute inset-0 bg-yellow-600 rounded-full shadow-lg"></div>
                                    <div className="absolute inset-1 bg-yellow-500 rounded-full border-2 border-yellow-300 border-dashed animate-spin-slow"></div>

                                    {/* Main Seal Body */}
                                    <div className="absolute inset-3 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full border-2 border-yellow-700 flex items-center justify-center shadow-inner z-10">
                                        <ShieldCheck className="w-8 h-8 text-yellow-900" strokeWidth={2.5} />
                                    </div>

                                    {/* Bottom Ribbons */}
                                    <div className="absolute -bottom-4 flex gap-2 z-0">
                                        <div className="w-4 h-8 bg-yellow-700 transform -skew-x-12 origin-top rounded-b-sm shadow-md border-r border-yellow-800"></div>
                                        <div className="w-4 h-8 bg-yellow-700 transform skew-x-12 origin-top rounded-b-sm shadow-md border-l border-yellow-800"></div>
                                    </div>
                                </div>
                                <div className="text-yellow-900 font-black text-[9px] uppercase tracking-[0.2em] mt-6 bg-yellow-200/50 px-2.5 py-1 rounded-full border border-yellow-300">Certified</div>
                            </div>

                            <div className="text-center w-40">
                                <div className="font-mono text-base mb-1">{new Date().toLocaleDateString()}</div>
                                <div className="border-t border-black pt-1 text-[10px] uppercase tracking-widest font-bold text-gray-500">Date Issued</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 flex flex-row gap-4 print:hidden w-full max-w-sm action-bar">
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
