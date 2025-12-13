import NiceAvatar, { genConfig } from 'react-nice-avatar';
import { Ghost, Planet, IceCream, Backpack, Browser, Cat, Mug } from 'react-kawaii';
import { Shield, Swords, Activity, Zap } from 'lucide-react';

// Human character configurations with different expressions for moods
// react-nice-avatar supports: mouthStyle (laugh, smile, peace), eyeStyle (circle, oval, smile)
const baseIvan = {
    sex: 'man',
    faceColor: '#F9C9B6',
    earSize: 'small',
    hairColor: '#1C1C1E',
    hairStyle: 'normal',
    hatStyle: 'none',
    glassesStyle: 'none',
    noseStyle: 'short',
    shirtStyle: 'polo',
    shirtColor: '#007AFF',
    bgColor: '#E8F4FF',
};

const baseDoctor = {
    sex: 'woman',
    faceColor: '#F9C9B6',
    earSize: 'small',
    hairColor: '#1C1C1E',
    hairStyle: 'womanLong',
    hatStyle: 'none',
    glassesStyle: 'round',
    noseStyle: 'short',
    shirtStyle: 'hoody',
    shirtColor: '#00C7BE',
    bgColor: '#E0F7F6',
};

// Generate configs for each mood
export const humanConfigs = {
    ivan: {
        happy: genConfig({ ...baseIvan, eyeStyle: 'circle', mouthStyle: 'smile' }),
        excited: genConfig({ ...baseIvan, eyeStyle: 'smile', mouthStyle: 'laugh' }),
        sick: genConfig({ ...baseIvan, eyeStyle: 'oval', mouthStyle: 'peace' }),
        worried: genConfig({ ...baseIvan, eyeStyle: 'oval', mouthStyle: 'peace' }),
        thinking: genConfig({ ...baseIvan, eyeStyle: 'circle', mouthStyle: 'peace' }),
    },
    doctor: {
        happy: genConfig({ ...baseDoctor, eyeStyle: 'circle', mouthStyle: 'smile' }),
        excited: genConfig({ ...baseDoctor, eyeStyle: 'smile', mouthStyle: 'laugh' }),
        sick: genConfig({ ...baseDoctor, eyeStyle: 'oval', mouthStyle: 'peace' }),
        worried: genConfig({ ...baseDoctor, eyeStyle: 'oval', mouthStyle: 'peace' }),
        thinking: genConfig({ ...baseDoctor, eyeStyle: 'circle', mouthStyle: 'peace' }),
    },
};

// Cell characters using react-kawaii (they already have mood support)
// Added Icon property for visual differentiation of the Ghost shapes
// Cell characters using react-kawaii (they already have mood support)
// Added Icon property for visual differentiation of the Ghost shapes
export const cellCharacters = {
    macrophage: { component: Ghost, color: '#FF9500', Icon: Activity },
    dendritic: { component: Ghost, color: '#FF2D55', Icon: Activity },
    helperT: { component: Ghost, color: '#34C759' }, // Helper T is default/standard
    cytotoxicT: { component: Ghost, color: '#FF3B30', Icon: Swords },
    bCell: { component: Ghost, color: '#007AFF', Icon: Shield },
    pathogen: { component: Planet, color: '#FF3B30', Icon: Zap }, // Changed to Red to blend in better with "active" options or just look vibrant
    phagocyte: { component: Ghost, color: '#00C7BE', Icon: Activity },
};

// Character display names
export const characterNames = {
    ivan: 'Ivan',
    doctor: 'Dr. Chen',
    macrophage: 'Macrophage',
    dendritic: 'Dendritic Cell',
    helperT: 'Helper T Cell',
    cytotoxicT: 'Cytotoxic T Cell',
    bCell: 'B Cell',
    narrator: 'Narrator',
    pathogen: 'Bacteria',
    phagocyte: 'Phagocyte',
};

// Character colors for UI accents
export const characterColors = {
    ivan: '#007AFF',
    doctor: '#00C7BE',
    macrophage: '#FF9500',
    dendritic: '#FF2D55',
    helperT: '#34C759',
    cytotoxicT: '#FF3B30',
    bCell: '#007AFF',
    narrator: '#FFCC00',
    pathogen: '#FF3B30', // Match the new color
    phagocyte: '#00C7BE',
};

