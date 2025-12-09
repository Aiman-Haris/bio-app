import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export function PathwayChooser({
    title = "Choose Your Path",
    subtitle = "Select which immune response to explore",
    options = [], // { id, icon, title, description, color }
    onSelect
}) {
    return (
        <div className="text-center py-12">
            <h2 className="text-4xl font-black text-black mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                {title}
            </h2>
            <p className="text-lg text-black/70 mb-10">{subtitle}</p>

            <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-4xl mx-auto">
                {options.map((option) => (
                    <motion.button
                        key={option.id}
                        onClick={() => onSelect && onSelect(option.id)}
                        whileHover={{ scale: 1.03, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 card-pop ${option.color || 'bg-white'} p-8 text-center cursor-pointer`}
                    >
                        <div className="text-7xl mb-4">{option.icon}</div>
                        <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                            {option.title}
                        </h3>
                        <p className="text-base opacity-80">
                            {option.description}
                        </p>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}

PathwayChooser.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        color: PropTypes.string,
    })).isRequired,
    onSelect: PropTypes.func,
};
