import React from 'react';

export interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  showPrefix?: boolean;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  children,
  className = '',
  showPrefix = true,
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase text-[#00FF66] bg-[#00FF66]/10 border border-[#00FF66]/25 px-3 py-1 rounded-sm select-none ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
      <span>
        {showPrefix && typeof children === 'string' && !children.startsWith('//')
          ? `// ${children}`
          : children}
      </span>
    </div>
  );
};
