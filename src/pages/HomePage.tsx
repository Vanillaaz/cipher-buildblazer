import React, { useState } from 'react';
import {
  IntroSequence,
  SiteHeader,
  SiteFooter,
  ContourBackground,
  TerminalTexture,
  HeroSection,
  AboutSection,
  DomainsSection,
  LeadershipSection,
  EventsSection,
  ArchiveSection,
  JoinSection,
} from '../components';

export const HomePage: React.FC = () => {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="min-h-screen bg-[#080C0A] text-gray-100 flex flex-col relative selection:bg-[#00FF66] selection:text-black">
      {/* Intro Boot Sequence Modal */}
      {!introFinished && (
        <IntroSequence onComplete={() => setIntroFinished(true)} />
      )}

      {/* Shared Continuous Contour Background System */}
      <ContourBackground opacity={0.25} />
      <TerminalTexture enabled={true} opacity={0.04} />

      {/* Global Header Navigation */}
      <SiteHeader />

      {/* Main Content Area */}
      <main className="flex-1 z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* About / Who We Are Section */}
        <AboutSection />

        {/* Our Domains Section */}
        <DomainsSection />

        {/* Leadership / Governance Section */}
        <LeadershipSection />

        {/* Events & Workshops Section */}
        <EventsSection />

        {/* Historical Activities Archive Section */}
        <ArchiveSection />

        {/* Access Club / Join the Team Section */}
        <JoinSection />
      </main>

      {/* Global Footer */}
      <SiteFooter />
    </div>
  );
};



