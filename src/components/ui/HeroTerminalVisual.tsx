import React from 'react';

export const HeroTerminalVisual: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-25"
      aria-hidden="true"
    >
      {/* Corner Brackets */}
      <div className="absolute top-20 left-4 sm:left-12 font-mono text-[10px] text-[#00FF66]/60">
        [SYS_LOC: 13.3444° N, 74.7925° E]
      </div>

      <div className="absolute top-20 right-4 sm:right-12 font-mono text-[10px] text-[#00FF66]/60 hidden sm:block">
        [NODE_ID: CSE_ASSOC_SJEC]
      </div>

      {/* Decorative Technical Code Lines (Left Side) */}
      <div className="absolute top-48 left-6 font-mono text-[10px] text-[#00FF66]/30 hidden lg:block space-y-1">
        <p>&gt; const association = &quot;CIPHER&quot;;</p>
        <p>&gt; import &#123; Innovation &#125; from &quot;@sjec/cse&quot;;</p>
        <p>&gt; status: ACTIVE_CLUSTER;</p>
      </div>

      {/* Decorative Technical Code Lines (Right Side) */}
      <div className="absolute top-48 right-6 font-mono text-[10px] text-[#00FF66]/30 hidden lg:block text-right space-y-1">
        <p>&gt; build: PHASE_2_LIVE</p>
        <p>&gt; network: ST_JOSEPH_EC</p>
        <p>&gt; protocol: HTTPS_SECURE</p>
      </div>
    </div>
  );
};
