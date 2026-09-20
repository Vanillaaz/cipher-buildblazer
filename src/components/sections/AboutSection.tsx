import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '../layout/PageContainer';
import { SectionHeading } from '../common/SectionHeading';
import { ImageRevealStack } from '../ui/ImageRevealStack';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
      setIsTextVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsTextVisible(true);
            if (sectionRef.current) {
              observer.unobserve(sectionRef.current);
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 border-t border-[#00FF66]/10 overflow-hidden"
    >
      <PageContainer>
        <SectionHeading
          label="// ABOUT US"
          title="Who We Are"
          description="The official student association of the Department of Computer Science & Engineering at St Joseph Engineering College, Mangalore."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center pt-2">
          {/* Text Content Column with Coordinated Reveal */}
          <div
            className={`lg:col-span-6 space-y-6 text-left transition-all duration-700 ease-out ${
              prefersReducedMotion || isTextVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="bg-[#0D1410] border border-[#00FF66]/20 p-6 md:p-8 rounded-sm space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00FF66] bg-[#00FF66]/10 px-3 py-1 rounded-xs border border-[#00FF66]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
                // ESTABLISHED • SJEC CSE DEPARTMENT
              </div>

              <p className="text-gray-200 font-sans text-sm md:text-base leading-relaxed">
                <strong className="text-[#00FF66]">CIPHER</strong> is the premier student association of the Department of Computer Science and Engineering at SJEC, Vamanjoor, Mangalore. Under the guidance of HOD Dr. Melwyn D’Souza and dedicated faculty coordinators, CIPHER serves as a catalyst for student technical growth, innovation, and leadership.
              </p>

              <p className="text-gray-300 font-sans text-sm leading-relaxed">
                From organizing flagship departmental entry programmes like <em className="text-white font-medium">Lumière – The Gala</em> to conducting hands-on industry workshops on Google Summer of Code (GSoC), Large Language Models (LLMs), and competitive prompt engineering challenges like <em className="text-white font-medium">PromptOps 2026</em>, CIPHER connects academic learning with real-world computing applications.
              </p>
            </div>

            {/* Quick Metrics / Verified Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bg-[#050806] border border-[#00FF66]/15 p-4 rounded-xs hover:border-[#00FF66]/40 transition-colors">
                <span className="block text-[#00FF66] font-bold text-lg">CSE</span>
                <span className="text-gray-400">DEPARTMENT</span>
              </div>
              <div className="bg-[#050806] border border-[#00FF66]/15 p-4 rounded-xs hover:border-[#00FF66]/40 transition-colors">
                <span className="block text-[#00FF66] font-bold text-lg">SJEC</span>
                <span className="text-gray-400">MANGALORE</span>
              </div>
              <div className="bg-[#050806] border border-[#00FF66]/15 p-4 rounded-xs col-span-2 sm:col-span-1 hover:border-[#00FF66]/40 transition-colors">
                <span className="block text-[#00FF66] font-bold text-lg">2025–26</span>
                <span className="text-gray-400">ACADEMIC YEAR</span>
              </div>
            </div>
          </div>

          {/* Layered Image Reveal Stack Column */}
          <div className="lg:col-span-6">
            <ImageRevealStack />
          </div>
        </div>
      </PageContainer>
    </section>
  );
};

