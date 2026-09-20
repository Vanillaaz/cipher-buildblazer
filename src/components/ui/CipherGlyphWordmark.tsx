import React, { useRef, useEffect, useCallback } from 'react';

/**
 * CipherGlyphWordmark
 * ───────────────────
 * Large interactive CIPHER character-field for the Hero section.
 *
 * Default state  → characters are WHITE, forming the word CIPHER
 * Hover state    → characters transition to GREEN, disperse, scramble glyphs
 * Mouse leave    → characters spring back, return to WHITE
 *
 * Architecture:
 *  1. After fonts are ready, sample an offscreen mask canvas to find
 *     every grid cell whose centre pixel falls inside the CIPHER letters.
 *  2. RAF loop runs cursor-repulsion springs + hover-dispersion springs
 *     + deterministic glyph scramble + white↔green colour lerp.
 *  3. Zero React state updates per frame — everything lives in refs.
 *  4. Respects prefers-reduced-motion (colour-only transition, no movement).
 */

export interface CipherGlyphWordmarkProps {
  className?: string;
}

// ── Logical coordinate space (matches previous SVG viewBox) ──────────────────
const VB_W  = 1440;
const VB_H  = 320;
const COLS  = 185;
const ROWS  = 33;
const CELL_W = VB_W / COLS;
const CELL_H = VB_H / ROWS;

// ── CIPHER mask font (must match exactly what is visible) ─────────────────────
const CIPHER_FONT_PX  = 255;
const CIPHER_FONT_CSS = `900 ${CIPHER_FONT_PX}px 'Pirata One', 'Cinzel Decorative', cursive`;
const CIPHER_SPACING  = '28px';
const CIPHER_Y_NORM   = 0.82;   // fraction of VB_H for textBaseline=alphabetic

// ── Character rendering ───────────────────────────────────────────────────────
const CHAR_FONT_PX = 8.4;

// ── Physics ───────────────────────────────────────────────────────────────────
const CURSOR_RADIUS = 140;  // VB px — cursor repulsion influence radius
const CURSOR_PUSH   = 95;   // VB px — max cursor displacement
const CURSOR_SPRING = 0.22; // cursor spring-back lerp factor (snappy)
const HOVER_DISP    = 26;   // VB px — max deterministic hover dispersion
const HOVER_SPRING  = 0.10; // hover dispersion lerp factor (slower, organic)
const HOVER_LERP_IN  = 0.055; // hover-progress lerp when entering
const HOVER_LERP_OUT = 0.040; // hover-progress lerp when leaving

// ── Glyph sets ────────────────────────────────────────────────────────────────
const BASE_CHARSET: string[] = [
  'P', ':', '#', '-', '%', 'C', '@', 'H', 'R', 'I', 'E', '+', '*', '=',
  'I', 'C', 'P', 'H', 'E', 'R', 'O', 'X', '1', '0', '$', '&', '/', '\\',
  '|', ';', '.', ':', 'A', 'N', 'T', 'K', 'W', 'M',
];
const SCRAMBLE_CHARSET: string[] = [
  '#', 'Ψ', 'Ω', 'Σ', 'Δ', 'λ', 'Φ', '0', '1', '7', '%', '+', '*', '/',
  '>', '<', '|', '!', '?', 'X', 'Z', '3', '8',
];

// ── Colours ───────────────────────────────────────────────────────────────────
// Default: slightly luminous off-white (not pure #FFF to feel digital)
const C_WHITE = [235, 245, 238] as const;
// Hover:   CIPHER green
const C_GREEN = [0, 255, 102]   as const;

const makeColor = (p: number): string => {
  const r = Math.round(C_WHITE[0] + (C_GREEN[0] - C_WHITE[0]) * p);
  const g = Math.round(C_WHITE[1] + (C_GREEN[1] - C_WHITE[1]) * p);
  const b = Math.round(C_WHITE[2] + (C_GREEN[2] - C_WHITE[2]) * p);
  return `rgb(${r},${g},${b})`;
};

