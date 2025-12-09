/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                accent: 'var(--color-accent)',
                dark: 'var(--color-dark)',
                light: 'var(--color-light)',
                // Vibrant Palette
                'vib-blue': 'var(--vib-blue)',
                'vib-red': 'var(--vib-red)',
                'vib-yellow': 'var(--vib-yellow)',
                'vib-green': 'var(--vib-green)',
                'vib-orange': 'var(--vib-orange)',
                'vib-pink': 'var(--vib-pink)',
                'vib-cyan': 'var(--vib-cyan)',
                'bg-page': 'var(--bg-page)',
            },
            fontFamily: {
                display: 'var(--font-display)',
                body: 'var(--font-body)',
            },
            boxShadow: {
                'hard': 'var(--shadow-hard)',
                'hover': 'var(--shadow-hover)',
            },
            borderWidth: {
                '3': '3px',
            }
        },
    },
    plugins: [],
}
