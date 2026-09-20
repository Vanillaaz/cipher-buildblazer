import React from 'react';

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  id?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = '',
  as: Component = 'section',
  id,
}) => {
  return (
    <Component
      id={id}
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 ${className}`}
    >
      {children}
    </Component>
  );
};
