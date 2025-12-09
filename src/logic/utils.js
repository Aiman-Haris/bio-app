import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines clsx and tailwind-merge for optimal class merging
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Color variants for components
 */
export const colorVariants = {
    cyan: {
        bg: 'var(--bg-cyan-soft)',
        border: 'var(--accent-cyan)',
        text: 'var(--accent-cyan)',
    },
    emerald: {
        bg: 'var(--bg-emerald-soft)',
        border: 'var(--accent-emerald)',
        text: 'var(--accent-emerald)',
    },
    rose: {
        bg: 'var(--bg-rose-soft)',
        border: 'var(--accent-rose)',
        text: 'var(--accent-rose)',
    },
    amber: {
        bg: 'var(--bg-amber-soft)',
        border: 'var(--accent-amber)',
        text: 'var(--accent-amber)',
    },
    violet: {
        bg: 'var(--bg-violet-soft)',
        border: 'var(--accent-violet)',
        text: 'var(--accent-violet)',
    },
    sky: {
        bg: 'var(--bg-sky-soft)',
        border: 'var(--accent-sky)',
        text: 'var(--accent-sky)',
    },
};

/**
 * Animation config presets for anime.js
 */
export const animePresets = {
    fadeInUp: {
        opacity: [0, 1],
        translateY: [30, 0],
        easing: 'easeOutExpo',
        duration: 800,
    },
    fadeInScale: {
        opacity: [0, 1],
        scale: [0.9, 1],
        easing: 'easeOutExpo',
        duration: 600,
    },
    staggerCards: {
        opacity: [0, 1],
        translateY: [40, 0],
        delay: (el, i) => i * 100,
        easing: 'easeOutExpo',
        duration: 800,
    },
    bounce: {
        scale: [1, 1.1, 1],
        easing: 'easeInOutQuad',
        duration: 400,
    },
    wiggle: {
        rotate: [0, -3, 3, -3, 3, 0],
        easing: 'easeInOutQuad',
        duration: 500,
    },
};
