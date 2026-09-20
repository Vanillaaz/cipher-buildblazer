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
            <a href="#team" className="hover:text-[#00FF66] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00FF66]">TEAM</a>
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

        {/* Bottom Copyright & Contact Links Row */}
        <div className="pt-6 border-t border-[#00FF66]/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-gray-400">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <p>© 2026 CIPHER SJEC.</p>
            <span className="text-[#00FF66]/40 hidden sm:inline">//</span>
            <span>DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING</span>
          </div>

          {/* Contact Social Links — Circular Icon Buttons */}
          <div className="flex items-center gap-3.5">
            {/* Email */}
            <a
              href="mailto:cipher@sjec.ac.in"
              aria-label="Email CIPHER"
              className="w-11 h-11 rounded-full border border-[#00FF66]/35 flex items-center justify-center text-[#00FF66] bg-[#080C0A] hover:border-[#00FF66] hover:bg-[#00FF66]/15 hover:shadow-[0_0_20px_rgba(0,255,102,0.4)] hover:scale-105 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66]"
            >
              <svg className="w-5 h-5 fill-none stroke-current stroke-[1.75]" viewBox="0 0 24 24">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/ciphersjec/home/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CIPHER LinkedIn"
              className="w-11 h-11 rounded-full border border-[#00FF66]/35 flex items-center justify-center text-[#00FF66] bg-[#080C0A] hover:border-[#00FF66] hover:bg-[#00FF66]/15 hover:shadow-[0_0_20px_rgba(0,255,102,0.4)] hover:scale-105 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66]"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/ciphersjec/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CIPHER Instagram"
              className="w-11 h-11 rounded-full border border-[#00FF66]/35 flex items-center justify-center text-[#00FF66] bg-[#080C0A] hover:border-[#00FF66] hover:bg-[#00FF66]/15 hover:shadow-[0_0_20px_rgba(0,255,102,0.4)] hover:scale-105 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66]"
            >
              <svg className="w-5 h-5 fill-none stroke-current stroke-[1.75]" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
