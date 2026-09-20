import React, { useEffect, useState } from 'react';
import { EventItem } from '../../types/event';

export interface EventModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active image index whenever a new event is opened
  useEffect(() => {
    setActiveImageIndex(0);
  }, [event]);

  // Lock body scroll when modal opens, restore on close
  useEffect(() => {
    if (event) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [event, onClose]);

  if (!event) return null;

  const gallery = event.gallery && event.gallery.length > 0 ? event.gallery : [event.image];
  const hasMultipleImages = gallery.length > 1;

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#050806]/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl bg-[#080C0A] border border-[#00FF66]/40 rounded-xs shadow-[0_0_40px_rgba(0,255,102,0.2)] overflow-hidden flex flex-col max-h-[90vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#00FF66]/20 bg-[#0A100C]">
          <div className="flex items-center gap-2 font-mono text-xs text-[#00FF66]">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
            <span>CIPHER // ACTIVITIES</span>
            <span className="text-gray-500">[{event.category.toUpperCase()}]</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-[#00FF66] focus:outline-none focus:ring-2 focus:ring-[#00FF66] rounded-xs font-mono text-lg transition-colors"
            aria-label="Close Event Modal"
          >
            &times;
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-left">
          {/* Top Title & Metadata Bar */}
          <div className="space-y-2 border-b border-[#00FF66]/15 pb-4">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="text-[#00FF66] font-bold bg-[#00FF66]/10 px-2.5 py-1 rounded-xs border border-[#00FF66]/25">
                {event.displayDate}
              </span>
              {event.location && (
                <span className="text-gray-300 bg-gray-900/80 px-2.5 py-1 rounded-xs border border-gray-800">
                  📍 {event.location}
                </span>
              )}
              {event.organizer && (
                <span className="text-gray-400 hidden sm:inline">
                  // Organised by: <strong className="text-gray-200">{event.organizer}</strong>
                </span>
              )}
            </div>

            <h2 id="event-modal-title" className="font-sans font-extrabold text-xl sm:text-2xl md:text-3xl text-white leading-tight">
              {event.title}
            </h2>
          </div>

          {/* Main Grid Layout: Gallery & Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Gallery Column */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[16/10] bg-[#050806] border border-[#00FF66]/30 rounded-xs overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                <img
                  src={gallery[activeImageIndex]}
                  alt={`${event.title} - View ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover filter contrast-[1.05]"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Gallery Navigation Controls (Only visible if >1 image) */}
                {hasMultipleImages && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/75 hover:bg-[#00FF66] text-white hover:text-black font-mono text-sm border border-[#00FF66]/40 transition-colors rounded-xs"
                      aria-label="Previous image"
                    >
                      &larr;
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/75 hover:bg-[#00FF66] text-white hover:text-black font-mono text-sm border border-[#00FF66]/40 transition-colors rounded-xs"
                      aria-label="Next image"
                    >
                      &rarr;
                    </button>
                  </>
                )}

                {/* Image Counter Badge */}
                <div className="absolute bottom-2 right-2 font-mono text-[11px] text-[#00FF66] bg-black/80 px-2 py-0.5 border border-[#00FF66]/30 rounded-xs">
                  {activeImageIndex + 1} / {gallery.length}
                </div>
              </div>

              {/* Gallery Thumbnails Strip */}
              {hasMultipleImages && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {gallery.map((imgSrc, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-12 rounded-xs overflow-hidden border transition-all ${
                        idx === activeImageIndex
                          ? 'border-[#00FF66] ring-1 ring-[#00FF66]'
                          : 'border-gray-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgSrc} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Event Description Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#050806] border border-[#00FF66]/20 p-4 sm:p-5 rounded-xs space-y-3">
                <span className="font-mono text-xs text-[#00FF66] block font-semibold">// ABOUT THIS EVENT</span>
                <p className="font-sans text-sm text-gray-200 leading-relaxed font-normal">
                  {event.description}
                </p>
              </div>

              <div className="bg-[#0A100C] border border-[#00FF66]/15 p-4 rounded-xs font-mono text-xs space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400">CATEGORY:</span>
                  <span className="text-[#00FF66]">{event.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">DATE:</span>
                  <span className="text-white">{event.displayDate}</span>
                </div>
                {event.organizer && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">HOST:</span>
                    <span className="text-gray-200">{event.organizer}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="px-5 py-3 border-t border-[#00FF66]/20 bg-[#0A100C] flex items-center justify-between font-mono text-xs">
          <span className="text-gray-400">// SJEC CSE ASSOCIATION</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold uppercase text-black bg-[#00FF66] hover:bg-[#00E65C] rounded-xs transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
