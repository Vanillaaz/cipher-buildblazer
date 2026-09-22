import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '../layout/PageContainer';
import { TechnicalSectionHeading } from '../common/TechnicalSectionHeading';
import { TeamCard } from '../common/TeamCard';
import teamData from '../../data/team.json';
import { TeamMember } from '../../types';
import { fetchTeamMembers } from '../../services/dbService';

export const TeamSection: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(teamData as TeamMember[]);

  useEffect(() => {
    const loadTeam = () => {
      fetchTeamMembers().then(setTeamMembers);
    };

    loadTeam();

    window.addEventListener('focus', loadTeam);
    window.addEventListener('storage', loadTeam);

    return () => {
      window.removeEventListener('focus', loadTeam);
      window.removeEventListener('storage', loadTeam);
    };
  }, []);

  // Duplicated array for seamless infinite continuous linear sliding ticker
  const duplicatedMembers: TeamMember[] = [...teamMembers, ...teamMembers];

  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollTrack = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const scrollAmount = direction === 'left' ? -300 : 300;
    trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Close selection on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMemberId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Continuous Smooth Linear Sliding Animation Loop (RAF)
  useEffect(() => {
    let animationFrameId: number;

    const step = () => {
      if (trackRef.current && !isPaused && selectedMemberId === null) {
        const track = trackRef.current;
        const singleSetWidth = track.scrollWidth / 2;

        track.scrollLeft += 0.8; // Smooth pixel drift per frame

        if (track.scrollLeft >= singleSetWidth) {
          track.scrollLeft -= singleSetWidth; // Seamless infinite loop wrap
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, selectedMemberId]);

  return (
    <section
      id="team"
      className="relative w-full min-h-[calc(100vh-3.5rem)] flex flex-col justify-center py-6 md:py-8 border-t border-[#00FF66]/10 scroll-mt-14 md:scroll-mt-16 overflow-hidden"
    >
      {/* Anchor target alias for backwards compatibility */}
      <div id="leadership" className="absolute -top-16" />

      <PageContainer>
        {/* Section Heading & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <TechnicalSectionHeading
            label="// GOVERNANCE"
            title="Team Structure"
            description="Student executive council leaders guiding CIPHER CSE Association."
            className="mb-0"
          />

          {/* Controls & Track Navigation Buttons */}
          <div className="flex items-center gap-3 font-mono text-xs self-start md:self-end">
            <span className="text-gray-400 hidden sm:inline">
              // CLICK PORTRAIT TO FOCUS
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollTrack('left')}
                aria-label="Scroll left team gallery track"
                className="px-3 py-1.5 bg-[#050806] border border-[#00FF66]/30 hover:border-[#00FF66] text-[#00FF66] rounded-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66]"
              >
                &larr; PREV
              </button>

              <button
                type="button"
                onClick={() => scrollTrack('right')}
                aria-label="Scroll right team gallery track"
                className="px-3 py-1.5 bg-[#050806] border border-[#00FF66]/30 hover:border-[#00FF66] text-[#00FF66] rounded-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66]"
              >
                NEXT &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Continuous Auto-Scroll Gallery Track (Scrollbar Hidden) */}
        <div className="relative w-full py-4">
          <div
            ref={trackRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="flex gap-6 overflow-x-auto no-scrollbar [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-6 px-2 focus-visible:outline-none select-none"
            tabIndex={0}
            aria-label="Team members horizontal continuous gallery track"
          >
            {duplicatedMembers.map((member, index) => (
              <TeamCard
                key={`${member.id}-${index}`}
                member={member}
                isSelected={selectedMemberId === member.id}
                isAnySelected={selectedMemberId !== null}
                onSelect={() =>
                  setSelectedMemberId((prev) => (prev === member.id ? null : member.id))
                }
              />
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
};

export const LeadershipSection = TeamSection;
