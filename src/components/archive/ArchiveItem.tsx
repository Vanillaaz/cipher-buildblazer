import React from 'react';
import { ActivityItem } from '../../types/activity';

export interface ArchiveItemProps {
  activity: ActivityItem;
  index: number;
}

export const ArchiveItem: React.FC<ArchiveItemProps> = ({ activity, index }) => {
  const indexFormatted = String(index + 1).padStart(2, '0');

  return (
    <div className="group relative flex flex-col justify-between p-4 sm:p-5 bg-[#080C0A] border border-[#00FF66]/20 hover:border-[#00FF66]/60 rounded-xs transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,102,0.12)] text-left">
      {/* Top Metadata Row: Index Marker + Year/Category */}
      <div className="flex items-center justify-between font-mono text-[11px] mb-2.5">
        <span className="text-[#00FF66] font-bold group-hover:text-white transition-colors">
          [ {indexFormatted} ]
        </span>
        <span className="text-gray-400 bg-[#00FF66]/10 px-2 py-0.5 rounded-xs border border-[#00FF66]/20 uppercase tracking-wider text-[10px]">
          {activity.category}
        </span>
      </div>

      {/* Main Activity Title */}
      <h3 className="font-sans font-semibold text-sm sm:text-base text-gray-100 group-hover:text-[#00FF66] transition-colors leading-snug">
        {activity.title}
      </h3>

      {/* Bottom Subtle Indicator */}
      <div className="mt-3 pt-2 border-t border-[#00FF66]/10 flex items-center justify-between font-mono text-[10px] text-gray-500 group-hover:text-gray-300 transition-colors">
        <span>// SJEC CSE ARCHIVE</span>
        {activity.year && <span className="text-[#00FF66]">{activity.year}</span>}
      </div>
    </div>
  );
};
