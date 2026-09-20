import React from 'react';

export interface TerminalTextureProps {
  enabled?: boolean;
  opacity?: number;
  className?: string;
}

export const TerminalTexture: React.FC<TerminalTextureProps> = ({
  enabled = true,
  opacity = 0.04,
  className = '',
}) => {
  if (!enabled) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      {/* Subtle Terminal Grid Lines */}
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 102, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 102, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,255,102,0.02)] to-transparent animate-scanline" />
    </div>
  );
};
