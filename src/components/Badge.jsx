import PropTypes from 'prop-types';

function Badge({
    children,
    color = 'blue',
    className = ''
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
        black: 'bg-black text-white',
    };

    return (
        <span className={`badge-pop ${colorMap[color]} ${className}`}>
            {children}
        </span>
    );
}

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.oneOf(['blue', 'red', 'orange', 'yellow', 'green', 'teal', 'pink', 'white', 'black']),
    className: PropTypes.string,
};

export default Badge;
