import React, { useEffect, useRef, useState } from 'react';

export interface StackImageItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  badge?: string;
}

export interface ImageRevealStackProps {
  images?: StackImageItem[];
  className?: string;
}

const RICH_IMAGE_POOL: StackImageItem[] = [
  {
    id: 'photo-1',
    src: '/assets/images/about-stack/photo-1.jpg',
    alt: 'Official CIPHER CSE Department Workshop Session',
    caption: '// WORKSHOP_SESSION',
    badge: 'SJEC CSE',
  },
  {
    id: 'photo-2',
    src: '/assets/images/events/lumiere-1.jpg',
    alt: 'Lumiere Departmental Gala Welcome',
    caption: '// LUMIERE_GALA',
    badge: 'FLAGSHIP GALA',
  },
  {
    id: 'photo-3',
    src: '/assets/images/events/cyber-1.jpg',
    alt: 'Cyber Security & SecOps Career Session',
    caption: '// CYBER_SECURITY',
    badge: 'SECOPS 2026',
  },
  {
    id: 'photo-4',
    src: '/assets/images/about-stack/photo-2.jpg',
    alt: 'CIPHER Technical Event Participants',
    caption: '// TECHNICAL_BODY',
    badge: 'STUDENT BODY',
  },
  {
    id: 'photo-5',
    src: '/assets/images/events/gsoc-main.jpg',
    alt: 'Hands-on GSoC & LLM Developer Workshop',
    caption: '// GSOC_WORKSHOP',
    badge: 'AI ECOSYSTEM',
  },
  {
    id: 'photo-6',
    src: '/assets/images/about-stack/photo-3.jpg',
    alt: 'PromptOps Hackathon & Interactive Coding Challenge',
    caption: '// PROMPTOPS_2026',
    badge: 'COMPETITIVE',
  },
  {
    id: 'photo-7',
    src: '/assets/images/events/lumiere-3.jpg',
    alt: 'Department Entry Gala Celebration',
    caption: '// GALA_CELEBRATION',
    badge: 'SJEC MANGALORE',
  },
  {
    id: 'photo-8',
    src: '/assets/images/events/promptops-1.jpg',
    alt: 'Prompt Engineering Live Code Challenge',
    caption: '// CODE_SPRINT',
    badge: 'LLM BENCHMARK',
  },
  {
    id: 'photo-9',
    src: '/assets/images/events/lumiere-5.jpg',
    alt: 'CIPHER Cultural Performance & Welcome',
    caption: '// CULTURAL_FEST',
    badge: 'LUMIERE 2025',
  },
  {
    id: 'photo-10',
    src: '/assets/images/events/cyber-3.jpg',
    alt: 'Cyber Security Lab & Threat Intel Session',
    caption: '// THREAT_INTEL',
    badge: 'CYBER LAB',
  },
  {
    id: 'photo-11',
    src: '/assets/images/events/gsoc-2.jpg',
    alt: 'Open Source Mentorship & Developer Sprint',
    caption: '// OPEN_SOURCE',
    badge: 'GSoC MENTORSHIP',
  },
  {
    id: 'photo-12',
    src: '/assets/images/events/promptops-4.jpg',
    alt: 'AI Prompt Engineering Team Showcase',
    caption: '// PROMPT_SHOWCASE',
    badge: 'AI INNOVATION',
  },
];

