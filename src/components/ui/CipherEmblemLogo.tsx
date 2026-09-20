import React from 'react';

export interface CipherEmblemLogoProps {
  className?: string;
  size?: number;
}

export const CipherEmblemLogo: React.FC<CipherEmblemLogoProps> = ({
  className = '',
  size = 44,
}) => {
  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <svg
        width={size * 1.8}
        height={size}
        viewBox="0 0 90 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_15px_rgba(0,255,102,0.7)]"
      >
        {/* Outer Tech Ring / Gear teeth */}
        <circle cx="45" cy="25" r="16" stroke="#00FF66" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />

        {/* Left Winged Feathers */}
        <path
          d="M 32 25 C 22 12, 10 8, 0 10 C 10 16, 20 20, 30 25 C 18 25, 8 28, 4 34 C 14 34, 24 30, 32 27"
          fill="url(#wingGradLeft)"
        />

        {/* Right Winged Feathers */}
        <path
          d="M 58 25 C 68 12, 80 8, 90 10 C 80 16, 70 20, 60 25 C 72 25, 82 28, 86 34 C 76 34, 66 30, 58 27"
          fill="url(#wingGradRight)"
        />

        {/* Central Tech Globe / Core Sphere */}
        <circle cx="45" cy="25" r="13" fill="#0A1820" stroke="#00FF66" strokeWidth="1.5" />
        <ellipse cx="45" cy="25" rx="13" ry="5" stroke="#00FF66" strokeWidth="0.8" opacity="0.9" />
        <ellipse cx="45" cy="25" rx="5" ry="13" stroke="#00FF66" strokeWidth="0.8" opacity="0.9" />
        <circle cx="45" cy="25" r="4" fill="#00FF66" className="animate-pulse" />

        {/* Gradients */}
        <defs>
          <linearGradient id="wingGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FF66" />
            <stop offset="60%" stopColor="#00E65C" />
            <stop offset="100%" stopColor="#080C0A" />
          </linearGradient>
          <linearGradient id="wingGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00FF66" />
            <stop offset="60%" stopColor="#00E65C" />
            <stop offset="100%" stopColor="#080C0A" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
