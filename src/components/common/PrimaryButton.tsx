import React from 'react';

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  href,
  target,
  rel,
  fullWidth = false,
  isLoading = false,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    px-5 py-2.5 rounded-sm font-mono text-xs md:text-sm font-bold tracking-wider uppercase
    bg-[#00FF66] text-[#050806]
    hover:bg-[#00E65C] hover:shadow-[0_0_20px_rgba(0,255,102,0.4)]
    active:scale-[0.98]
    transition-all duration-200 ease-in-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080C0A]
    disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none
    select-none cursor-pointer
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${className}
  `;

  const content = (
    <>
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-[#050806] border-t-transparent rounded-full animate-spin" />
      ) : null}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={baseStyles}
      >
        {content}
      </a>
    );
  }

  return (
    <button disabled={disabled || isLoading} className={baseStyles} {...props}>
      {content}
    </button>
  );
};
