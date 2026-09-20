import React, { useEffect, useState, useCallback } from 'react';
import { MatrixRainCanvas } from './MatrixRainCanvas';

export interface IntroSequenceProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  '> establishing connection...',
  '> authenticating access...',
  '> decrypting CIPHER_v1.0...',
  '> Loading modules... [==========] 100%',
  '> access granted',
];

const TARGET_WORD = ['C', 'I', 'P', 'H', 'E', 'R'];

// Position-specific glyph pools that resemble the target letter forms before resolving
const GLYPH_POOLS: string[][] = [
  ['(', '[', '{', '⊂', 'C', '¢', '©', 'C', 'G'],             // C
  ['|', '1', '!', 'i', '∫', 'l', ']', 'I', '│'],             // I
  ['ρ', 'þ', 'p', 'P', 'R', 'β', '¶', 'P', 'p'],             // P
  ['#', 'H', 'ħ', 'Η', 'X', 'N', 'H', 'K'],                 // H
  ['€', '≡', 'E', 'Ξ', 'Σ', 'ε', 'E', '3'],                 // E
  ['R', '®', 'ℜ', 'Γ', 'r', 'Я', 'R', 'P'],                 // R
];

const GENERAL_GLYPHS = ['Φ', 'Ψ', 'Ω', 'Δ', 'Σ', 'Ξ', 'Π', 'λ', 'μ', 'θ', '∂', '∫', '≈', '≠', '≡', '0', '1', '7', 'X', ']', '[', '}', '{', '%', '#', '&'];

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  // Sequence stages: 'BOOT' -> 'MORPH' -> 'DISSOLVE' -> 'DOT' -> 'DONE'
  const [stage, setStage] = useState<'BOOT' | 'MORPH' | 'DISSOLVE' | 'DOT' | 'DONE'>('BOOT');
  const [logIndex, setLogIndex] = useState(0);

  // Array storing which character index has stabilized (0..5)
  // Lock order: 0 (C) -> 5 (R) -> 1 (I) & 4 (E) -> 2 (P) & 3 (H)
  const [lockedIndices, setLockedIndices] = useState<boolean[]>([false, false, false, false, false, false]);
  const [currentGlyphs, setCurrentGlyphs] = useState<string[]>(['Φ', 'Ψ', 'Ω', 'Δ', 'Σ', 'Ξ']);
  const [isSkipped, setIsSkipped] = useState(false);

  const handleSkip = useCallback(() => {
    setIsSkipped(true);
    sessionStorage.setItem('cipher_intro_seen', 'true');
    onComplete();
  }, [onComplete]);

  // Expose dev helper to reset intro state
  useEffect(() => {
    (window as unknown as { __resetCipherIntro?: () => void }).__resetCipherIntro = () => {
      sessionStorage.removeItem('cipher_intro_seen');
      window.location.reload();
    };
  }, []);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  // Reduced motion & session check
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasSeenIntro = sessionStorage.getItem('cipher_intro_seen') === 'true';

    if (prefersReducedMotion || hasSeenIntro) {
      handleSkip();
    }
  }, [handleSkip]);

  // ─────────────────────────────────────────────────────────────
  // PHASE 1 — TERMINAL BOOT (~0.0s -> ~1.1s)
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isSkipped || stage !== 'BOOT') return;

    if (logIndex < BOOT_LOGS.length) {
      const timer = setTimeout(() => {
        setLogIndex((prev) => prev + 1);
      }, 220);
      return () => clearTimeout(timer);
    } else {
      const morphStartTimer = setTimeout(() => {
        setStage('MORPH');
      }, 200);
      return () => clearTimeout(morphStartTimer);
    }
  }, [logIndex, stage, isSkipped]);

  // ─────────────────────────────────────────────────────────────
  // PHASE 2 — GLYPH MORPH (~1.2s -> ~4.6s)
  // Scramble non-stabilized glyph positions every 45ms
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isSkipped || stage !== 'MORPH') return;

    const interval = setInterval(() => {
      setCurrentGlyphs((prevGlyphs) =>
        prevGlyphs.map((_, i) => {
          if (lockedIndices[i]) {
            return TARGET_WORD[i];
          }
          const pool = GLYPH_POOLS[i] || GENERAL_GLYPHS;
          return Math.random() > 0.3
            ? pool[Math.floor(Math.random() * pool.length)]
            : GENERAL_GLYPHS[Math.floor(Math.random() * GENERAL_GLYPHS.length)];
        })
      );
    }, 45);

    return () => clearInterval(interval);
  }, [stage, lockedIndices, isSkipped]);

  // Progressive Stabilization Timeline
  useEffect(() => {
    if (isSkipped || stage !== 'MORPH') return;

    // Timeline for locking character positions:
    // t=400ms: C (0)
    // t=900ms: R (5)
    // t=1400ms: I (1) & E (4)
    // t=1900ms: P (2) & H (3) -> All locked!
    const t1 = setTimeout(() => setLockedIndices([true, false, false, false, false, false]), 400);
    const t2 = setTimeout(() => setLockedIndices([true, false, false, false, false, true]), 900);
    const t3 = setTimeout(() => setLockedIndices([true, true, false, false, true, true]), 1400);
    const t4 = setTimeout(() => setLockedIndices([true, true, true, true, true, true]), 1900);

    // Hold readable CIPHER state, then move to DISSOLVE at ~3.4s (total ~4.6s from start)
    const holdTimer = setTimeout(() => {
      setStage('DISSOLVE');
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(holdTimer);
    };
  }, [stage, isSkipped]);

  // ─────────────────────────────────────────────────────────────
  // PHASE 3 — LOGO DISSOLVE & DOT TRANSITION (~4.7s -> ~5.6s)
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isSkipped || stage !== 'DISSOLVE') return;

    const dissolveTimer = setTimeout(() => {
      setStage('DOT');
    }, 600); // 600ms dissolve

    return () => clearTimeout(dissolveTimer);
  }, [stage, isSkipped]);

  useEffect(() => {
    if (isSkipped || stage !== 'DOT') return;

    const dotTimer = setTimeout(() => {
      handleSkip(); // 5.5s+ Main Hero appears!
    }, 350);

    return () => clearTimeout(dotTimer);
  }, [stage, isSkipped, handleSkip]);

  if (isSkipped) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#050806] flex flex-col items-center justify-center p-6 font-mono select-none overflow-hidden"
      role="dialog"
      aria-label="CIPHER System Initialization"
      aria-modal="true"
    >
      {/* Dark Matrix Code Rain Canvas */}
      <MatrixRainCanvas opacity={stage === 'DOT' ? 0.15 : 0.75} />

      {/* Center Display Area */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl text-center">
        {/* Phase 1: Small Terminal Boot Lines */}
        {stage === 'BOOT' && (
          <div className="space-y-2 text-left font-mono text-xs sm:text-sm md:text-base text-[#00FF66] drop-shadow-[0_0_8px_rgba(0,255,102,0.8)] max-w-md">
            {BOOT_LOGS.slice(0, logIndex).map((log, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span>{log}</span>
              </div>
            ))}
            <span className="inline-block w-2 h-4 bg-[#00FF66] animate-cursor-blink ml-1 align-middle" />
          </div>
        )}

        {/* Phase 2 & 3: Glyph Morphing Wordmark & Dissolve */}
        {(stage === 'MORPH' || stage === 'DISSOLVE') && (
          <div
            className={`flex items-center justify-center gap-2 sm:gap-4 md:gap-6 transition-all duration-500 ease-out ${
              stage === 'DISSOLVE' ? 'opacity-0 scale-95 filter blur-xs' : 'opacity-100 scale-100'
            }`}
          >
            {currentGlyphs.map((glyph, idx) => {
              const isLocked = lockedIndices[idx];
              return (
                <span
                  key={idx}
                  className={`font-serif font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl transition-all duration-150 ${
                    isLocked
                      ? 'text-[#00FF66] drop-shadow-[0_0_35px_rgba(0,255,102,0.95)] scale-100'
                      : 'text-[#00FF66]/70 drop-shadow-[0_0_15px_rgba(0,255,102,0.4)] scale-105 font-mono'
                  }`}
                >
                  {glyph}
                </span>
              );
            })}
          </div>
        )}

        {/* Phase 4: Small Central Green Transition Point */}
        {stage === 'DOT' && (
          <div className="relative flex items-center justify-center">
            <div className="w-3.5 h-3.5 bg-[#00FF66] rounded-full shadow-[0_0_25px_#00FF66] animate-ping" />
            <div className="w-2 h-2 bg-white rounded-full absolute" />
          </div>
        )}
      </div>

      {/* Accessible Skip Button */}
      <button
        onClick={handleSkip}
        type="button"
        aria-label="Skip Introduction Sequence"
        className="fixed bottom-8 right-8 z-20 font-mono text-xs sm:text-sm text-[#00FF66]/80 hover:text-[#00FF66] border border-[#00FF66]/30 hover:border-[#00FF66] px-4 py-1.5 bg-[#050806]/80 backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00FF66] tracking-widest cursor-pointer rounded-xs"
      >
        [ SKIP &gt; ]
      </button>
    </div>
  );
};
