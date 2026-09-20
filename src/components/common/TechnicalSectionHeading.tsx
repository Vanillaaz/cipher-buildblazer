import React, { useEffect, useRef, useState } from 'react';

export interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  animationState?: boolean;
  variant?: 'default' | 'terminal' | 'accent';
}

const GLYPHS = '01#%&$@*[]{}<>/\\_~!?X';

export const TechnicalSectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  description,
  align = 'left',
  className = '',
  animationState,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isIntersected, setIsIntersected] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [displayLabel, setDisplayLabel] = useState('');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
      setIsIntersected(true);
      setDisplayText(title);
      if (label) setDisplayLabel(label);
      return;
    }
  }, [title, label]);

  // IntersectionObserver trigger - plays ONCE when in view
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (animationState !== undefined) {
      setIsIntersected(animationState);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersected(true);
            if (containerRef.current) {
              observer.unobserve(containerRef.current);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [animationState, prefersReducedMotion]);

  // Character scramble reveal for Label
  useEffect(() => {
    if (!label) return;
    if (prefersReducedMotion) {
      setDisplayLabel(label);
      return;
    }
    if (!isIntersected) {
      setDisplayLabel('');
      return;
    }

    let frame = 0;
    const totalFrames = Math.max(14, label.length * 2);
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const revealedLength = Math.floor(progress * label.length);

      let result = '';
      for (let i = 0; i < label.length; i++) {
        if (i < revealedLength) {
          result += label[i];
        } else if (label[i] === ' ' || label[i] === '/') {
          result += label[i];
        } else {
          result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setDisplayLabel(result);

      if (frame >= totalFrames) {
        setDisplayLabel(label);
        clearInterval(interval);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [isIntersected, label, prefersReducedMotion]);

  // Decode reveal for Title
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(title);
      return;
    }
    if (!isIntersected) {
      setDisplayText('');
      return;
    }

    let frame = 0;
    const totalFrames = Math.max(18, title.length * 2);
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const revealedLength = Math.floor(progress * title.length);

      let result = '';
      for (let i = 0; i < title.length; i++) {
        if (i < revealedLength) {
          result += title[i];
        } else if (title[i] === ' ') {
          result += ' ';
        } else {
          result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setDisplayText(result);

      if (frame >= totalFrames) {
        setDisplayText(title);
        clearInterval(interval);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [isIntersected, title, prefersReducedMotion]);

  const alignClasses =
    align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-2.5 max-w-3xl mb-6 md:mb-8 ${alignClasses} ${className}`}
    >
      {/* Monospace Terminal Section Label */}
      {label && (
        <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase text-[#00FF66] bg-[#00FF66]/10 border border-[#00FF66]/25 px-3 py-1 rounded-sm select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
          <span className="min-h-[1rem]">
            {displayLabel || (prefersReducedMotion ? label : '')}
          </span>
        </div>
      )}

      {/* Main Heading Title with Crisp Unmasking & Scanline Accent */}
      <div className="relative group">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug font-sans">
          {displayText || (prefersReducedMotion ? title : '')}
        </h2>
        <div
          className={`h-[2px] mt-1.5 bg-gradient-to-r from-[#00FF66] via-[#00FF66]/50 to-transparent transition-all duration-700 ${
            isIntersected ? 'w-28 opacity-100' : 'w-0 opacity-0'
          }`}
        />
      </div>

      {/* Description */}
      {description && (
        <p
          className={`text-body text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed transition-opacity duration-500 delay-300 ${
            isIntersected || prefersReducedMotion ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export const AnimatedSectionHeading = TechnicalSectionHeading;
