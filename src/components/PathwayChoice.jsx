import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { Swords, FlaskConical, ChevronRight } from 'lucide-react';
import { CellAvatar } from './Characters';
import QuestionLayout from './QuestionLayout';

export function PathwayChoice({ text, options, onSelect, lives, actName, questionNumber, totalQuestions }) {
    return (
        <QuestionLayout
            actName={actName}
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
            lives={lives}
            character="macrophage"
            reaction="neutral"
        >
            <div className="w-full h-full flex flex-col justify-start pt-2">
                <div className="max-w-4xl mx-auto w-full">
                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 md:mb-6 text-center"
                    >
                        <h2 className="text-xl md:text-3xl font-black text-black mb-2 md:mb-3 uppercase tracking-wide">
                            Choose Your Strategy
                        </h2>
                        <p className="text-black text-sm md:text-lg font-medium max-w-2xl mx-auto leading-relaxed px-2">{text}</p>
                    </motion.div>

                    {/* Path options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full">
                        {options.map((option, index) => {
                            const isCellMediated = option.id === 'cell_mediated';
                            const bgColor = isCellMediated ? '#FF3B30' : '#007AFF';
                            const Icon = isCellMediated ? Swords : FlaskConical;
                            const cellType = isCellMediated ? 'cytotoxicT' : 'bCell';

                            return (
                                <motion.button
                                    key={option.id}
                                    initial={{ opacity: 0, y: 20, rotate: index === 0 ? -2 : 2 }}
                                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                                    transition={{
                                        delay: 0.2 + index * 0.15,
                                        type: 'spring',
                                        stiffness: 200
                                    }}
                                    whileHover={{
                                        scale: 1.03,
                                        rotate: index === 0 ? -1 : 1,
                                        y: -5
                                    }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => onSelect(option.id)}
                                    className="relative p-4 md:p-5 rounded-2xl border-4 border-black text-left cursor-pointer transition-colors"
                                    style={{
                                        backgroundColor: bgColor,
                                        boxShadow: '4px 4px 0 #1C1C1E'
                                    }}
                                >
                                    {/* Character avatar */}
                                    <div className="flex justify-center mb-2 md:mb-4">
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 2,
                                                delay: index * 0.5
                                            }}
                                            className="bg-white rounded-full p-1 md:p-2 border-4 border-black"
                                            style={{ boxShadow: '2px 2px 0 #1C1C1E' }}
                                        >
                                            <CellAvatar
                                                type={cellType}
                                                size={isMobile ? 50 : 70}
                                                mood="excited"
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Icon badge */}
                                    <div
                                        className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-2 border-black flex items-center justify-center"
                                        style={{ boxShadow: '2px 2px 0 #1C1C1E' }}
                                    >
                                        <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: bgColor }} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-lg md:text-xl font-black text-white mb-1 md:mb-2">{option.text}</h3>
                                    <p className="text-white/90 mb-2 md:mb-4 text-xs md:text-sm font-medium leading-snug min-h-[2.5rem] md:min-h-[3rem]">{option.description}</p>

                                    {/* CTA */}
                                    <div className="flex items-center justify-center gap-2 text-black bg-white py-2 rounded-xl border-2 border-black font-black text-xs md:text-sm">
                                        <span>Start Journey</span>
                                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </QuestionLayout>
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
    lives: PropTypes.number,
    actName: PropTypes.string,
    questionNumber: PropTypes.number,
    totalQuestions: PropTypes.number,
};
