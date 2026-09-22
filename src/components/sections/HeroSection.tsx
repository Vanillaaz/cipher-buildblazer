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
      className="relative w-full min-h-0 md:min-h-screen flex flex-col justify-start md:justify-between overflow-hidden space-y-4 md:space-y-0"
    >
      {/* Background Decorative Technical Accent Layer */}
      <HeroTerminalVisual />

      {/* ── CIPHER Glyph Wordmark ── full-bleed, no side padding */}
      <div className="relative z-10 w-full pt-10 sm:pt-14 md:pt-20 drop-shadow-[0_0_60px_rgba(0,255,102,0.55)]">
        <CipherGlyphWordmark />
      </div>

      {/* ── Text content + CTAs ── sits below the wordmark */}
      <div className="relative z-10 pt-1 pb-8 md:pb-16 animate-fade-in">
        <PageContainer className="!py-0 flex flex-col items-start text-left">
          {/* Association Title — H1 */}
          <h1 className="text-[#00FF66] font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight max-w-3xl mb-3 leading-[1.15] drop-shadow-[0_0_25px_rgba(0,255,102,0.5)]">
            Student Association of{' '}
            <br className="hidden sm:inline" />
            Computer Science &amp; Engineering
          </h1>

          {/* Supporting description */}
          <p className="text-gray-300 font-mono text-xs sm:text-sm md:text-base max-w-xl mb-7 leading-relaxed opacity-90">
            Bridging academic knowledge and practical application<br className="hidden sm:inline" />
            &mdash; a community of aspiring professionals in computing.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-start gap-4 w-full sm:w-auto">
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
      </div>
    </section>
  );
};
