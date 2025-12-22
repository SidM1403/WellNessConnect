
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const VariableProximity = ({
    label,
    fromFontVariationSettings = "'wght' 400, 'opsz' 9",
    toFontVariationSettings = "'wght' 900, 'opsz' 40",
    containerRef,
    radius = 50,
    falloff = 'linear', // 'linear' | 'exponential' | 'gaussian'
    className = '',
    onClick,
}) => {
    const [letterSettings, setLetterSettings] = useState([]);
    const textRef = useRef(null);

    useEffect(() => {
        if (!textRef.current || !containerRef.current) return;

        const container = containerRef.current;

        // Parse the font variation settings string into an object/map for easier interpolation
        // Example: "'wght' 400, 'opsz' 9" -> { wght: 400, opsz: 9 }
        const parseSettings = (settingsStr) => {
            const settings = new Map();
            settingsStr.split(',').forEach(s => {
                const [key, value] = s.trim().split(' ');
                if (key && value) {
                    settings.set(key.replace(/['"]/g, ''), parseFloat(value));
                }
            });
            return settings;
        };

        const fromSettings = parseSettings(fromFontVariationSettings);
        const toSettings = parseSettings(toFontVariationSettings);

        // Create initial state for each letter
        setLetterSettings(
            label.split('').map(() => fromFontVariationSettings)
        );

        const handleMouseMove = (e) => {
            if (!textRef.current) return;

            const rects = Array.from(textRef.current.children).map(child =>
                child.getBoundingClientRect()
            );

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const newSettings = rects.map((rect) => {
                const letterCenterX = rect.left + rect.width / 2;
                const letterCenterY = rect.top + rect.height / 2;

                const distance = Math.sqrt(
                    Math.pow(mouseX - letterCenterX, 2) + Math.pow(mouseY - letterCenterY, 2)
                );

                if (distance > radius) return fromFontVariationSettings;

                // Calculate interpolation factor (0 to 1)
                // 0 means at center (max effect), 1 means at radius (no effect)
                let factor = 1 - (distance / radius);

                // Apply falloff
                if (falloff === 'exponential') factor = Math.pow(factor, 2);
                if (falloff === 'gaussian') factor = Math.exp(-Math.pow(distance / (radius / 2), 2));

                // Interpolate individual settings
                let currentSettingsStr = [];
                fromSettings.forEach((startVal, key) => {
                    const endVal = toSettings.get(key);
                    if (endVal !== undefined) {
                        const currentVal = startVal + (endVal - startVal) * factor;
                        currentSettingsStr.push(`'${key}' ${currentVal.toFixed(2)}`);
                    }
                });

                return currentSettingsStr.join(', ');
            });

            setLetterSettings(newSettings);
        };

        const handleMouseLeave = () => {
            setLetterSettings(label.split('').map(() => fromFontVariationSettings));
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('scroll', handleMouseMove); // Update on scroll too

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('scroll', handleMouseMove);
        };
    }, [label, containerRef, fromFontVariationSettings, toFontVariationSettings, radius, falloff]);

    return (
        <span
            ref={textRef}
            className={`inline-block whitespace-nowrap ${className}`}
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        >
            {label.split('').map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block transition-all duration-75"
                    style={{
                        fontVariationSettings: letterSettings[i] || fromFontVariationSettings,
                        // Fallback for browsers that don't support variable fonts fully or for non-variable fonts
                        // We map weight to standard values if possible, but fontVariationSettings is key
                        fontWeight: letterSettings[i]?.includes("'wght'")
                            ? Math.round(parseFloat(letterSettings[i].match(/'wght'\s+(\d+\.?\d*)/)?.[1] || 400))
                            : undefined
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    );
};

export default VariableProximity;
