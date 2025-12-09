import PropTypes from 'prop-types';

function StoryCard({
    emoji,
    title,
    description,
    color = 'blue',
    className = '',
}) {
    const colorMap = {
        blue: 'bg-blue text-white',
        red: 'bg-red text-white',
        orange: 'bg-orange text-black',
        yellow: 'bg-yellow text-black',
        green: 'bg-green text-white',
        teal: 'bg-teal text-black',
        pink: 'bg-pink text-white',
    };

    return (
        <div className={`card-pop ${colorMap[color]} ${className}`}>
            <div className="text-5xl mb-4">{emoji}</div>
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                {title}
            </h3>
            <p className="text-base opacity-90">
                {description}
            </p>
        </div>
    );
}

StoryCard.propTypes = {
    emoji: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.oneOf(['blue', 'red', 'orange', 'yellow', 'green', 'teal', 'pink']),
    className: PropTypes.string,
};

export default StoryCard;
