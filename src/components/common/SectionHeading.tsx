import React from 'react';
import { TechnicalSectionHeading, SectionHeadingProps } from './TechnicalSectionHeading';

export type { SectionHeadingProps };

export const SectionHeading: React.FC<SectionHeadingProps> = (props) => {
  return <TechnicalSectionHeading {...props} />;
};
