import React from 'react';

export interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  fullWidth?: boolean;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  href,
  target,
  rel,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    px-5 py-2.5 rounded-sm font-mono text-xs md:text-sm font-semibold tracking-wider uppercase
    bg-[#050806]/80 text-[#00FF66] border border-[#00FF66]/35
    hover:border-[#00FF66] hover:bg-[#00FF66]/10 hover:shadow-[0_0_15px_rgba(0,255,102,0.2)]
    active:scale-[0.98]
    transition-all duration-200 ease-in-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080C0A]
    disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none
    select-none cursor-pointer
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${className}
  `;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={baseStyles}
      >
        {children}
      </a>
    );
  }

  return (
    <button disabled={disabled} className={baseStyles} {...props}>
      {children}
    </button>
  );
};
