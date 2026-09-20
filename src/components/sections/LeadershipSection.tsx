import React from 'react';
import { PageContainer } from '../layout/PageContainer';
import { SectionHeading } from '../common/SectionHeading';
import { TeamCard } from '../common/TeamCard';
import teamData from '../../data/team.json';
import { TeamMember } from '../../types';

export const LeadershipSection: React.FC = () => {
  const teamMembers: TeamMember[] = teamData as TeamMember[];

  return (
    <section id="leadership" className="relative w-full py-16 md:py-24 border-t border-[#00FF66]/10">
      <PageContainer>
        {/* Section Heading with Generous Negative Space */}
        <SectionHeading
          label="// GOVERNANCE"
          title="Leadership Structure"
          description="Student executive council leaders guiding CIPHER CSE Association."
        />

        {/* Leadership Cards Responsive Grid (4 Columns Desktop, 2 Tablet, 1 Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
};
