import { useState, useEffect } from 'react';
import Button from './Button';

function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 ${scrolled ? 'py-3 bg-white border-b-3 border-black shadow-md' : 'py-5 bg-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink border-bold rounded-xl flex items-center justify-center text-xl shadow-pop-sm">
                        🧬
                    </div>
                    <span className="font-black text-xl text-black hidden sm:block" style={{ fontFamily: 'var(--font-display)' }}>
                        Narrative
                    </span>
                </a>

                {/* Links */}
                <div className="hidden md:flex items-center gap-6">
                    <a href="#story" className="font-bold text-black hover:text-pink transition-colors">Story</a>
                    <a href="#challenge-1" className="font-bold text-black hover:text-pink transition-colors">Challenges</a>
                    <a href="#learn" className="font-bold text-black hover:text-pink transition-colors">Learn</a>
                </div>

                {/* CTA */}
                <Button color="blue" size="sm">
                    Start
                </Button>
            </div>
        </nav>
    );
}

export default Navbar;
