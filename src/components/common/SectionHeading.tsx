import React from 'react';
import { SectionLabel } from './SectionLabel';

export interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  description,
  align = 'left',
  className = '',
}) => {
  const alignClasses =
    align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-3 max-w-3xl mb-12 ${alignClasses} ${className}`}>
      {label && <SectionLabel>{label}</SectionLabel>}
      <h2 className="text-h1 font-bold text-white tracking-tight">{title}</h2>
      {description && (
        <p className="text-body text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
