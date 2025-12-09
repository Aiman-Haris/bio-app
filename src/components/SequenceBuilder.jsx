import { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import PropTypes from 'prop-types';
import Button from './Button';

export function SequenceBuilder({
    title = "Arrange the Steps",
    steps = [], // { id, text, order } - order is correct position (1-based)
    onComplete
}) {
    // Shuffle steps for initial state
    const [currentSteps, setCurrentSteps] = useState(() =>
        [...steps].sort(() => Math.random() - 0.5)
    );
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleSubmit = () => {
        const correct = currentSteps.every((step, index) => step.order === index + 1);
        setIsCorrect(correct);
        setSubmitted(true);

        if (correct && onComplete) {
            setTimeout(() => onComplete(), 1500);
        }
    };

    const handleRetry = () => {
        setCurrentSteps([...steps].sort(() => Math.random() - 0.5));
        setSubmitted(false);
        setIsCorrect(false);
    };

    return (
        <div className="card-pop bg-teal p-8">
            <div className="mb-6">
                <span className="badge-pop bg-black text-white mb-4 inline-block">
                    🔄 Sequence
                </span>
                <h3 className="text-2xl font-bold text-black" style={{ fontFamily: 'var(--font-display)' }}>
                    {title}
                </h3>
                <p className="text-black opacity-80 mt-2">Drag to reorder the steps correctly.</p>
            </div>

            <Reorder.Group
                axis="y"
                values={currentSteps}
                onReorder={setCurrentSteps}
                className="space-y-3"
            >
                {currentSteps.map((step, index) => {
                    const showResult = submitted;
                    const isStepCorrect = step.order === index + 1;

                    let bgClass = 'bg-yellow';
                    if (showResult) {
                        bgClass = isStepCorrect ? 'bg-green' : 'bg-red';
                    }

                    return (
                        <Reorder.Item key={step.id} value={step} disabled={submitted}>
                            <motion.div
                                className={`p-4 border-bold rounded-xl flex items-center gap-4 shadow-pop-sm
                                    ${bgClass}
                                    ${submitted ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}
                                `}
                                whileHover={!submitted ? { scale: 1.01 } : {}}
                                whileTap={!submitted ? { scale: 0.99 } : {}}
                            >
                                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg border-2 border-white">
                                    {index + 1}
                                </div>
                                <span className={`font-bold ${showResult ? 'text-white' : 'text-black'}`}>
                                    {step.text}
                                </span>
                                {showResult && (
                                    <span className="ml-auto text-2xl">
                                        {isStepCorrect ? '✓' : '✗'}
                                    </span>
                                )}
                            </motion.div>
                        </Reorder.Item>
                    );
                })}
            </Reorder.Group>

            {/* Submit / Feedback */}
            <div className="flex justify-center gap-4 mt-6">
                {!submitted ? (
                    <Button color="black" onClick={handleSubmit}>
                        Check Sequence
                    </Button>
                ) : (
                    <div className="text-center">
                        <div className={`badge-pop text-xl mb-4 ${isCorrect ? 'bg-green text-white' : 'bg-red text-white'}`}>
                            {isCorrect ? '🎉 Perfect Order!' : '❌ Wrong order...'}
                        </div>
                        {!isCorrect && (
                            <Button color="yellow" onClick={handleRetry}>
                                Shuffle & Retry
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

SequenceBuilder.propTypes = {
    title: PropTypes.string,
    steps: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
    })).isRequired,
    onComplete: PropTypes.func,
};