// Check if character is human
export const isHumanCharacter = (speaker) => {
    return humanConfigs.hasOwnProperty(speaker);
};

// Check if speaker is narrator (special handling)
export const isNarrator = (speaker) => {
    return speaker === 'narrator';
};

// Detect mood from text content
export const detectMoodFromText = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('!') && (lowerText.includes('amazing') || lowerText.includes('great') || lowerText.includes('excellent'))) {
        return 'excited';
    }
    if (lowerText.includes('don\'t feel') || lowerText.includes('sick') || lowerText.includes('ugh') || lowerText.includes('stomach')) {
        return 'sick';
    }
    if (lowerText.includes('worry') || lowerText.includes('careful')) {
        return 'worried';
    }
    if (lowerText.includes('?')) {
        return 'thinking';
    }
    if (lowerText.includes('!')) {
        return 'excited';
    }
    return 'happy';
};

// Map mood to kawaii mood
const kawaiiMoodMap = {
    happy: 'happy',
    excited: 'excited',
    sick: 'sad',
    worried: 'ko',
    thinking: 'blissful',
};

// Human character avatar with expression support
export function HumanAvatar({ type, size = 150, mood = 'happy' }) {
    const configs = humanConfigs[type];
    if (!configs) return null;

    const config = configs[mood] || configs.happy;

    return (
        <div
            className="rounded-full border-4 border-black overflow-hidden"
            style={{
                width: size,
                height: size,
                boxShadow: '4px 4px 0 #1C1C1E'
            }}
        >
            <NiceAvatar
                style={{ width: size, height: size }}
                {...config}
            />
        </div>
    );
}

// Cell character avatar with mood support
export function CellAvatar({ type, size = 80, mood = 'happy' }) {
    const cellData = cellCharacters[type];
    if (!cellData) {
        return (
            <div className="flex items-center justify-center" style={{ width: size, height: size }}>
                <Ghost size={size * 0.9} mood="happy" color="#FFCC00" />
            </div>
        );
    }

    const CellComponent = cellData.component;
    const kawaiiMood = kawaiiMoodMap[mood] || 'happy';
    const Icon = cellData.Icon;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <CellComponent size={size * 0.9} mood={kawaiiMood} color={cellData.color} />
            {Icon && (
                <div
                    className="absolute bottom-0 right-0 bg-white border-2 border-black rounded-full p-1 shadow-md"
                    style={{ transform: 'scale(0.8)' }}
                >
                    <Icon size={16} color={cellData.color} strokeWidth={3} />
                </div>
            )}
        </div>
    );
}

// Universal character avatar
export function CharacterAvatar({ speaker, size = 80, mood = 'happy' }) {
    if (isNarrator(speaker)) return null; // Narrator has no avatar
    if (isHumanCharacter(speaker)) {
        return <HumanAvatar type={speaker} size={size} mood={mood} />;
    }
    return <CellAvatar type={speaker} size={size} mood={mood} />;
}

// Character card for recruit/selection screens
export function CharacterCard({ speaker, name, description, selected, onClick, disabled }) {
    const bgColor = characterColors[speaker] || '#FFCC00';

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                character-card w-full
                ${selected ? 'ring-4 ring-offset-2' : ''}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            style={{
                '--ring-color': bgColor,
                borderColor: selected ? bgColor : '#1C1C1E',
            }}
        >
            <div className="mb-3">
                <CharacterAvatar speaker={speaker} size={64} mood={selected ? 'excited' : 'happy'} />
            </div>
            <h4 className="font-bold text-sm text-center" style={{ color: bgColor }}>
                {name || characterNames[speaker]}
            </h4>
            {description && (
                <p className="text-xs text-gray-600 text-center mt-1">{description}</p>
            )}
            {selected && (
                <div
                    className="mt-2 px-3 py-1 rounded-full text-white text-xs font-bold"
                    style={{ backgroundColor: bgColor }}
                >
                    ✓ Selected
                </div>
            )}
        </button>
    );
}

// Mini avatar
export function MiniAvatar({ speaker, size = 40, mood = 'happy' }) {
    return <CharacterAvatar speaker={speaker} size={size} mood={mood} />;
}