// ── Seeded deterministic LCG ──────────────────────────────────────────────────
const makeLCG = (seed: number) => {
  let s = seed;
  return (): number => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

// ────────────────────────────────────────────────────────────────────────────────
export const CipherGlyphWordmark: React.FC<CipherGlyphWordmarkProps> = ({
  className = '',
}) => {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── All mutable animation state lives here (never in React state) ──────────
  const s = useRef({
    // Char grid (populated after font load)
    count:   0,
    baseX:   new Float32Array(0),
    baseY:   new Float32Array(0),
    dispX:   new Float32Array(0),   // predetermined hover offset per char
    dispY:   new Float32Array(0),
    charIdx: new Uint8Array(0),     // index into BASE_CHARSET
    opacity: new Float32Array(0),
    // Spring state
    curOffX: new Float32Array(0),   // cursor repulsion spring offset X
    curOffY: new Float32Array(0),
    hovOffX: new Float32Array(0),   // hover dispersion spring offset X
    hovOffY: new Float32Array(0),
    // Interaction
    mouse:         null as { x: number; y: number } | null,
    hoverProgress: 0,               // 0=idle/white  1=hovered/green
    // Render
    dpr:       1,
    cssW:      0,
    cssH:      0,
    scale:     1,
    rafId:     0,
    startTime: 0,
    reducedMotion: false,
  });

  // ── Mouse handlers ─────────────────────────────────────────────────────────
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const { left, top, width, height } = wrap.getBoundingClientRect();
    s.current.mouse = {
      x: ((e.clientX - left)  / width)  * VB_W,
      y: ((e.clientY - top)   / height) * VB_H,
    };
  }, []);

  const onMouseLeave = useCallback(() => {
    s.current.mouse = null;
  }, []);

  useEffect(() => {
    const wrap   = wrapRef.current!;
    const canvas = canvasRef.current!;
    const st     = s.current;

    st.reducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Resize handler ─────────────────────────────────────────────────────
    const resize = () => {
      st.dpr   = Math.min(window.devicePixelRatio || 1, 2);
      st.cssW  = wrap.clientWidth;
      st.cssH  = wrap.clientHeight;
      st.scale = st.cssW / VB_W;
      canvas.width  = Math.round(st.cssW * st.dpr);
      canvas.height = Math.round(st.cssH * st.dpr);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // ── Build character grid (called once fonts are ready) ─────────────────
    const buildGrid = () => {
      // ── Step 1: Rasterise CIPHER into an offscreen mask canvas ────────────
      const mc    = document.createElement('canvas');
      mc.width    = VB_W;
      mc.height   = VB_H;
      const mctx  = mc.getContext('2d')!;

      mctx.clearRect(0, 0, VB_W, VB_H);
      mctx.font         = CIPHER_FONT_CSS;
      mctx.textAlign    = 'center';
      mctx.textBaseline = 'alphabetic';
      (mctx as any).letterSpacing = CIPHER_SPACING;
      mctx.fillStyle    = 'white';
      mctx.fillText('CIPHER', VB_W / 2, VB_H * CIPHER_Y_NORM);
      (mctx as any).letterSpacing = '0px';

      const imgData = mctx.getImageData(0, 0, VB_W, VB_H);
      const px      = imgData.data;

      // ── Step 2: For each grid cell, test if centre falls inside mask ───────
      const rng = makeLCG(98765);

      const xs:    number[] = [];
      const ys:    number[] = [];
      const dxs:   number[] = [];
      const dys:   number[] = [];
      const cidxs: number[] = [];
      const ops:   number[] = [];

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          // VB coords of cell centre
          const cx = c * CELL_W + CELL_W * 0.5;
          const cy = r * CELL_H + CELL_H * 0.5;

          const px_i = Math.min(Math.round(cx), VB_W - 1);
          const py_i = Math.min(Math.round(cy), VB_H - 1);
          const idx  = (py_i * VB_W + px_i) * 4;
          const inMask = px[idx + 3] > 100; // alpha threshold

          if (inMask) {
            xs.push(c * CELL_W + CELL_W * 0.15);   // draw x (left-aligned baseline)
            ys.push(r * CELL_H + CELL_H * 0.82);   // draw y
            dxs.push((rng() * 2 - 1) * HOVER_DISP);
            dys.push((rng() * 2 - 1) * HOVER_DISP * 0.65);
            cidxs.push(Math.floor(rng() * BASE_CHARSET.length));
            ops.push(0.55 + rng() * 0.45);
          } else {
            // Consume RNG so sequences remain identical whether or not the
            // cell is inside the mask — ensures dispX/dispY are stable.
            rng(); rng(); rng(); rng();
          }
        }
      }

      const n       = xs.length;
      st.count      = n;
      st.baseX      = new Float32Array(xs);
      st.baseY      = new Float32Array(ys);
      st.dispX      = new Float32Array(dxs);
      st.dispY      = new Float32Array(dys);
      st.charIdx    = new Uint8Array(cidxs);
      st.opacity    = new Float32Array(ops);
      st.curOffX    = new Float32Array(n);
      st.curOffY    = new Float32Array(n);
      st.hovOffX    = new Float32Array(n);
      st.hovOffY    = new Float32Array(n);
    };

    // ── RAF draw loop ──────────────────────────────────────────────────────
    const tick = (ts: number) => {
      if (st.startTime === 0) st.startTime = ts;
      const t   = (ts - st.startTime) * 0.001; // seconds elapsed
      const ctx = canvas.getContext('2d');

      if (!ctx || st.count === 0) {
        st.rafId = requestAnimationFrame(tick);
        return;
      }

      // ── Hover progress lerp (global 0→1 for the whole wordmark) ─────────
      const isHovering   = st.mouse !== null;
      const hoverTarget  = isHovering ? 1 : 0;
      const lerpFactor   = isHovering ? HOVER_LERP_IN : HOVER_LERP_OUT;
      st.hoverProgress  += (hoverTarget - st.hoverProgress) * lerpFactor;
      const hp           = st.hoverProgress;

      // Shared colour for this frame (one string build per frame only)
      const color = makeColor(Math.min(hp * 1.15, 1));

      // ── Transform: VB coords → physical canvas pixels ────────────────────
      ctx.setTransform(st.dpr * st.scale, 0, 0, st.dpr * st.scale, 0, 0);
      ctx.clearRect(0, 0, VB_W, VB_H);

      ctx.font         = `700 ${CHAR_FONT_PX}px "JetBrains Mono", monospace`;
      ctx.textBaseline = 'alphabetic';
      ctx.textAlign    = 'left';
      ctx.fillStyle    = color;

      for (let i = 0; i < st.count; i++) {
        const bx = st.baseX[i];
        const by = st.baseY[i];

        // ── Cursor repulsion spring ────────────────────────────────────────
        let tCurX = 0, tCurY = 0;
        if (st.mouse && !st.reducedMotion) {
          const dx   = bx - st.mouse.x;
          const dy   = by - st.mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_RADIUS && dist > 0.5) {
            const tf    = 1 - dist / CURSOR_RADIUS;
            const force = tf * tf * tf; // cubic — strong near cursor, gentle far
            tCurX = (dx / dist) * force * CURSOR_PUSH;
            tCurY = (dy / dist) * force * CURSOR_PUSH;
          }
        }
        st.curOffX[i] += (tCurX - st.curOffX[i]) * CURSOR_SPRING;
        st.curOffY[i] += (tCurY - st.curOffY[i]) * CURSOR_SPRING;

        // ── Hover dispersion spring (slower, organic spread) ──────────────
        const tHovX = st.reducedMotion ? 0 : st.dispX[i] * hp;
        const tHovY = st.reducedMotion ? 0 : st.dispY[i] * hp;
        st.hovOffX[i] += (tHovX - st.hovOffX[i]) * HOVER_SPRING;
        st.hovOffY[i] += (tHovY - st.hovOffY[i]) * HOVER_SPRING;

        // ── Glyph scramble (deterministic, staggered by char index) ───────
        let char = BASE_CHARSET[st.charIdx[i]];
        if (!st.reducedMotion && hp > 0.25) {
          // Each char has a unique oscillation period (0.12–0.37s)
          const period = 0.12 + (i % 17) * 0.015;
          const phase  = t / period + i * 1.6180339887; // golden-ratio stagger
          if (Math.sin(phase * Math.PI * 2) > 0.65) {
            char = SCRAMBLE_CHARSET[
              Math.abs(Math.floor(phase + i * 0.5)) % SCRAMBLE_CHARSET.length
            ];
          }
        }

        // ── Render ────────────────────────────────────────────────────────
        const rx = bx + st.curOffX[i] + st.hovOffX[i];
        const ry = by + st.curOffY[i] + st.hovOffY[i];

        ctx.globalAlpha = st.opacity[i];
        ctx.fillText(char, rx, ry);
      }

      ctx.globalAlpha = 1;
      st.rafId = requestAnimationFrame(tick);
    };

    // Build grid and start loop after fonts are loaded
    document.fonts.ready.then(() => {
      buildGrid();
      st.rafId = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(st.rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative w-full select-none cursor-none ${className}`}
      style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
      aria-label="CIPHER"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
