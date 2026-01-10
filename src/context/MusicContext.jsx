import { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';

// Synthesized music using Web Audio API - No external files needed!
class MusicSynthesizer {
    constructor() {
        this.audioContext = null;
        this.currentNodes = [];
        this.isPlaying = false;
        this.currentMood = null;
        this.masterGain = null;
    }

    init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            this.masterGain.gain.value = 0.15;
        }
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    // Create a simple oscillator-based ambient pad
    createAmbientPad(frequency, detune = 0) {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.value = frequency;
        osc.detune.value = detune;

        filter.type = 'lowpass';
        filter.frequency.value = 800;
        filter.Q.value = 1;

        gain.gain.value = 0;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        return { osc, gain, filter };
    }

    // Beach/Vacation mood - relaxed tropical arpeggio
    playBeachMood() {
        this.stop();
        this.init();

        // Relaxed major arpeggio - like waves on a beach
        const baseNotes = [392.00, 493.88, 587.33, 783.99, 587.33, 493.88]; // G B D G D B
        let noteIndex = 0;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        osc.type = 'sine'; // Smooth, warm
        osc.frequency.value = baseNotes[0];
        filter.type = 'lowpass';
        filter.frequency.value = 1500;
        gain.gain.value = 0.05;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        osc.start();

        this.currentNodes.push({ osc, gain, filter });

        // Warm pad underneath
        const padNotes = [196.00, 246.94, 293.66]; // G3, B3, D4
        const pads = padNotes.map((freq, i) => this.createAmbientPad(freq, i * 2));
        pads.forEach(pad => {
            pad.osc.start();
            pad.gain.gain.setTargetAtTime(0.03, this.audioContext.currentTime, 0.8);
            pad.filter.frequency.value = 800;
            this.currentNodes.push(pad);
        });

        // Slow, relaxed arpeggio - like gentle waves
        const arpeggiate = () => {
            if (!this.isPlaying || this.currentMood !== 'beach') return;

            noteIndex = (noteIndex + 1) % baseNotes.length;
            osc.frequency.setTargetAtTime(baseNotes[noteIndex], this.audioContext.currentTime, 0.1);

            gain.gain.setTargetAtTime(0.06, this.audioContext.currentTime, 0.05);
            gain.gain.setTargetAtTime(0.04, this.audioContext.currentTime + 0.2, 0.2);

            setTimeout(arpeggiate, 600); // Slower, more relaxed
        };
        setTimeout(arpeggiate, 600);

        this.modulateGain(pads, 5, 0.02, 0.04);

        this.isPlaying = true;
        this.currentMood = 'beach';
    }

    // Tense/Panicky mood - anxious minor arpeggio
    playTenseMood() {
        this.stop();
        this.init();

        // Minor key arpeggio - unsettling but musical
        const baseNotes = [329.63, 392.00, 493.88, 392.00, 329.63, 293.66]; // E G B G E D pattern
        let noteIndex = 0;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.value = baseNotes[0];
        filter.type = 'lowpass';
        filter.frequency.value = 1800;
        gain.gain.value = 0.05;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        osc.start();

        this.currentNodes.push({ osc, gain, filter });

        // Darker pad underneath
        const padNotes = [164.81, 196.00, 246.94]; // E3, G3, B3 (E minor)
        const pads = padNotes.map((freq, i) => this.createAmbientPad(freq, i * 5 - 5));
        pads.forEach(pad => {
            pad.osc.start();
            pad.gain.gain.setTargetAtTime(0.025, this.audioContext.currentTime, 0.4);
            pad.filter.frequency.value = 600;
            this.currentNodes.push(pad);
        });

        // Faster, more anxious arpeggio
        const arpeggiate = () => {
            if (!this.isPlaying || this.currentMood !== 'tense') return;

            noteIndex = (noteIndex + 1) % baseNotes.length;
            osc.frequency.setTargetAtTime(baseNotes[noteIndex], this.audioContext.currentTime, 0.03);

            // Sharper attack for urgency
            gain.gain.setTargetAtTime(0.07, this.audioContext.currentTime, 0.01);
            gain.gain.setTargetAtTime(0.04, this.audioContext.currentTime + 0.1, 0.08);

            setTimeout(arpeggiate, 280); // Faster = more anxious
        };
        setTimeout(arpeggiate, 280);

        this.modulateGain(pads, 2, 0.015, 0.035);

        this.isPlaying = true;
        this.currentMood = 'tense';
    }

    // Action/Battle mood - energetic
    playBattleMood() {
        this.stop();
        this.init();

        const notes = [65.41, 98.00, 130.81, 164.81]; // Low power chord
        const pads = notes.map((freq, i) => this.createAmbientPad(freq, i * 2));

        pads.forEach(pad => {
            pad.osc.start();
            pad.gain.gain.setTargetAtTime(0.07, this.audioContext.currentTime, 0.2);
            pad.filter.frequency.value = 1000;
            this.currentNodes.push(pad);
        });

        this.modulateGain(pads, 2, 0.03, 0.08);

        this.isPlaying = true;
        this.currentMood = 'battle';
    }

    // Menu mood - BRIGHT, cheerful, with arpeggio
    playMenuMood() {
        this.stop();
        this.init();

        // Create a musical arpeggio that cycles through notes
        const baseNotes = [523.25, 659.25, 783.99, 1046.50, 783.99, 659.25]; // C E G C G E pattern
        let noteIndex = 0;

        // Create single oscillator for arpeggio
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.value = baseNotes[0];
        filter.type = 'lowpass';
        filter.frequency.value = 2500;
        gain.gain.value = 0.06;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        osc.start();

        this.currentNodes.push({ osc, gain, filter });

        // Also add a soft pad underneath
        const padNotes = [261.63, 329.63, 392.00]; // C4, E4, G4
        const pads = padNotes.map((freq, i) => this.createAmbientPad(freq, i * 2));
        pads.forEach(pad => {
            pad.osc.start();
            pad.gain.gain.setTargetAtTime(0.025, this.audioContext.currentTime, 0.5);
            pad.filter.frequency.value = 1200;
            this.currentNodes.push(pad);
        });

        // Arpeggio timing - cycle through notes
        const arpeggiate = () => {
            if (!this.isPlaying || this.currentMood !== 'menu') return;

            noteIndex = (noteIndex + 1) % baseNotes.length;
            osc.frequency.setTargetAtTime(baseNotes[noteIndex], this.audioContext.currentTime, 0.05);

            // Slight volume pulse on each note
            gain.gain.setTargetAtTime(0.07, this.audioContext.currentTime, 0.02);
            gain.gain.setTargetAtTime(0.05, this.audioContext.currentTime + 0.1, 0.1);

            setTimeout(arpeggiate, 400); // Note every 400ms
        };
        setTimeout(arpeggiate, 400);

        // Gentle pad modulation
        this.modulateGain(pads, 4, 0.015, 0.03);

        this.isPlaying = true;
        this.currentMood = 'menu';
    }

    // Gentle volume modulation for organic feel
    modulateGain(pads, period, min, max) {
        if (!this.audioContext) return;

        const modulate = () => {
            if (!this.isPlaying) return;

            pads.forEach((pad, i) => {
                const offset = (i / pads.length) * Math.PI * 2;
                const value = min + (max - min) * (0.5 + 0.5 * Math.sin(Date.now() / 1000 / period + offset));
                pad.gain.gain.setTargetAtTime(value, this.audioContext.currentTime, 0.1);
            });

            requestAnimationFrame(modulate);
        };
        modulate();
    }

    stop() {
        this.currentNodes.forEach(node => {
            try {
                node.gain.gain.setTargetAtTime(0, this.audioContext?.currentTime || 0, 0.3);
                setTimeout(() => {
                    node.osc.stop();
                    node.osc.disconnect();
                }, 500);
            } catch (e) { }
        });
        this.currentNodes = [];
        this.isPlaying = false;
        this.currentMood = null;
    }

    setVolume(vol) {
        if (this.masterGain) {
            this.masterGain.gain.setTargetAtTime(vol, this.audioContext.currentTime, 0.1);
        }
    }
}

