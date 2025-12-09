import PropTypes from 'prop-types';
import Button from './Button';
import Badge from './Badge';

function Hero({
    badge = '🚀 Interactive Learning',
    primaryAction,
    className = '',
}) {
    return (
        <section className={`min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-cream relative overflow-hidden ${className}`}>
            {/* Decorative Shapes */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-yellow border-bold rounded-full shadow-pop-sm rotate-12"></div>
            <div className="absolute bottom-32 right-16 w-24 h-24 bg-pink border-bold shadow-pop-sm"></div>
            <div className="absolute top-1/3 right-20 w-16 h-16 bg-teal border-bold rounded-full shadow-pop-sm"></div>
            <div className="absolute bottom-1/4 left-20 w-20 h-20 bg-orange border-bold rotate-45 shadow-pop-sm"></div>

            <div className="relative z-10 max-w-4xl">
                <Badge color="blue" className="mb-8 text-lg">
                    {badge}
                </Badge>

                <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                    <span className="text-blue">Science</span> <br />
                    <span className="text-pink">That Pops!</span>
                </h1>

                <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-black opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
                    Dive into the microscopic battlefield inside you.
                    Interactive stories, drag-and-drop challenges, and zero boring textbooks.
                </p>

                {primaryAction && (
                    <Button color="pink" size="lg" onClick={primaryAction.onClick}>
                        {primaryAction.label} →
                    </Button>
                )}
            </div>
        </section>
    );
}

Hero.propTypes = {
    badge: PropTypes.string,
    primaryAction: PropTypes.shape({
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func,
    }),
    className: PropTypes.string,
};

export default Hero;
