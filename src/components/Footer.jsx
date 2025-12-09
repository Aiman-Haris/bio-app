function Footer() {
    return (
        <footer className="py-12 px-6 bg-black text-white">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink border-2 border-white rounded-xl flex items-center justify-center text-xl">
                        🧬
                    </div>
                    <span className="font-black text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                        Narrative Learning
                    </span>
                </div>

                <p className="text-white/60">
                    © {new Date().getFullYear()} Narrative Education. Making science fun!
                </p>
            </div>
        </footer>
    );
}

export default Footer;
