import React from 'react';
import { PageContainer } from '../layout/PageContainer';
import { CipherGlyphWordmark } from '../ui/CipherGlyphWordmark';
import { HeroTerminalVisual } from '../ui/HeroTerminalVisual';
import { PrimaryButton } from '../common/PrimaryButton';
import { SecondaryButton } from '../common/SecondaryButton';

export interface HeroSectionProps {
  onExploreEvents?: () => void;
  onJoinCipher?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreEvents,
  onJoinCipher,
}) => {
  return (
    <section
      id="home"
      className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden pt-4 md:pt-8 pb-10 md:pb-14"
    >
      {/* Background Decorative Technical Accent Layer */}
      <HeroTerminalVisual />

      {/* Main Left-Aligned Hero Layout Container */}
      <PageContainer className="relative z-10 flex flex-col items-start text-left animate-fade-in my-auto py-2">
        {/* Glyph-Built CIPHER Wordmark Banner (Composed of Tiny Green Characters) */}
        <div className="mb-3 md:mb-5 w-full max-w-4xl">
          <CipherGlyphWordmark />
        </div>

        {/* Association Title (H1 - Green Sans-Serif Typography) */}
        <h1 className="text-[#00FF66] font-extrabold text-xl sm:text-3xl md:text-4xl lg:text-[2.75rem] tracking-tight max-w-2xl mb-3 leading-[1.18] drop-shadow-[0_0_15px_rgba(0,255,102,0.4)]">
          Student Association of Computer Science &amp;<br className="hidden sm:inline" /> Engineering
        </h1>

        {/* Supporting Description (Monospace Technical Appearance) */}
        <p className="text-gray-300 font-mono text-xs sm:text-sm md:text-base max-w-xl mb-6 leading-relaxed font-normal opacity-90">
          Bridging academic knowledge and practical application &mdash; a community of aspiring professionals in computing.
        </p>

        {/* Action CTAs (Left-to-Right Order: JOIN CIPHER → Solid Green First, EXPLORE EVENTS Outlined Second) */}
        <div className="flex flex-col sm:flex-row items-center justify-start gap-4 w-full sm:w-auto pt-1">
          <PrimaryButton
            href="#join"
            onClick={onJoinCipher}
            className="w-full sm:w-auto min-w-[190px]"
          >
            JOIN CIPHER &rarr;
          </PrimaryButton>

          <SecondaryButton
            href="#events"
            onClick={onExploreEvents}
            className="w-full sm:w-auto min-w-[190px]"
          >
            EXPLORE EVENTS
          </SecondaryButton>
        </div>
      </PageContainer>
    </section>
  );
};
