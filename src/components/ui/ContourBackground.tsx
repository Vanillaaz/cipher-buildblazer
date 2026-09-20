import React, { useRef, useEffect } from 'react';

/**
 * AnimatedContourBackground
 * ─────────────────────────
 * Canvas 2D topographic-contour field that animates continuously.
 *
 * Architecture:
 *   • All lines share one procedural displacement field evaluated per-pixel.
 *   • The field is composed of three scales of sin/cos waves + 5 warp regions.
 *   • Neighboring lines differ only by their base-x position → they respond to
 *     the same field → produce correlated bunching/spreading (topographic feel).
 *   • Zero React state updates during animation; everything lives in refs.
 *   • RAF loop runs at native 60 fps; canvas is resized only on resize events.
 *   • Reduced-motion: field is rendered once, static (no RAF loop).
 */

export interface ContourBackgroundProps {
  opacity?: number;
  className?: string;
}

// ── Warp region descriptors ──────────────────────────────────────────────────
// cx/cy: normalised 0-1 screen position of the warp centre
// sigma: normalised influence radius
// amp:   max horizontal push in normalised screen-width units
// speed: oscillation speed (radians/second)
// phase: initial phase offset
// ────────────────────────────────────────────────────────────────────────────
const WARP: { cx: number; cy: number; sigma: number; amp: number; speed: number; phase: number }[] = [
  { cx: 0.20, cy: 0.20, sigma: 0.22, amp: 0.045, speed: 0.055, phase: 0.00 },
  { cx: 0.72, cy: 0.15, sigma: 0.20, amp: 0.055, speed: 0.042, phase: 1.57 },
  { cx: 0.45, cy: 0.52, sigma: 0.28, amp: 0.060, speed: 0.048, phase: 3.14 },
  { cx: 0.14, cy: 0.74, sigma: 0.22, amp: 0.040, speed: 0.063, phase: 4.71 },
  { cx: 0.82, cy: 0.67, sigma: 0.20, amp: 0.050, speed: 0.040, phase: 2.09 },
];

// ── Per-line opacity from golden-ratio hash — deterministic, no flicker ──────
const lineAlpha = (i: number) =>
  0.22 + (Math.sin(i * 1.6180339887 + 1.0) * 0.5 + 0.5) * 0.24; // 0.22 – 0.46

// ── Core displacement field ──────────────────────────────────────────────────
// Returns the ABSOLUTE x-position (px) of line `nx` at height `ny` and time `t`.
// nx = normalised line index (0-1), ny = normalised y (0-1), t = seconds.
// W  = canvas CSS width (px)
// ─────────────────────────────────────────────────────────────────────────────
const fieldX = (nx: number, ny: number, t: number, W: number): number => {
  const baseX = nx * W;

  // ── Large scale (broad, very slow) ─────────────────────────────────────────
  const L =
    Math.sin(ny * Math.PI * 1.30 + t * 0.055 + nx * 1.10) * W * 0.060 +
    Math.sin(ny * Math.PI * 2.05 - t * 0.038 + nx * 0.70) * W * 0.038;

  // ── Medium scale (gentle bends) ─────────────────────────────────────────────
  const M =
    Math.cos(ny * Math.PI * 3.80 + t * 0.080 + nx * 2.20) * W * 0.020 +
    Math.sin(ny * Math.PI * 5.10 - t * 0.062 - nx * 1.50) * W * 0.013;

  // ── Small scale (subtle local texture) ──────────────────────────────────────
  const S = Math.cos(ny * Math.PI * 8.60 + t * 0.045 + nx * 3.80) * W * 0.005;

  // ── Warp regions (terrain features) ──────────────────────────────────────────
  let warpTotal = 0;
  for (const r of WARP) {
    const dx = nx - r.cx;
    const dy = ny - r.cy;
    const dist2 = dx * dx + dy * dy;
    const sig2  = r.sigma * r.sigma;
    // Gaussian falloff — smooth, no visible boundary
    const g = Math.exp(-dist2 / (2 * sig2));
    // Oscillating push — creates the "breathing terrain" feel
    warpTotal += g * r.amp * W * Math.sin(t * r.speed + r.phase);
  }

  return baseX + L + M + S + warpTotal;
};

// ─────────────────────────────────────────────────────────────────────────────

export const ContourBackground: React.FC<ContourBackgroundProps> = ({
  opacity = 1,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d')!;

    // ── Mutable state (refs, not React state) ─────────────────────────────────
    let W = 0, H = 0, dpr = 1;
    let lineCount = 100;
    let yStep     = 7;       // px between sample points along each line
    let rafId     = 0;
    let startTime = 0;

    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Resize handler ────────────────────────────────────────────────────────
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W   = window.innerWidth;
      H   = window.innerHeight;

      canvas.width        = Math.round(W * dpr);
      canvas.height       = Math.round(H * dpr);
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;

      // Responsive density
      if (W >= 1280) { lineCount = 105; yStep = 7; }
      else if (W >= 1024) { lineCount = 88;  yStep = 7; }
      else if (W >= 768)  { lineCount = 65;  yStep = 8; }
      else                { lineCount = 44;  yStep = 9; }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // ── Main draw loop ────────────────────────────────────────────────────────
    const draw = (ts: number) => {
      if (startTime === 0) startTime = ts;
      const t = prefersReducedMotion ? 0 : (ts - startTime) * 0.001; // seconds

      // Map VB → physical pixels via DPR transform
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // Draw each contour line
      for (let i = 0; i < lineCount; i++) {
        const nx = i / (lineCount - 1); // normalised 0 → 1

        ctx.globalAlpha = lineAlpha(i);
        ctx.strokeStyle = '#00FF66';
        // Index contours (every 10th) are slightly thicker — topographic convention
        ctx.lineWidth = i % 10 === 0 ? 1.0 : 0.75;

        ctx.beginPath();
        let first = true;

        for (let y = 0; y <= H; y += yStep) {
          const ny = y / H;
          const x  = fieldX(nx, ny, t, W);

          if (first) { ctx.moveTo(x, y); first = false; }
          else        { ctx.lineTo(x, y); }
        }

        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(draw);
      }
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none select-none ${className}`}
      style={{ zIndex: 0, opacity }}
      aria-hidden="true"
    />
  );
};
