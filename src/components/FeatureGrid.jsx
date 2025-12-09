import { useEffect, useRef } from 'react';
import anime from 'animejs';
import PropTypes from 'prop-types';
import { cn } from '../logic/utils';

function FeatureGrid({ features, className }) {
    const gridRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        anime({
                            targets: gridRef.current?.children,
                            opacity: [0, 1],
                            translateY: [50, 0],
                            scale: [0.9, 1],
                            delay: anime.stagger(100),
                            easing: 'easeOutExpo',
                            duration: 800,
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (gridRef.current) {
            observer.observe(gridRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={gridRef}
            className={cn(
                'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
                className
            )}
        >
            {features.map((feature, index) => (
                <FeatureItem key={index} {...feature} />
            ))}
        </div>
    );
}

function FeatureItem({ icon, title, description, color = 'primary' }) {
    const iconRef = useRef(null);

    const colorMap = {
        primary: { bg: 'var(--primary-soft)', text: 'var(--primary)' },
        cyan: { bg: 'rgba(6, 182, 212, 0.12)', text: '#06b6d4' },
        emerald: { bg: 'rgba(16, 185, 129, 0.12)', text: '#10b981' },
        amber: { bg: 'rgba(245, 158, 11, 0.12)', text: '#f59e0b' },
        rose: { bg: 'rgba(244, 63, 94, 0.12)', text: '#f43f5e' },
        violet: { bg: 'rgba(139, 92, 246, 0.12)', text: '#8b5cf6' },
    };

    const handleMouseEnter = () => {
        anime({
            targets: iconRef.current,
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
            duration: 600,
            easing: 'easeInOutQuad',
        });
    };

    const style = colorMap[color] || colorMap.primary;

    return (
        <div
            className="group p-6 rounded-2xl opacity-0 transition-all duration-300 hover:shadow-lg cursor-pointer"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}
            onMouseEnter={handleMouseEnter}
        >
            <div
                ref={iconRef}
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors"
                style={{ background: style.bg }}
            >
                <span className="text-2xl" style={{ color: style.text }}>
                    {icon}
                </span>
            </div>
            <h3
                className="text-lg font-bold mb-2 group-hover:text-primary transition-colors"
                style={{ color: 'var(--text-primary)' }}
            >
                {title}
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>{description}</p>
        </div>
    );
}

FeatureGrid.propTypes = {
    features: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            color: PropTypes.string,
        })
    ).isRequired,
    className: PropTypes.string,
};

FeatureItem.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string,
};

export default FeatureGrid;
