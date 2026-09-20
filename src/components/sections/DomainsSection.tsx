import React from 'react';
import { PageContainer } from '../layout/PageContainer';
import { SectionHeading } from '../common/SectionHeading';
import { DomainCard } from '../common/DomainCard';
import domainsData from '../../data/domains.json';
import { DomainItem } from '../../types';

export const DomainsSection: React.FC = () => {
  const domains: DomainItem[] = domainsData as DomainItem[];

  return (
    <section id="domains" className="relative w-full py-16 md:py-24 border-t border-[#00FF66]/10">
      <PageContainer>
        <SectionHeading
          label="// WHAT WE DO"
          title="Our Domains"
          description="Exploring core pillars of technical excellence, event management, departmental governance, and career readiness."
        />

        {/* 2x2 Desktop Grid, 1-Column Mobile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {domains.map((domain) => (
            <DomainCard key={domain.id} domain={domain} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
};
