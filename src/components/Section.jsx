import PropTypes from 'prop-types';
import Badge from './Badge';

function Section({
    children,
    id,
    badge,
    badgeColor = 'orange',
    title,
    subtitle,
    className = '',
    bgColor = 'bg-cream',
}) {
    return (
        <section id={id} className={`section-pop ${bgColor} ${className}`}>
            <div className="max-w-6xl mx-auto">
                {(badge || title) && (
                    <div className="section-header">
                        {badge && (
                            <Badge color={badgeColor} className="mb-4">
                                {badge}
                            </Badge>
                        )}
                        {title && (
                            <h2 className="section-title text-black" style={{ fontFamily: 'var(--font-display)' }}>
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="section-subtitle text-black">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}
                {children}
            </div>
        </section>
    );
}

Section.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    badge: PropTypes.string,
    badgeColor: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    className: PropTypes.string,
    bgColor: PropTypes.string,
};

export default Section;
