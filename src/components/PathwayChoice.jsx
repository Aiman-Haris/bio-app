import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Swords, FlaskConical, ChevronRight } from 'lucide-react';
import { CellAvatar } from './Characters';

export function PathwayChoice({ text, options, onSelect }) {
    return (
        <div className="max-w-3xl mx-auto text-center">
            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                    Choose Your Path
                </h2>
                <p className="text-white/90 text-xl">{text}</p>
            </motion.div>

            {/* Path options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {options.map((option, index) => {
                    const isCellMediated = option.id === 'cell_mediated';
                    const bgColor = isCellMediated ? '#FF3B30' : '#007AFF';
                    const Icon = isCellMediated ? Swords : FlaskConical;
                    const cellType = isCellMediated ? 'cytotoxicT' : 'bCell';

                    return (
                        <motion.button
                            key={option.id}
                            initial={{ opacity: 0, y: 30, rotate: index === 0 ? -3 : 3 }}
                            animate={{ opacity: 1, y: 0, rotate: 0 }}
                            transition={{
                                delay: 0.3 + index * 0.2,
                                type: 'spring',
                                stiffness: 200
                            }}
                            whileHover={{
                                scale: 1.05,
                                rotate: index === 0 ? -2 : 2,
                                y: -10
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSelect(option.id)}
                            className="relative p-8 rounded-3xl border-4 border-black text-left cursor-pointer"
                            style={{
                                backgroundColor: bgColor,
                                boxShadow: '8px 8px 0 #1C1C1E'
                            }}
                        >
                            {/* Character avatar with WHITE BACKGROUND for visibility */}
                            <div className="flex justify-center mb-6">
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 2,
                                        delay: index * 0.5
                                    }}
                                    className="bg-white rounded-full p-3 border-3 border-black"
                                    style={{ boxShadow: '4px 4px 0 #1C1C1E' }}
                                >
                                    <CellAvatar
                                        type={cellType}
                                        size={80}
                                        mood="excited"
                                    />
                                </motion.div>
                            </div>

                            {/* Icon badge */}
                            <div
                                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white border-3 border-black flex items-center justify-center"
                                style={{ boxShadow: '3px 3px 0 #1C1C1E' }}
                            >
                                <Icon className="w-6 h-6" style={{ color: bgColor }} />
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold text-white mb-3">{option.text}</h3>
                            <p className="text-white/90 mb-4">{option.description}</p>

                            {/* CTA */}
                            <div className="flex items-center gap-2 text-white font-bold">
                                <span>Start Journey</span>
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}

PathwayChoice.propTypes = {
    text: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        description: PropTypes.string,
    })).isRequired,
    onSelect: PropTypes.func.isRequired,
};
