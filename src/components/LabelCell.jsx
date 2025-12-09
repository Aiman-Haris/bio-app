import { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Button from './Button';

export function LabelCell({
    title = "Label the Cell",
    cellImage = "🔬", // Can be emoji or image URL
    labels = [], // { id, text, correctZone }
    zones = [], // { id, name, position: { top, left } }
    onComplete
}) {
    const [placements, setPlacements] = useState({}); // { labelId: zoneId }
    const [draggedLabel, setDraggedLabel] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const handleDragStart = (labelId) => {
        setDraggedLabel(labelId);
    };

    const handleDrop = (zoneId) => {
        if (draggedLabel && !submitted) {
            setPlacements(prev => ({
                ...prev,
                [draggedLabel]: zoneId
            }));
            setDraggedLabel(null);
        }
    };

    const handleSubmit = () => {
        let correct = 0;
        labels.forEach(label => {
            if (placements[label.id] === label.correctZone) {
                correct++;
            }
        });
        setScore(correct);
        setSubmitted(true);

        if (correct === labels.length && onComplete) {
            setTimeout(() => onComplete(), 1500);
        }
    };

    const handleRetry = () => {
        setPlacements({});
        setSubmitted(false);
        setScore(0);
    };

    const unplacedLabels = labels.filter(l => !placements[l.id]);
    const allPlaced = Object.keys(placements).length === labels.length;

    return (
        <div className="card-pop bg-pink p-8">
            <div className="mb-6">
                <span className="badge-pop bg-white text-black mb-4 inline-block">
                    🏷️ Label
                </span>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                    {title}
                </h3>
                <p className="text-white opacity-80 mt-2">Drag labels to the correct spots.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cell Diagram */}
                <div
                    className="relative bg-white border-bold rounded-xl p-6 min-h-[300px]"
                    style={{ aspectRatio: '1' }}
                >
                    {/* Cell representation */}
                    <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-30">
                        {cellImage}
                    </div>

                    {/* Drop Zones */}
                    {zones.map(zone => {
                        const placedLabel = labels.find(l => placements[l.id] === zone.id);
                        const isCorrect = placedLabel && placedLabel.correctZone === zone.id;

                        return (
                            <div
                                key={zone.id}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={() => handleDrop(zone.id)}
                                className={`absolute w-28 h-12 border-3 border-dashed rounded-lg flex items-center justify-center text-sm font-bold transition-all
                                    ${draggedLabel ? 'border-blue bg-blue/20' : 'border-black/30'}
                                    ${submitted && placedLabel ? (isCorrect ? 'border-green bg-green/20' : 'border-red bg-red/20') : ''}
                                `}
                                style={{
                                    top: zone.position.top,
                                    left: zone.position.left
                                }}
                            >
                                {placedLabel ? (
                                    <span className={`px-2 py-1 rounded ${submitted ? (isCorrect ? 'bg-green text-white' : 'bg-red text-white') : 'bg-yellow text-black'}`}>
                                        {placedLabel.text}
                                    </span>
                                ) : (
                                    <span className="text-black/40">{zone.name}</span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Labels Pool */}
                <div className="bg-white/20 rounded-xl p-4">
                    <p className="text-sm font-bold text-white uppercase tracking-wide mb-4">
                        Available Labels
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {unplacedLabels.map(label => (
                            <motion.div
                                key={label.id}
                                draggable={!submitted}
                                onDragStart={() => handleDragStart(label.id)}
                                whileHover={!submitted ? { scale: 1.05, rotate: -2 } : {}}
                                whileTap={!submitted ? { scale: 0.95 } : {}}
                                className={`px-4 py-2 bg-yellow border-bold rounded-lg font-bold shadow-pop-sm
                                    ${submitted ? 'opacity-50' : 'cursor-grab active:cursor-grabbing'}
                                `}
                            >
                                {label.text}
                            </motion.div>
                        ))}
                        {unplacedLabels.length === 0 && !submitted && (
                            <p className="text-white/60 italic">All labels placed!</p>
                        )}
                    </div>

                    {/* Placed labels list for mobile */}
                    {Object.keys(placements).length > 0 && !submitted && (
                        <div className="mt-4 pt-4 border-t border-white/20">
                            <p className="text-sm font-bold text-white uppercase tracking-wide mb-2">
                                Placed
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {labels.filter(l => placements[l.id]).map(label => (
                                    <span key={label.id} className="px-3 py-1 bg-green/50 text-white rounded-lg text-sm font-medium">
                                        {label.text} → {zones.find(z => z.id === placements[label.id])?.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Submit / Feedback */}
            <div className="flex justify-center gap-4 mt-6">
                {!submitted ? (
                    <Button
                        color="white"
                        onClick={handleSubmit}
                        disabled={!allPlaced}
                    >
                        {allPlaced ? 'Check Labels' : `Place all labels (${Object.keys(placements).length}/${labels.length})`}
                    </Button>
                ) : (
                    <div className="text-center">
                        <div className={`badge-pop text-xl mb-4 ${score === labels.length ? 'bg-green text-white' : 'bg-orange text-black'}`}>
                            {score === labels.length ? '🎉 Perfect!' : `${score}/${labels.length} Correct`}
                        </div>
                        {score < labels.length && (
                            <Button color="yellow" onClick={handleRetry}>
                                Try Again
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

LabelCell.propTypes = {
    title: PropTypes.string,
    cellImage: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        correctZone: PropTypes.string.isRequired,
    })).isRequired,
    zones: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        position: PropTypes.shape({
            top: PropTypes.string.isRequired,
            left: PropTypes.string.isRequired,
        }).isRequired,
    })).isRequired,
    onComplete: PropTypes.func,
};
