import React, { useEffect, useRef, useState } from 'react';

export interface StackImageItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  badge?: string;
  aspectRatio?: string;
}

export interface ImageRevealStackProps {
  images?: StackImageItem[];
  className?: string;
}

const DEFAULT_IMAGES: StackImageItem[] = [
  {
    id: 'layer-back',
    src: '/assets/images/about-stack/photo-1.jpg',
    alt: 'Official CIPHER CSE Department Workshop Session',
    caption: '// WORKSHOP_SESSION',
    badge: 'SJEC CSE',
  },
  {
    id: 'layer-main',
    src: '/assets/images/about-stack/photo-2.jpg',
    alt: 'CIPHER Technical Event Participants',
    caption: '// TECHNICAL_ENGAGEMENT',
    badge: 'EST. 2026',
  },
  {
    id: 'layer-front',
    src: '/assets/images/about-stack/photo-3.jpg',
    alt: 'PromptOps Hackathon & Interactive Coding Challenge',
    caption: '// PROMPTOPS_2026',
    badge: 'COMPETITIVE',
  },
];

export const ImageRevealStack: React.FC<ImageRevealStackProps> = ({
  images = DEFAULT_IMAGES,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
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
            if (containerRef.current) {
              observer.unobserve(containerRef.current);
            }
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -50px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const img1 = images[0] || DEFAULT_IMAGES[0];
  const img2 = images[1] || DEFAULT_IMAGES[1];
  const img3 = images[2] || DEFAULT_IMAGES[2];

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-xl mx-auto lg:max-w-none min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex items-center justify-center p-2 sm:p-4 select-none ${className}`}
    >
      {/* Background CIPHER Watermark Technical Layer */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${
          isVisible ? 'opacity-20' : 'opacity-0'
        }`}
      >
        <span className="font-mono text-6xl sm:text-8xl md:text-9xl font-black tracking-widest text-[#00FF66] select-none opacity-20 filter blur-[1px]">
          CIPHER
        </span>
      </div>

      {/* Decorative Technical Crosshairs */}
      <div className="absolute top-0 left-0 text-[#00FF66]/40 font-mono text-[10px] pointer-events-none">
        +[ 12.9141° N, 74.8560° E ]
      </div>
      <div className="absolute bottom-0 right-0 text-[#00FF66]/40 font-mono text-[10px] pointer-events-none">
        [ SYSTEM_FRAME_LAYER ]+
      </div>

      {/* Stacked Image Container */}
      <div className="relative w-full h-[360px] sm:h-[420px] md:h-[440px]">
        {/* Layer 1: Background Image (Offsets top-left) */}
        <div
          className={`absolute top-0 left-0 w-[72%] sm:w-[68%] md:w-[65%] z-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            prefersReducedMotion || isVisible
              ? 'opacity-90 translate-x-0 translate-y-0 scale-100'
              : 'opacity-0 -translate-x-8 -translate-y-6 scale-[0.95]'
          }`}
          style={{ transitionDelay: prefersReducedMotion ? '0ms' : '0ms' }}
        >
          <div className="relative bg-[#080C0A] border border-[#00FF66]/30 p-1.5 rounded-xs shadow-[0_0_20px_rgba(0,0,0,0.8)] group hover:border-[#00FF66]/60 transition-colors">
            {/* Technical Corner Markers */}
            <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#00FF66]" />
            <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#00FF66]" />

            <div className="relative overflow-hidden aspect-[4/3] bg-black">
              <img
                src={img1.src}
                alt={img1.alt}
                loading="lazy"
                className="w-full h-full object-cover filter contrast-[1.05] brightness-90 group-hover:brightness-100 transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>

            {/* Bottom Caption Bar */}
            <div className="mt-1 px-1 flex items-center justify-between font-mono text-[10px] text-gray-400">
              <span className="text-[#00FF66] truncate">{img1.caption}</span>
              <span className="text-gray-500 hidden sm:inline">{img1.badge}</span>
            </div>
          </div>
        </div>

        {/* Layer 2: Main Middle Image (Offsets bottom-right with overlap) */}
        <div
          className={`absolute bottom-2 right-0 sm:bottom-4 sm:right-2 w-[76%] sm:w-[72%] md:w-[68%] z-20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            prefersReducedMotion || isVisible
              ? 'opacity-95 translate-x-0 translate-y-0 scale-100'
              : 'opacity-0 translate-x-10 translate-y-8 scale-[0.94]'
          }`}
          style={{ transitionDelay: prefersReducedMotion ? '0ms' : '150ms' }}
        >
          <div className="relative bg-[#050806] border border-[#00FF66]/40 p-1.5 sm:p-2 rounded-xs shadow-[0_10px_30px_rgba(0,0,0,0.95)] group hover:border-[#00FF66]/80 transition-colors">
            {/* Technical Corner Markers */}
            <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-[#00FF66]" />
            <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-[#00FF66]" />

            <div className="relative overflow-hidden aspect-[16/10] bg-black">
              <img
                src={img2.src}
                alt={img2.alt}
                loading="lazy"
                className="w-full h-full object-cover filter contrast-[1.08] brightness-95 group-hover:scale-[1.02] transition-all duration-500"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>

            {/* Bottom Caption Bar */}
            <div className="mt-1.5 px-1 flex items-center justify-between font-mono text-[11px]">
              <span className="text-white font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
                {img2.caption}
              </span>
              <span className="text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded-xs border border-[#00FF66]/20">
                {img2.badge}
              </span>
            </div>
          </div>
        </div>

        {/* Layer 3: Foreground Detail Card (Overlaps lower-left) */}
        <div
          className={`absolute bottom-0 left-4 sm:left-8 w-[50%] sm:w-[45%] z-30 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            prefersReducedMotion || isVisible
              ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
              : 'opacity-0 -translate-x-4 translate-y-10 scale-[0.93]'
          }`}
          style={{ transitionDelay: prefersReducedMotion ? '0ms' : '300ms' }}
        >
          <div className="relative bg-[#0A100C]/95 backdrop-blur-md border border-[#00FF66]/50 p-1.5 rounded-xs shadow-[0_12px_28px_rgba(0,0,0,0.9)] hover:border-[#00FF66] transition-colors">
            <div className="relative overflow-hidden aspect-[4/3] bg-black rounded-xs">
              <img
                src={img3.src}
                alt={img3.alt}
                loading="lazy"
                className="w-full h-full object-cover filter contrast-110"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-[#00FF66]/10 mix-blend-overlay" />
            </div>
            <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-gray-300 px-0.5">
              <span className="text-[#00FF66] font-bold">{img3.badge}</span>
              <span className="text-gray-400">{img3.caption}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
