import React from 'react';

export interface TerminalBadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'gray' | 'outline';
  className?: string;
}

export const TerminalBadge: React.FC<TerminalBadgeProps> = ({
  children,
  variant = 'green',
  className = '',
}) => {
  const variantStyles = {
    green: 'bg-[#00FF66]/10 text-[#00FF66] border-[#00FF66]/30',
    gray: 'bg-gray-800/50 text-gray-300 border-gray-700/50',
    outline: 'bg-transparent text-gray-400 border-gray-700/60',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs font-mono text-[11px] font-semibold tracking-wider uppercase border select-none ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
};
