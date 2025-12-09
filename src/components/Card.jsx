import PropTypes from 'prop-types';

function Card({
    children,
    color = 'white',
    className = '',
    hover = true,
}) {
    const colorMap = {
        blue: 'bg-blue text-white',
        red: 'bg-red text-white',
        orange: 'bg-orange text-black',
        yellow: 'bg-yellow text-black',
        green: 'bg-green text-white',
        teal: 'bg-teal text-black',
        pink: 'bg-pink text-white',
        white: 'bg-white text-black',
    };

    return (
        <div className={`card-pop ${colorMap[color]} ${hover ? '' : '!transform-none !shadow-pop'} ${className}`}>
            {children}
        </div>
    );
}

Card.propTypes = {
    children: PropTypes.node,
    color: PropTypes.oneOf(['blue', 'red', 'orange', 'yellow', 'green', 'teal', 'pink', 'white']),
    className: PropTypes.string,
    hover: PropTypes.bool,
};

export { Card };
