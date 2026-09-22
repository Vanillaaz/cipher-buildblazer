import React from 'react';
import { TeamMember } from '../../types';

export interface TeamCardProps {
  member: TeamMember;
  isSelected?: boolean;
  onSelect?: () => void;
  isAnySelected?: boolean;
  className?: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  member,
  isSelected = false,
  onSelect,
  isAnySelected = false,
  className = '',
}) => {
  const linkedinUrl = member.linkedin || member.socials?.linkedin;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      aria-expanded={isSelected}
      aria-label={`Select ${member.name}, ${member.role}`}
      className={`group relative flex-shrink-0 w-[240px] sm:w-[260px] snap-start bg-[#0D1410] border rounded-sm overflow-hidden flex flex-col transition-all duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66] ${
        isSelected
          ? 'border-[#00FF66] scale-105 z-20 shadow-[0_0_35px_rgba(0,255,102,0.35)]'
          : isAnySelected
          ? 'border-[#00FF66]/15 opacity-60 scale-95 hover:opacity-85 hover:border-[#00FF66]/40'
          : 'border-[#00FF66]/25 hover:border-[#00FF66]/60 hover:shadow-[0_0_25px_rgba(0,255,102,0.2)]'
      } ${className}`}
    >
      {/* Corner Technical Tag */}
      <div className="absolute top-2 right-2 z-10 font-mono text-[10px] text-[#00FF66] bg-[#050806]/90 px-2 py-0.5 border border-[#00FF66]/30 rounded-xs">
        [ {member.role.split(' ')[0]} ]
      </div>

      {/* Portrait Container */}
      <div className="relative w-full aspect-[4/5] bg-[#050806] overflow-hidden">
        <img
          src={member.photo}
          alt={`${member.name} — ${member.role}`}
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-500 ${
            isSelected
              ? 'filter grayscale-0 opacity-100 scale-105'
              : 'filter grayscale contrast-110 opacity-85 group-hover:grayscale-0 group-hover:opacity-100'
          }`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/images/about-photo.jpg';
          }}
        />

        {/* Ambient Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1410] via-transparent to-transparent opacity-80" />

        {/* LinkedIn Quick Action Overlay when Selected */}
        {isSelected && linkedinUrl && (
          <div className="absolute inset-x-0 bottom-3 px-4 flex justify-center animate-fade-in z-20">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 font-mono text-xs font-bold text-[#080C0A] bg-[#00FF66] hover:bg-[#33FF88] border border-[#00FF66] rounded-xs shadow-[0_0_15px_rgba(0,255,102,0.5)] transition-all transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={`View ${member.name} on LinkedIn`}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
              </svg>
              <span>LINKEDIN &rarr;</span>
            </a>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col justify-between flex-1 border-t border-[#00FF66]/15 bg-[#0D1410]">
        <div>
          {/* Role Metadata */}
          <div className="font-mono text-[11px] font-bold text-[#00FF66] tracking-wider uppercase mb-1">
            // {member.role}
          </div>

          {/* Member Name */}
          <h3
            className={`font-sans font-bold text-lg leading-snug transition-colors ${
              isSelected ? 'text-[#00FF66]' : 'text-white group-hover:text-[#00FF66]'
            }`}
          >
            {member.name}
          </h3>

          {/* Department */}
          <p className="text-gray-400 font-sans text-xs mt-0.5">
            {member.department}
          </p>
        </div>

        {/* Bio */}
        {member.bio && (
          <p className="text-gray-300 font-sans text-xs leading-relaxed mt-2.5 border-t border-gray-900 pt-2 font-normal line-clamp-3">
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );
};
