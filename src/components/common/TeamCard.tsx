import React from 'react';
import { TeamMember } from '../../types';

export interface TeamCardProps {
  member: TeamMember;
  className?: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, className = '' }) => {
  return (
    <div
      className={`group bg-[#0D1410] border border-[#00FF66]/25 hover:border-[#00FF66]/60 rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,102,0.18)] relative select-none ${className}`}
    >
      {/* Corner Technical Bracket Accent */}
      <div className="absolute top-2 right-2 z-10 font-mono text-[10px] text-[#00FF66]/60 bg-[#050806]/80 px-1.5 py-0.5 border border-[#00FF66]/20 rounded-xs">
        [ SYS_LEAD ]
      </div>

      {/* Portrait Image Container */}
      <div className="relative w-full aspect-[4/5] bg-[#050806] overflow-hidden">
        <img
          src={member.photo}
          alt={`${member.name} — ${member.role}`}
          loading="lazy"
          className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 opacity-85 group-hover:opacity-100"
          onError={(e) => {
            // Fallback display if portrait image fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {/* Subtle Dark Overlay Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1410] via-transparent to-transparent opacity-80" />
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col justify-between flex-1 border-t border-[#00FF66]/15 bg-[#0D1410]">
        <div>
          {/* Role Metadata Label */}
          <div className="font-mono text-[11px] font-bold text-[#00FF66] tracking-wider uppercase mb-1">
            // {member.role}
          </div>

          {/* Member Name */}
          <h3 className="text-white font-sans font-bold text-lg md:text-xl group-hover:text-[#00FF66] transition-colors leading-snug">
            {member.name}
          </h3>

          {/* Department */}
          <p className="text-gray-400 font-sans text-xs mt-1">
            {member.department}
          </p>
        </div>

        {/* Bio / Description if available */}
        {member.bio && (
          <p className="text-gray-300 font-sans text-xs leading-relaxed mt-3 border-t border-gray-900 pt-2 font-normal">
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );
};