export const ImageRevealStack: React.FC<ImageRevealStackProps> = ({
  images = RICH_IMAGE_POOL,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Pool pointers: index of top card in the photo deck
  const [topIndex, setTopIndex] = useState(0);
  const [isPopping, setIsPopping] = useState(false);

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

  const total = images.length;
  // Compute indices for 3 active stacked layers
  const frontImgIndex = topIndex % total;
  const midImgIndex = (topIndex + 1) % total;
  const backImgIndex = (topIndex + 2) % total;

  const frontImage = images[frontImgIndex] || RICH_IMAGE_POOL[0];
  const midImage = images[midImgIndex] || RICH_IMAGE_POOL[1];
  const backImage = images[backImgIndex] || RICH_IMAGE_POOL[2];

  // Trigger pop-out animation and cycle to next unique photo
  const handleStackClick = () => {
    if (isPopping) return;
    setIsPopping(true);

    setTimeout(() => {
      setTopIndex((prev) => (prev + 1) % total);
      setIsPopping(false);
    }, 280);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleStackClick}
      className={`relative w-full max-w-xl mx-auto lg:max-w-none min-h-[340px] sm:min-h-[400px] md:min-h-[440px] flex flex-col items-center justify-center p-2 sm:p-4 select-none cursor-pointer group/stack ${className}`}
      role="button"
      aria-label="Click anywhere on frame to pop next photo"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleStackClick();
        }
      }}
    >
      {/* Background CIPHER Watermark Technical Layer */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${
          isVisible ? 'opacity-20' : 'opacity-0'
        }`}
      >
        <span className="font-mono text-6xl sm:text-8xl md:text-9xl font-black tracking-widest text-[#00FF66] select-none opacity-20">
          CIPHER
        </span>
      </div>

      {/* Top HUD Bar */}
      <div className="w-full flex items-center justify-between mb-3 px-1 font-mono text-[11px] text-gray-400">
        <span className="text-[#00FF66]/80 flex items-center gap-1.5 font-bold">
          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping" />
          // PHOTO_DECK_GALLERY
        </span>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 bg-black/60 border border-[#00FF66]/30 px-2 py-0.5 rounded-xs">
            [ PHOTO {String(frontImgIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} ]
          </span>
          <span className="text-[#00FF66] bg-[#00FF66]/10 border border-[#00FF66]/50 px-2.5 py-0.5 rounded-xs font-bold shadow-[0_0_10px_rgba(0,255,102,0.2)]">
            POP NEXT ⚡
          </span>
        </div>
      </div>

      {/* Interactive Stacked Image Container */}
      <div className="relative w-full h-[320px] sm:h-[370px] md:h-[390px]">
        {/* Layer 1: BACK CARD (Tilted Left -5deg) */}
        <div
          className={`absolute top-2 left-2 sm:left-4 w-[68%] sm:w-[64%] z-10 transition-all duration-500 ease-out transform -rotate-6 scale-90 ${
            prefersReducedMotion || isVisible ? 'opacity-50 translate-x-0' : 'opacity-0 -translate-x-6'
          } group-hover/stack:-rotate-8 group-hover/stack:scale-95`}
        >
          <div className="relative p-1.5 sm:p-2 rounded-xs border border-[#00FF66]/20 bg-[#080C0A] shadow-[0_5px_20px_rgba(0,0,0,0.8)]">
            <div className="relative overflow-hidden bg-black aspect-[4/3] rounded-xs">
              <img
                src={backImage.src}
                alt={backImage.alt}
                loading="lazy"
                className="w-full h-full object-cover filter contrast-[1.05] brightness-60"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="mt-1 px-1 flex items-center justify-between font-mono text-[9px] text-gray-500 truncate">
              <span>{backImage.caption}</span>
              <span>{backImage.badge}</span>
            </div>
          </div>
        </div>

        {/* Layer 2: MIDDLE CARD (Tilted Right +4deg) */}
        <div
          className={`absolute bottom-3 right-2 sm:right-4 w-[72%] sm:w-[68%] z-20 transition-all duration-500 ease-out transform rotate-4 scale-95 ${
            prefersReducedMotion || isVisible ? 'opacity-80 translate-x-0' : 'opacity-0 translate-x-6'
          } group-hover/stack:rotate-6 group-hover/stack:scale-100`}
        >
          <div className="relative p-1.5 sm:p-2 rounded-xs border border-[#00FF66]/40 bg-[#050806] shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
            <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#00FF66]" />
            <div className="relative overflow-hidden bg-black aspect-[16/10] rounded-xs">
              <img
                src={midImage.src}
                alt={midImage.alt}
                loading="lazy"
                className="w-full h-full object-cover filter contrast-[1.08] brightness-80"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="mt-1 px-1 flex items-center justify-between font-mono text-[10px] text-gray-400">
              <span className="text-[#00FF66]/80 truncate">{midImage.caption}</span>
              <span className="text-gray-400 border border-gray-800 bg-black/60 px-1.5 py-0.5 rounded-xs text-[9px]">{midImage.badge}</span>
            </div>
          </div>
        </div>

        {/* Layer 3: FRONT CARD (Main Focus - Pops off cleanly without blur!) */}
        <div
          className={`absolute bottom-0 left-3 sm:left-6 w-[70%] sm:w-[65%] z-30 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${
            isPopping
              ? '-translate-y-16 translate-x-16 rotate-12 scale-105 opacity-0'
              : 'translate-y-0 translate-x-0 -rotate-2 scale-100 opacity-100 group-hover/stack:scale-105 group-hover/stack:-rotate-1'
          }`}
        >
          <div className="relative p-2 sm:p-2.5 rounded-xs border-2 border-[#00FF66] bg-[#0A100C] ring-1 ring-[#00FF66]/50 shadow-[0_0_35px_rgba(0,255,102,0.4),0_20px_40px_rgba(0,0,0,0.95)]">
            <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00FF66]" />
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00FF66]" />

            <div className="relative overflow-hidden bg-black aspect-[4/3] rounded-xs">
              <img
                key={frontImage.id + '-' + frontImgIndex}
                src={frontImage.src}
                alt={frontImage.alt}
                loading="eager"
                className="w-full h-full object-cover filter contrast-110 brightness-100 transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/images/about-photo.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>

            {/* Bottom Caption Bar */}
            <div className="mt-2 px-1 flex items-center justify-between font-mono text-[10px] sm:text-[11px]">
              <span className="text-[#00FF66] font-bold truncate flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
                {frontImage.caption}
              </span>
              <span className="text-[#00FF66] bg-[#00FF66]/15 border border-[#00FF66]/60 px-2 py-0.5 rounded-xs font-bold shadow-[0_0_10px_rgba(0,255,102,0.3)]">
                {frontImage.badge}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

