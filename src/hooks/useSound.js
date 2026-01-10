import { useRef, useCallback, useEffect } from 'react';

// Sound file paths
const SOUNDS = {
    click: '/sounds/click.wav',
    correct: '/sounds/correct.wav',
    wrong: '/sounds/wrong.wav',
};

// Global audio instances (singleton pattern for performance)
const audioCache = {};

// Initialize audio instances
Object.keys(SOUNDS).forEach(key => {
    audioCache[key] = new Audio(SOUNDS[key]);
    audioCache[key].preload = 'auto';
});

// Background music singleton
let bgmAudio = null;
let bgmPlaying = false;

export function useSound() {
    const enabledRef = useRef(true);

    const play = useCallback((soundName, volume = 0.5) => {
        if (!enabledRef.current) return;

        const audio = audioCache[soundName];
        if (!audio) {
            console.warn(`Sound "${soundName}" not found`);
            return;
        }

        const soundClone = audio.cloneNode();
        soundClone.volume = volume;
        soundClone.play().catch(err => {
            console.debug('Audio play prevented:', err);
        });
    }, []);

    const setEnabled = useCallback((enabled) => {
        enabledRef.current = enabled;
    }, []);

    return { play, setEnabled };
}

// Separate hook for background music
export function useBackgroundMusic(src, options = {}) {
    const { volume = 0.3, loop = true, autoPlay = false } = options;
    const audioRef = useRef(null);

    useEffect(() => {
        if (!src) return;

        // Reuse or create audio element
        if (!bgmAudio || bgmAudio.src !== src) {
            bgmAudio = new Audio(src);
            bgmAudio.loop = loop;
            bgmAudio.volume = volume;
            bgmAudio.preload = 'auto';
        }
        audioRef.current = bgmAudio;

        return () => {
            // Don't stop on unmount - let it play across scenes
        };
    }, [src, loop, volume]);

    const playMusic = useCallback(() => {
        if (audioRef.current && !bgmPlaying) {
            audioRef.current.play().then(() => {
                bgmPlaying = true;
            }).catch(err => {
                console.debug('BGM autoplay prevented:', err);
            });
        }
    }, []);

    const stopMusic = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            bgmPlaying = false;
        }
    }, []);

    const setVolume = useCallback((vol) => {
        if (audioRef.current) {
            audioRef.current.volume = Math.max(0, Math.min(1, vol));
        }
    }, []);

    return { playMusic, stopMusic, setVolume, isPlaying: bgmPlaying };
}

export default useSound;