// Singleton synthesizer
const synthesizer = new MusicSynthesizer();

// Scene to mood mapping
const SCENE_MOOD_MAP = {
    'restaurant': 'beach',
    'sick': 'tense',
    'hospital': 'tense',
    'bloodstream': 'battle',
    'lymphnode': 'battle',
    'default': 'battle',
};

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentMood, setCurrentMood] = useState(null);
    const [muted, setMuted] = useState(false);

    // Play music for a specific mood
    const playMood = useCallback((mood) => {
        if (muted) return;
        if (currentMood === mood && isPlaying) return;

        switch (mood) {
            case 'beach':
                synthesizer.playBeachMood();
                break;
            case 'tense':
                synthesizer.playTenseMood();
                break;
            case 'battle':
                synthesizer.playBattleMood();
                break;
            case 'menu':
                synthesizer.playMenuMood();
                break;
            default:
                synthesizer.playBattleMood();
        }
        setIsPlaying(true);
        setCurrentMood(mood);
    }, [currentMood, isPlaying, muted]);

    // Play music based on scene background
    const playForScene = useCallback((background) => {
        const mood = SCENE_MOOD_MAP[background] || SCENE_MOOD_MAP['default'];
        playMood(mood);
    }, [playMood]);

    // Stop music
    const stop = useCallback(() => {
        synthesizer.stop();
        setIsPlaying(false);
        setCurrentMood(null);
    }, []);

    // Toggle mute
    const toggleMute = useCallback(() => {
        if (muted) {
            setMuted(false);
            synthesizer.setVolume(0.15);
        } else {
            setMuted(true);
            synthesizer.setVolume(0);
        }
    }, [muted]);

    // Set volume
    const setVolume = useCallback((vol) => {
        synthesizer.setVolume(vol);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            synthesizer.stop();
        };
    }, []);

    const value = {
        playMood,
        playForScene,
        stop,
        toggleMute,
        setVolume,
        isPlaying,
        isMuted: muted,
        currentMood,
    };

    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    );
}

export function useMusic() {
    const context = useContext(MusicContext);
    if (!context) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
}

export default MusicProvider;
