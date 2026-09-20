import React, { useRef, useState, useMemo } from 'react';

export interface CipherGlyphWordmarkProps {
  className?: string;
}

const ASCII_CHARSET = [
  'P', ':', '#', '-', '%', 'C', '@', 'H', 'R', 'I', 'E', '+', '*', '=',
  'I', 'C', 'P', 'H', 'E', 'R', 'O', 'X', '1', '0', '$', '&', '/', '\\',
  '|', ';', '.', ':', 'A', 'N', 'T', 'K', 'W', 'M'
];

export const CipherGlyphWordmark: React.FC<CipherGlyphWordmarkProps> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);

  // Generate dense ASCII grid matching the reference CIPHER matrix texture
  const asciiGrid = useMemo(() => {
    const cols = 130;
    const rows = 24;
    const cellW = 7.7;
    const cellH = 9.8;
    const items: Array<{ x: number; y: number; char: string; origChar: string; opacity: number }> = [];

    let seed = 98765;
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const randVal = pseudoRandom();
        const char = ASCII_CHARSET[Math.floor(randVal * ASCII_CHARSET.length)];
        const opacity = 0.55 + pseudoRandom() * 0.45;

        items.push({
          x: c * cellW + 3,
          y: r * cellH + 9,
          char,
          origChar: char,
          opacity,
        });
      }
    }
    return items;
  }, []);

  // Track mouse hover for interactive ASCII wave scramble
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 1000;
    const y = ((e.clientY - rect.top) / rect.height) * 230;
    setHoverPos({ x, y });
  };

  const handleMouseLeave = () => {
    setHoverPos(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-5xl select-none overflow-visible cursor-crosshair ${className}`}
    >
      <svg
        className="w-full h-auto min-h-[140px] sm:min-h-[190px] md:min-h-[250px] drop-shadow-[0_0_25px_rgba(0,255,102,0.85)]"
        viewBox="0 0 1000 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Mask defining the geometric CIPHER letter shapes */}
          <mask id="cipherAsciiMask">
            <rect width="1000" height="230" fill="black" />
            <text
              x="500"
              y="152"
              textAnchor="middle"
              fontFamily="'JetBrains Mono', 'Fira Code', 'Space Grotesk', monospace"
              fontSize="165"
              fontWeight="900"
              letterSpacing="18"
              fill="white"
            >
              CIPHER
            </text>
          </mask>

          {/* Ambient Glow Gradient */}
          <radialGradient id="asciiGlow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#00FF66" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00FF66" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Green Glow */}
        <rect width="1000" height="230" fill="url(#asciiGlow)" opacity="0.7" />

        {/* Dense ASCII Character Field Masked into CIPHER shapes */}
        <g mask="url(#cipherAsciiMask)">
          {asciiGrid.map((item, idx) => {
            let renderChar = item.origChar;
            let renderOpacity = item.opacity;
            let renderColor = '#00FF66';

            if (hoverPos) {
              const dx = item.x - hoverPos.x;
              const dy = item.y - hoverPos.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 120) {
                // Scramble glyph near cursor matching reference screenshot 2
                const scrambleIndex = (idx + Math.floor(dist)) % ASCII_CHARSET.length;
                renderChar = ASCII_CHARSET[scrambleIndex];
                renderOpacity = Math.max(0.3, 1 - dist / 120);
                renderColor = dist < 45 ? '#FFFFFF' : '#00E65C';
              }
            }

            return (
              <text
                key={idx}
                x={item.x}
                y={item.y}
                fontFamily="'JetBrains Mono', monospace"
                fontSize="8.2"
                fontWeight="700"
                fill={renderColor}
                opacity={renderOpacity}
              >
                {renderChar}
              </text>
            );
          })}
        </g>

        {/* Crisp Outlined Text Edge */}
        <text
          x="500"
          y="152"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', 'Fira Code', 'Space Grotesk', monospace"
          fontSize="165"
          fontWeight="900"
          letterSpacing="18"
          fill="none"
          stroke="#00FF66"
          strokeWidth="0.85"
          opacity="0.5"
        >
          CIPHER
        </text>

        {/* Interactive Cursor Target Circle (as seen in media__1789889418385.jpg) */}
        {hoverPos && (
          <g transform={`translate(${hoverPos.x}, ${hoverPos.y})`} className="pointer-events-none">
            <circle r="14" fill="none" stroke="#00FF66" strokeWidth="1" opacity="0.8" />
            <circle r="2.5" fill="#00FF66" opacity="0.9" />
          </g>
        )}
      </svg>
    </div>
  );
};

