import React, { useState } from 'react';
import { PageContainer } from '../layout/PageContainer';
import { PrimaryButton } from '../common/PrimaryButton';
import { JoinFormModal } from '../forms/JoinFormModal';


export const JoinSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="join"
      className="relative w-full py-10 md:py-16 border-t border-[#00FF66]/10 scroll-mt-16 overflow-hidden select-none"
    >
      <PageContainer>
        {/* Main Technical Container */}
        <div className="relative bg-[#080C0A] border border-[#00FF66]/25 p-6 sm:p-8 md:p-10 rounded-xs shadow-[0_0_35px_rgba(0,255,102,0.12)] text-left overflow-hidden">
          {/* Subtle Corner Markers */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#00FF66]" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#00FF66]" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#00FF66]" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#00FF66]" />

          {/* Background Ambient Glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#00FF66]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Technical Section Header Label */}
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00FF66] bg-[#00FF66]/10 px-3 py-1 rounded-xs border border-[#00FF66]/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
            // ACCESS CLUB
          </div>

          {/* Main Title & Message */}
          <div className="max-w-3xl space-y-4">
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Join the Team
            </h2>

            <p className="font-sans text-base sm:text-lg text-gray-200 leading-relaxed font-normal opacity-95">
              &quot;Whether you want to build, Lead, or simply Learn — CIPHER is where CSE students turn curiosity into capability. Join the community and help shape what comes next.&quot;
            </p>

            <p className="font-mono text-xs text-gray-400">
              // Open to all undergraduate Computer Science &amp; Engineering students at SJEC.
            </p>
          </div>

          {/* CTA Button Action */}
          <div className="mt-8 pt-6 border-t border-[#00FF66]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <PrimaryButton
              onClick={() => setIsModalOpen(true)}
              className="min-w-[200px]"
            >
              JOIN &rarr;
            </PrimaryButton>

            <div className="font-mono text-xs text-gray-400 flex items-center gap-4">
              <span>// RECRUITMENT 2025–26</span>
              <span className="text-[#00FF66]">DEPARTMENT OF CSE</span>
            </div>
          </div>
        </div>
      </PageContainer>

      {/* Modal Form Overlay */}
      <JoinFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
