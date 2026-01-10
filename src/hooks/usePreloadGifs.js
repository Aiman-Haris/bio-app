import { useEffect, useState } from 'react';
import { storyData } from '../data/storyData';

export function usePreloadGifs() {
    const [preloaded, setPreloaded] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Extract all GIF sources from storyData
        const gifSources = new Set();

        // Check act1
        storyData.act1.forEach(scene => {
            if (scene.gifSrc) gifSources.add(scene.gifSrc);
        });

        // Check cellMediatedPath
        storyData.cellMediatedPath.forEach(scene => {
            if (scene.gifSrc) gifSources.add(scene.gifSrc);
        });

        // Check humoralPath
        storyData.humoralPath.forEach(scene => {
            if (scene.gifSrc) gifSources.add(scene.gifSrc);
        });

        const totalGifs = gifSources.size;
        if (totalGifs === 0) {
            setPreloaded(true);
            return;
        }

        let loadedCount = 0;
        const gifArray = Array.from(gifSources);

        gifArray.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedCount++;
                setProgress(Math.round((loadedCount / totalGifs) * 100));
                if (loadedCount === totalGifs) {
                    setPreloaded(true);
                }
            };
            img.onerror = () => {
                console.error(`Failed to preload GIF: ${src}`);
                loadedCount++;
                if (loadedCount === totalGifs) {
                    setPreloaded(true);
                }
            };
        });
    }, []);

    return { preloaded, progress };
}
