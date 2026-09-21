import React from 'react';

interface BrandLogoProps {
  className?: string;
  isDarkBackground?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  isDarkBackground = false,
  size = 'md',
}) => {
  const textColor = isDarkBackground ? '#FFFFFF' : '#0A0A0A';
  const subColor = isDarkBackground ? 'rgba(255, 255, 255, 0.7)' : '#52525B';

  const heights = {
    sm: 34,
    md: 42,
    lg: 54,
  };

  const h = heights[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 264 96"
        height={h}
        className="w-auto block"
        style={{ height: `${h}px` }}
        aria-label="The Video BY EVHENIA CHIRVA"
      >
        {/* Handwritten Cursive 'The' */}
        <text
          x="4"
          y="52"
          fill={textColor}
          fontSize="48"
          fontStyle="italic"
          style={{ fontFamily: "'Alex Brush', cursive, sans-serif" }}
        >
          The
        </text>

        {/* High-Contrast Serif 'Video' */}
        <text
          x="72"
          y="56"
          fill={textColor}
          fontSize="56"
          fontWeight="300"
          letterSpacing="-1.5"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Video
        </text>

        {/* Uppercase Subtitle 'BY EVHENIA CHIRVA' centered under 'The Video' */}
        <text
          x="132"
          y="84"
          fill={subColor}
          fontSize="12.5"
          fontWeight="600"
          letterSpacing="4"
          textAnchor="middle"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          BY EVHENIA CHIRVA
        </text>
      </svg>
    </div>
  );
};
