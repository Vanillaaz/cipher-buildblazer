import React from 'react';
import { EventItem } from '../../types/event';

export interface EventCardProps {
  event: EventItem;
  onSelect: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelect }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(event);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(event)}
      onKeyDown={handleKeyDown}
      className="group relative flex flex-col h-full bg-[#080C0A] border border-[#00FF66]/20 hover:border-[#00FF66]/60 rounded-xs overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,102,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66] cursor-pointer"
    >
      {/* Top Technical Header Accent Bar */}
      <div className="absolute top-2 left-2 right-2 z-10 flex items-center justify-between pointer-events-none">
        <span className="font-mono text-[10px] text-[#00FF66] bg-[#050806]/90 border border-[#00FF66]/30 px-2 py-0.5 rounded-xs uppercase tracking-wider backdrop-blur-xs">
          // {event.category}
        </span>
        {event.featured && (
          <span className="font-mono text-[10px] text-black font-bold bg-[#00FF66] px-2 py-0.5 rounded-xs uppercase tracking-wider shadow-[0_0_10px_rgba(0,255,102,0.5)]">
            FEATURED
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#050806]">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover filter contrast-[1.05] brightness-90 group-hover:scale-[1.04] group-hover:brightness-100 transition-all duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/images/about-photo.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C0A] via-transparent to-transparent opacity-80" />

        {/* Technical Corner Brackets */}
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#00FF66]/60" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#00FF66]/60" />
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-5 text-left space-y-3">
        {/* Date & Location Line */}
        <div className="flex items-center justify-between font-mono text-xs text-gray-400">
          <span className="text-[#00FF66] font-semibold">{event.displayDate}</span>
          {event.location && <span className="truncate max-w-[150px] text-gray-400">{event.location}</span>}
        </div>

        {/* Event Title */}
        <h3 className="font-sans font-bold text-lg text-white group-hover:text-[#00FF66] transition-colors leading-snug line-clamp-2">
          {event.title}
        </h3>

        {/* Short Description */}
        <p className="font-sans text-xs text-gray-300 leading-relaxed line-clamp-3 flex-1 opacity-90">
          {event.shortDescription}
        </p>

        {/* Action Affordance */}
        <div className="pt-3 border-t border-[#00FF66]/15 flex items-center justify-between font-mono text-xs text-[#00FF66] group-hover:text-white transition-colors">
          <span className="font-semibold tracking-wider">// VIEW DETAILS</span>
          <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 font-bold">
            &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};
