import React, { useRef, useEffect } from 'react';

/**
 * AnimatedContourBackground (Vertical 3D Perspective Contour Engine)
 * ──────────────────────────────────────────────────────────
 * Renders vertical 3D wireframe contour lines spanning the full website page
 * with 3D depth perspective, atmospheric matrix fog, and controlled fluid speed.
 */

export interface ContourBackgroundProps {
  opacity?: number;
  className?: string;
}

export const ContourBackground: React.FC<ContourBackgroundProps> = ({
  opacity = 1,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let rafId = 0;
    let startTime = 0;

    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;

      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // ── 3D Vertical Wave Displacement Generator ─────────────────────────────────
    const getTerrainDisplacement = (x: number, y: number, t: number): number => {
      // Gentle, multi-frequency vertical 3D wave harmonics
      const wave1 = Math.sin(y * 0.0028 + t * 0.9) * Math.cos(x * 0.0022 + t * 0.7) * 75;
      const wave2 = Math.sin(y * 0.0055 - t * 1.1 + x * 0.003) * 35;
      const wave3 = Math.cos(y * 0.0016 + x * 0.004 - t * 0.8) * 45;
      const peakWarp = Math.sin((x + y) * 0.0014 + t * 0.6) * 30;

      return wave1 + wave2 + wave3 + peakWarp;
    };

    // ── Main 3D Vertical Render Loop ──────────────────────────────────────────
    const draw = (ts: number) => {
      if (startTime === 0) startTime = ts;
      // Slightly reduced time scaling for smooth, elegant vertical flow
      const t = prefersReducedMotion ? 0 : (ts - startTime) * 0.0008;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // Camera Perspective & Grid Setup
      const fov = 480;
      const numCols = W >= 1024 ? 60 : 38; // Vertical contour lines across width
      const numRows = W >= 1024 ? 80 : 50; // Vertical resolution down height

      const xSpan = W * 1.8;
      const xStep = xSpan / numCols;
      const yStep = (H + 200) / numRows;
      const startY = -100;
      const centerX = W * 0.5;
      const centerZ = 350;

      // 1. Vertical Ambient Matrix Glow Gradient
      const verticalGlow = ctx.createLinearGradient(0, 0, 0, H);
      verticalGlow.addColorStop(0, 'rgba(0, 255, 102, 0.03)');
      verticalGlow.addColorStop(0.5, 'rgba(0, 255, 102, 0.06)');
      verticalGlow.addColorStop(1, 'rgba(0, 255, 102, 0.03)');
      ctx.fillStyle = verticalGlow;
      ctx.fillRect(0, 0, W, H);

      // 2. Render Vertical Contour Lines (Running Top to Bottom)
      for (let c = 0; c <= numCols; c++) {
        const baseX = -xSpan * 0.5 + c * xStep;
        const isMajorLine = c % 4 === 0;

        ctx.beginPath();
        ctx.strokeStyle = '#00FF66';

        const lineAlpha = isMajorLine ? 0.32 : 0.14;
        const normalizedX = (c / numCols) * 2 - 1; // -1 to 1 across screen width
        const edgeFade = 1 - Math.pow(Math.abs(normalizedX), 2.2) * 0.55;
        ctx.globalAlpha = Math.max(0.04, lineAlpha * edgeFade);
        ctx.lineWidth = isMajorLine ? 1.2 : 0.7;

        let first = true;

        for (let r = 0; r <= numRows; r++) {
          const worldY = startY + r * yStep;
          const depthZ = centerZ + Math.sin(worldY * 0.002 + t) * 70;
          const scale = fov / (depthZ + fov);

          const dispX = getTerrainDisplacement(baseX, worldY, t);
          const screenX = centerX + (baseX + dispX) * scale;
          const screenY = worldY;

          if (first) {
            ctx.moveTo(screenX, screenY);
            first = false;
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }

        ctx.stroke();
      }

      // 3. Render Horizontal Cross Contour Ribs (Subtle Surface Mesh Grid)
      const horizontalStepCount = W >= 1024 ? 32 : 20;
      const hRowStep = numRows / horizontalStepCount;

      for (let hr = 0; hr <= horizontalStepCount; hr++) {
        const r = Math.floor(hr * hRowStep);
        const worldY = startY + r * yStep;

        ctx.beginPath();
        ctx.strokeStyle = '#00FF66';
        ctx.globalAlpha = 0.07;
        ctx.lineWidth = 0.55;

        let first = true;

        for (let c = 0; c <= numCols; c++) {
          const baseX = -xSpan * 0.5 + c * xStep;
          const depthZ = centerZ + Math.sin(worldY * 0.002 + t) * 70;
          const scale = fov / (depthZ + fov);

          const dispX = getTerrainDisplacement(baseX, worldY, t);
          const screenX = centerX + (baseX + dispX) * scale;
          const screenY = worldY;

          if (first) {
            ctx.moveTo(screenX, screenY);
            first = false;
          } else {
            ctx.lineTo(screenX, screenY);
          }
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


