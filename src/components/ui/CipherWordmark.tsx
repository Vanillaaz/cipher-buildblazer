import React from 'react';

export interface CipherWordmarkProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  showSubtitle?: boolean;
  animated?: boolean;
}

export const CipherWordmark: React.FC<CipherWordmarkProps> = ({
  size = 'hero',
  className = '',
  showSubtitle = false,
  animated = false,
}) => {
  const sizeClasses = {
    sm: 'text-xl md:text-2xl tracking-widest',
    md: 'text-2xl md:text-3xl tracking-widest',
    lg: 'text-4xl md:text-5xl tracking-widest',
    hero: 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.18em]',
  }[size];

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <div className="relative inline-flex items-center group">
        {/* Stable Resolved CIPHER Digital Serif/Monospace Identity */}
        <span
          className={`font-serif font-extrabold text-[#00FF66] drop-shadow-[0_0_25px_rgba(0,255,102,0.85)] ${sizeClasses} ${
            animated ? 'animate-fade-in' : ''
          }`}
        >
          CIPHER
        </span>
      </div>

      {showSubtitle && (
        <span className="font-mono text-xs sm:text-sm text-[#00FF66] tracking-[0.25em] uppercase mt-2 opacity-90 font-semibold drop-shadow-[0_0_10px_rgba(0,255,102,0.4)]">
          CSE ASSOCIATION • SJEC
        </span>
      )}
    </div>
  );
};
