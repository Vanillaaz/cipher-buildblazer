import React, { useState, useEffect } from 'react';
import { PageContainer } from '../layout/PageContainer';
import { SectionHeading } from '../common/SectionHeading';
import { DomainCard } from '../common/DomainCard';
import domainsData from '../../data/domains.json';
import { DomainItem } from '../../types';
import { fetchDomains } from '../../services/dbService';

export const DomainsSection: React.FC = () => {
  const [domains, setDomains] = useState<DomainItem[]>(domainsData as DomainItem[]);

  useEffect(() => {
    fetchDomains().then(setDomains);
  }, []);

  return (
    <section id="domains" className="relative w-full min-h-[calc(100vh-3.5rem)] flex flex-col justify-center py-6 md:py-8 border-t border-[#00FF66]/10 scroll-mt-14 md:scroll-mt-16">
      <PageContainer>
        <SectionHeading
          label="// WHAT WE DO"
          title="Our Domains"
          description="Exploring core pillars of technical excellence, event management, departmental governance, and career readiness."
        />

        {/* 2x2 Desktop Grid, 1-Column Mobile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {domains.map((domain) => (
            <DomainCard key={domain.id} domain={domain} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
};
