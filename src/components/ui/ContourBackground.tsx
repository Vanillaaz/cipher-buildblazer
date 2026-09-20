import React from 'react';

export interface ContourBackgroundProps {
  opacity?: number;
  className?: string;
}

export const ContourBackground: React.FC<ContourBackgroundProps> = ({
  opacity = 0.42,
  className = '',
}) => {
  // Array of Y offsets to generate continuous dense topographic contours
  const lines = Array.from({ length: 32 }, (_, i) => i);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <svg
        className="w-full h-full animate-contour-flow"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Dense Organic Topographic Contour Wave Field matching reference image */}
        <g stroke="#00FF66" strokeWidth="0.85">
          {lines.map((i) => {
            const yOffset = i * 28 - 40;
            const amp1 = 80 + (i % 5) * 15;
            const amp2 = -60 - (i % 3) * 20;
            const lineOpacity = 0.35 + ((i * 7) % 55) / 100;
            const isDashed = i % 7 === 0;

            return (
              <path
                key={i}
                d={`M -100 ${yOffset} C 250 ${yOffset + amp1}, 500 ${yOffset + amp2}, 720 ${yOffset + amp1 * 0.7} C 940 ${yOffset + amp2 * 0.8}, 1190 ${yOffset + amp1}, 1540 ${yOffset}`}
                opacity={lineOpacity}
                strokeDasharray={isDashed ? '4 6' : undefined}
                strokeWidth={i % 4 === 0 ? '1.1' : '0.8'}
              />
            );
          })}
        </g>

        {/* Central Radial Gradient Overlay for crisp text contrast */}
        <radialGradient
          id="heroContourOverlay"
          cx="50%"
          cy="40%"
          r="65%"
        >
          <stop offset="0%" stopColor="#050806" stopOpacity="0.25" />
          <stop offset="65%" stopColor="#050806" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#050806" stopOpacity="0.95" />
        </radialGradient>
        <rect width="100%" height="100%" fill="url(#heroContourOverlay)" />
      </svg>
    </div>
  );
};

