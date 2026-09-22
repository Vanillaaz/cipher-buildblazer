import React, { useState, useEffect } from 'react';
import { PageContainer } from '../layout/PageContainer';
import { SectionHeading } from '../common/SectionHeading';
import { EventCard } from '../common/EventCard';
import { EventModal } from '../common/EventModal';
import { EventItem } from '../../types/event';
import eventsData from '../../data/events.json';
import { fetchEvents } from '../../services/dbService';

export const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>(eventsData as EventItem[]);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  useEffect(() => {
    const loadEvents = () => {
      fetchEvents().then(setEvents);
    };

    loadEvents();

    window.addEventListener('focus', loadEvents);
    window.addEventListener('storage', loadEvents);

    return () => {
      window.removeEventListener('focus', loadEvents);
      window.removeEventListener('storage', loadEvents);
    };
  }, []);

  const categories = ['ALL', ...Array.from(new Set(events.map((e) => e.category.toUpperCase())))];

  const filteredEvents =
    activeCategory === 'ALL'
      ? events
      : events.filter((e) => e.category.toUpperCase() === activeCategory);

  return (
    <section
      id="events"
      className="relative w-full py-10 md:py-16 border-t border-[#00FF66]/10 scroll-mt-16 overflow-hidden"
    >
      <PageContainer>
        {/* Section Header */}
        <SectionHeading
          label="// ACTIVITIES"
          title="Events &amp; Workshops"
          description="Hands-on technical workshops, competitive prompt engineering hackathons, and departmental galas organized by CIPHER."
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 md:mb-12 font-mono text-xs">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1.5 rounded-xs transition-all uppercase tracking-wider ${
                activeCategory === category
                  ? 'bg-[#00FF66] text-black font-bold shadow-[0_0_15px_rgba(0,255,102,0.4)] border border-[#00FF66]'
                  : 'bg-[#050806] text-gray-300 hover:text-[#00FF66] border border-[#00FF66]/20 hover:border-[#00FF66]/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Event Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onSelect={(evt) => setSelectedEvent(evt)}
            />
          ))}
        </div>
      </PageContainer>

      {/* Event Detail Modal Overlay */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
};
