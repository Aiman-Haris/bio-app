import { useEffect, useRef } from 'react';
import anime from 'animejs';
import PropTypes from 'prop-types';
import { cn } from '../logic/utils';
import Badge from './Badge';

const topicColors = {
    cyan: {
        border: '#06b6d4',
        bg: 'rgba(6, 182, 212, 0.08)',
        icon: 'rgba(6, 182, 212, 0.15)',
    },
    emerald: {
        border: '#10b981',
        bg: 'rgba(16, 185, 129, 0.08)',
        icon: 'rgba(16, 185, 129, 0.15)',
    },
    violet: {
        border: '#8b5cf6',
        bg: 'rgba(139, 92, 246, 0.08)',
        icon: 'rgba(139, 92, 246, 0.15)',
    },
    amber: {
        border: '#f59e0b',
        bg: 'rgba(245, 158, 11, 0.08)',
        icon: 'rgba(245, 158, 11, 0.15)',
    },
    rose: {
        border: '#f43f5e',
        bg: 'rgba(244, 63, 94, 0.08)',
        icon: 'rgba(244, 63, 94, 0.15)',
    },
};

function TopicCard({
    icon,
    title,
    description,
    badge,
    color = 'cyan',
    items = [],
    index = 0,
    className,
}) {
    const cardRef = useRef(null);
    const itemsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        anime({
                            targets: cardRef.current,
                            opacity: [0, 1],
                            translateX: [index % 2 === 0 ? -50 : 50, 0],
                            easing: 'easeOutExpo',
                            duration: 800,
                            delay: index * 150,
                        });

                        if (itemsRef.current) {
                            anime({
                                targets: itemsRef.current.children,
                                opacity: [0, 1],
                                translateX: [-20, 0],
                                delay: anime.stagger(80, { start: 300 + index * 150 }),
                                easing: 'easeOutExpo',
                                duration: 600,
                            });
                        }

                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, [index]);

    const colorStyle = topicColors[color];

    return (
        <div
            ref={cardRef}
            className={cn(
                'relative p-8 rounded-3xl opacity-0 overflow-hidden',
                'transition-all duration-300',
                'hover:shadow-xl hover:-translate-y-1',
                className
            )}
            style={{
                background: colorStyle.bg,
                borderLeft: `4px solid ${colorStyle.border}`,
            }}
        >
            {/* Icon Background */}
            <div
                className="absolute top-4 right-4 w-24 h-24 rounded-full flex items-center justify-center"
                style={{ background: colorStyle.icon }}
            >
                <span className="text-4xl">{icon}</span>
            </div>

            {/* Header */}
            <div className="mb-6">
                {badge && (
                    <Badge variant={color} size="sm" className="mb-3">
                        {badge}
                    </Badge>
                )}
                <h3
                    className="text-2xl font-bold pr-20"
                    style={{ color: 'var(--text-primary)' }}
                >
                    {title}
                </h3>
                <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
                    {description}
                </p>
            </div>

            {/* Items List */}
            {items.length > 0 && (
                <ul ref={itemsRef} className="space-y-3">
                    {items.map((item, i) => (
                        <li
                            key={i}
                            className="flex items-start gap-3 p-3 rounded-xl opacity-0"
                            style={{
                                background: 'var(--bg-surface)',
                                boxShadow: 'var(--shadow-sm)',
                            }}
                        >
                            <span
                                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                                style={{ background: colorStyle.border }}
                            >
                                {i + 1}
                            </span>
                            <div>
                                <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                                    {item.title}
                                </p>
                                {item.description && (
                                    <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

TopicCard.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    badge: PropTypes.string,
    color: PropTypes.oneOf(['cyan', 'emerald', 'violet', 'amber', 'rose']),
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
        })
    ),
    index: PropTypes.number,
    className: PropTypes.string,
};

export default TopicCard;
