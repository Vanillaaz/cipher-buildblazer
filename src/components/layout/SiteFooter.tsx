import React from 'react';
import { CipherEmblemLogo } from '../ui/CipherEmblemLogo';

export const SiteFooter: React.FC = () => {
  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-[#050806] border-t border-[#00FF66]/20 py-12 md:py-16 text-gray-400 font-mono text-xs select-none">
      {/* Top Technical Border Line Accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00FF66]/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        {/* Main Footer Layout: Top Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          {/* Brand & Organizational Wording */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a href="#home" onClick={handleBackToTop} className="focus:outline-none focus:ring-2 focus:ring-[#00FF66] rounded-xs">
              <CipherEmblemLogo size={42} />
            </a>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-[#00FF66] font-extrabold text-lg tracking-wider">CIPHER</span>
                <span className="text-[#00FF66]/40">//</span>
                <span className="text-gray-300 font-semibold">SJEC CSE</span>
              </div>
              <p className="text-gray-300 font-sans text-xs max-w-md opacity-90">
                Student Association - Computer Science &amp; Engineering
              </p>
            </div>
          </div>

          {/* Navigation Anchors */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-300 tracking-widest uppercase" aria-label="Footer Navigation">
            <a href="#home" className="hover:text-[#00FF66] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00FF66]">HOME</a>
            <a href="#about" className="hover:text-[#00FF66] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00FF66]">ABOUT</a>
            <a href="#leadership" className="hover:text-[#00FF66] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00FF66]">LEADERSHIP</a>
            <a href="#events" className="hover:text-[#00FF66] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00FF66]">EVENTS</a>
            <a href="#join" className="hover:text-[#00FF66] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00FF66]">JOIN</a>
          </nav>

          {/* BACK TO TOP Button Control */}
          <div>
            <button
              type="button"
              onClick={handleBackToTop}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#080C0A] border border-[#00FF66]/30 hover:border-[#00FF66] text-[#00FF66] hover:bg-[#00FF66]/10 hover:shadow-[0_0_15px_rgba(0,255,102,0.3)] font-mono text-xs font-semibold tracking-wider uppercase transition-all rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66]"
              aria-label="Back to top"
            >
              <span>BACK TO TOP</span>
              <span className="text-sm font-bold">&uarr;</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-6 border-t border-[#00FF66]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p className="text-gray-400">© 2026 CIPHER SJEC.</p>
          <div className="flex items-center gap-4 text-gray-400">
            <span>DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING</span>
            <span className="text-[#00FF66] hidden sm:inline">// SJEC MANGALORE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

