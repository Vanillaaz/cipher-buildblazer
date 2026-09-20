import React from 'react';

export interface DotMatrixWordmarkProps {
  className?: string;
}

export const DotMatrixWordmark: React.FC<DotMatrixWordmarkProps> = ({
  className = '',
}) => {
  return (
    <div className={`relative w-full max-w-5xl select-none overflow-hidden ${className}`}>
      <svg
        className="w-full h-auto min-h-[140px] sm:min-h-[200px] md:min-h-[260px] drop-shadow-[0_0_25px_rgba(0,255,102,0.7)]"
        viewBox="0 0 1000 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dot Matrix Pattern Fill */}
          <pattern
            id="dotMatrixPattern"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="4" cy="4" r="2.2" fill="#00FF66" opacity="0.9" />
            <circle cx="4" cy="4" r="1" fill="#FFFFFF" opacity="0.7" />
          </pattern>

          {/* Secondary Matrix Grid overlay */}
          <pattern
            id="matrixGridPattern"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <rect width="16" height="16" fill="none" stroke="rgba(0,255,102,0.15)" strokeWidth="0.5" />
            <circle cx="8" cy="8" r="1.5" fill="#00FF66" opacity="0.5" />
          </pattern>

          {/* Glowing Green Shimmer Gradient */}
          <linearGradient id="shimmerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00FF66" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#00E65C" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* Matrix Text Shadow / Ambient Glow Background */}
        <text
          x="0"
          y="180"
          fontFamily="'JetBrains Mono', 'Fira Code', monospace"
          fontSize="175"
          fontWeight="900"
          letterSpacing="18"
          fill="#00FF66"
          opacity="0.15"
          filter="blur(8px)"
        >
          CIPHER
        </text>

        {/* Main Dot Matrix Filled Text */}
        <text
          x="0"
          y="180"
          fontFamily="'JetBrains Mono', 'Fira Code', monospace"
          fontSize="175"
          fontWeight="900"
          letterSpacing="18"
          fill="url(#dotMatrixPattern)"
          stroke="#00FF66"
          strokeWidth="1.5"
          opacity="0.95"
        >
          CIPHER
        </text>

        {/* Overlay Shimmer Line for Dynamic Matrix Wave */}
        <text
          x="0"
          y="180"
          fontFamily="'JetBrains Mono', 'Fira Code', monospace"
          fontSize="175"
          fontWeight="900"
          letterSpacing="18"
          fill="none"
          stroke="url(#shimmerGrad)"
          strokeWidth="0.8"
          strokeDasharray="4 8"
          opacity="0.7"
        >
          CIPHER
        </text>
      </svg>
    </div>
  );
};
