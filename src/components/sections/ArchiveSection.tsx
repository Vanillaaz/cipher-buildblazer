import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '../layout/PageContainer';
import { SectionHeading } from '../common/SectionHeading';
import { ArchiveItem } from '../archive/ArchiveItem';
import { ActivityItem } from '../../types/activity';
import activitiesData from '../../data/activities.json';

export const ArchiveSection: React.FC = () => {
  const activities: ActivityItem[] = activitiesData as ActivityItem[];
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (sectionRef.current) {
              observer.unobserve(sectionRef.current);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredActivities = activities.filter((act) =>
    act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    act.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section
      id="archive"
      ref={sectionRef}
      className="relative w-full py-10 md:py-16 border-t border-[#00FF66]/10 scroll-mt-16 overflow-hidden"
    >
      <PageContainer>
        {/* Section Header */}
        <SectionHeading
          label="// ARCHIVE"
          title="Activities Archive"
          description="A historical repository of technical sessions, hands-on workshops, competitive hackathons, and student initiatives conducted by CIPHER."
        />

        {/* Technical Search Filter */}
        <div className="max-w-md mx-auto mb-10 md:mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH ARCHIVE ACTIVITIES..."
              className="w-full bg-[#050806] border border-[#00FF66]/30 focus:border-[#00FF66] text-[#00FF66] placeholder-gray-500 font-mono text-xs px-4 py-2.5 rounded-xs focus:outline-none focus:ring-1 focus:ring-[#00FF66] transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-[#00FF66]/60 pointer-events-none">
              [🔍]
            </span>
          </div>
        </div>

        {/* Dense Multi-Column Archive Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 transition-all duration-700 ease-out ${
            prefersReducedMotion || isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          {filteredActivities.map((activity, idx) => (
            <ArchiveItem key={activity.id} activity={activity} index={idx} />
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="py-12 font-mono text-xs text-gray-500 text-center">
            // NO ARCHIVE MATCHES FOUND FOR &quot;{searchQuery}&quot;
          </div>
        )}
      </PageContainer>
    </section>
  );
};
