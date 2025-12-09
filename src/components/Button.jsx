import PropTypes from 'prop-types';

function Button({
    children,
    onClick,
    color = 'blue',
    size = 'md',
    className = '',
    disabled = false,
    fullWidth = false,
    ...props
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

    // Fixed consistent sizes
    const sizeMap = {
        sm: 'h-10 px-5 text-sm',
        md: 'h-12 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                btn-pop 
                ${colorMap[color]} 
                ${sizeMap[size]} 
                ${fullWidth ? 'w-full' : ''} 
                ${disabled ? 'opacity-50 cursor-not-allowed !transform-none !shadow-none' : ''} 
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    color: PropTypes.oneOf(['blue', 'red', 'orange', 'yellow', 'green', 'teal', 'pink', 'white', 'black']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
};

export default Button;
