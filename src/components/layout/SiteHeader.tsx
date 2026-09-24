import React, { useState } from 'react';

export interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'TEAM', href: '#team' },
  { label: 'EVENTS', href: '#events' },
  { label: 'JOIN', href: '#join' },
];

export const SiteHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080C0A]/90 backdrop-blur-md border-b border-[#00FF66]/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between">
        {/* Official CIPHER Emblem Logo — top left corner */}
        <a
          href="#home"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66] rounded-sm py-1 group"
          aria-label="CIPHER Home"
        >
          <img
            src="/assets/images/cipher-logo.png"
            alt="CIPHER – CSE Student Association, SJEC"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain select-none transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(0,255,102,0.3)]"
            draggable={false}
          />
        </a>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono text-xs tracking-widest uppercase text-gray-300 hover:text-[#00FF66] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#00FF66] hover:after:w-full after:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66] rounded-xs"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Top Right JOIN CIPHER CTA Box */}
        <div className="hidden md:block">
          <a
            href="#join"
            className="inline-flex items-center justify-center px-4 py-1.5 font-mono text-xs font-semibold tracking-wider uppercase text-[#00FF66] bg-[#050806]/90 border border-[#00FF66]/40 hover:border-[#00FF66] hover:bg-[#00FF66]/10 hover:shadow-[0_0_15px_rgba(0,255,102,0.3)] transition-all rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66]"
          >
            JOIN CIPHER
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-sm text-gray-300 hover:text-[#00FF66] border border-gray-800 hover:border-[#00FF66]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66]"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle Navigation Menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#00FF66]/20 bg-[#050806] px-4 pt-3 pb-6 animate-fade-in">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-mono text-sm tracking-wider uppercase text-gray-200 hover:text-[#00FF66] py-2 border-b border-gray-900"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#join"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center w-full px-4 py-2 font-mono text-xs font-semibold tracking-wider uppercase text-[#00FF66] bg-[#00FF66]/10 border border-[#00FF66]/40 rounded-xs"
              >
                JOIN CIPHER
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
