import React from 'react';
import { DomainItem } from '../../types';

export interface DomainCardProps {
  domain: DomainItem;
  className?: string;
}

export const DomainCard: React.FC<DomainCardProps> = ({ domain, className = '' }) => {
  // Minimal technical SVG icons per domain
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return (
          <svg className="w-5 h-5 text-[#00FF66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'calendar':
        return (
          <svg className="w-5 h-5 text-[#00FF66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'shield':
        return (
          <svg className="w-5 h-5 text-[#00FF66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'cpu':
      default:
        return (
          <svg className="w-5 h-5 text-[#00FF66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`group bg-[#0D1410] border border-[#00FF66]/20 hover:border-[#00FF66]/50 rounded-sm p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,102,0.15)] relative overflow-hidden ${className}`}
    >
      {/* Corner Accent Box */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#00FF66]/10 to-transparent pointer-events-none" />

      <div>
        {/* Header Metadata Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="p-1.5 bg-[#00FF66]/10 border border-[#00FF66]/30 rounded-xs">
            {renderIcon(domain.icon)}
          </div>
          <span className="font-mono text-[11px] text-[#00FF66]/70 tracking-widest uppercase">
            [ {domain.code} ]
          </span>
        </div>

        {/* Domain Title */}
        <h3 className="text-white font-sans font-bold text-base sm:text-lg mb-2 group-hover:text-[#00FF66] transition-colors">
          {domain.title}
        </h3>

        {/* Domain Description */}
        <p className="text-gray-300 font-sans text-xs sm:text-sm leading-relaxed mb-4 font-normal">
          {domain.description}
        </p>
      </div>

      {/* Highlights Metadata List */}
      <div className="border-t border-[#00FF66]/10 pt-3 flex flex-wrap gap-1.5">
        {domain.highlights.map((item, idx) => (
          <span
            key={idx}
            className="font-mono text-[10px] text-gray-400 bg-[#050806] px-2 py-0.5 border border-gray-800 rounded-xs"
          >
            // {item}
          </span>
        ))}
      </div>
    </div>
  );
};
