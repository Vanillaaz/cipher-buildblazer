import React, { useRef, useEffect } from 'react';

/**
 * AnimatedContourBackground (3D Perspective Terrain Engine)
 * ──────────────────────────────────────────────────────────
 * Renders a 3D wireframe topographic landscape with depth perspective,
 * atmospheric horizon fog, and fast fluid wave dynamics.
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

    // ── 3D Terrain Wave Generator ───────────────────────────────────────────
    const getTerrainHeight = (x: number, z: number, t: number): number => {
      // Fast multi-frequency 3D wave harmonics
      const wave1 = Math.sin(x * 0.0035 + t * 2.2) * Math.cos(z * 0.0028 + t * 1.6) * 95;
      const wave2 = Math.sin(x * 0.0070 - t * 2.8 + z * 0.004) * 45;
      const wave3 = Math.cos(x * 0.0020 + z * 0.0060 - t * 1.9) * 55;
      const peakWarp = Math.sin((x + z) * 0.0018 + t * 1.4) * 35;

      return wave1 + wave2 + wave3 + peakWarp;
    };

    // ── Main 3D Render Loop ─────────────────────────────────────────────────
    const draw = (ts: number) => {
      if (startTime === 0) startTime = ts;
      // Faster time scaling for dynamic fluid motion
      const t = prefersReducedMotion ? 0 : (ts - startTime) * 0.0018;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // Camera & 3D Perspective Setup
      const fov = 420;
      const cameraY = H * 0.52;
      const horizonY = H * 0.42;
      const centerX = W * 0.5;

      // 3D Grid Parameters
      const numRows = W >= 1024 ? 65 : 45;
      const numCols = W >= 1024 ? 85 : 55;
      const zNear = 80;
      const zFar = 1350;
      const zStep = (zFar - zNear) / numRows;
      const xSpan = W * 2.2;
      const xStep = xSpan / numCols;

      // 1. Draw Horizon Ambient Glow (Atmospheric Matrix Fog)
      const fogGradient = ctx.createLinearGradient(0, horizonY - 60, 0, horizonY + 120);
      fogGradient.addColorStop(0, 'rgba(0, 255, 102, 0)');
      fogGradient.addColorStop(0.5, 'rgba(0, 255, 102, 0.06)');
      fogGradient.addColorStop(1, 'rgba(0, 255, 102, 0)');
      ctx.fillStyle = fogGradient;
      ctx.fillRect(0, horizonY - 60, W, 180);

      // 2. Render 3D Perspective Contour Lines (Back to Front for Depth)
      for (let r = numRows - 1; r >= 0; r--) {
        const worldZ = zNear + r * zStep;
        const scale = fov / (worldZ + fov);

        // Distance alpha fading (Atmospheric Z-depth fog)
        const depthRatio = 1 - r / numRows; // 1 near camera, 0 far away
        const lineAlpha = Math.pow(depthRatio, 1.4) * 0.42 + 0.04;
        const isMajorIndex = r % 6 === 0;

        ctx.beginPath();
        ctx.strokeStyle = '#00FF66';
        ctx.globalAlpha = isMajorIndex ? Math.min(lineAlpha * 1.5, 0.75) : lineAlpha;
        ctx.lineWidth = isMajorIndex ? 1.25 : 0.75;

        let first = true;

        for (let c = 0; c <= numCols; c++) {
          const worldX = -xSpan * 0.5 + c * xStep;
          const heightOffset = getTerrainHeight(worldX, worldZ, t);

          // 3D Perspective Projection
          const screenX = centerX + worldX * scale;
          const screenY = horizonY + (cameraY - horizonY) * scale - heightOffset * scale;

          if (first) {
            ctx.moveTo(screenX, screenY);
            first = false;
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }

        ctx.stroke();
      }

      // 3. Render Longitudinal Perspective Rays (Cross 3D Mesh Ribs)
      const numRays = W >= 1024 ? 36 : 22;
      const rayStep = xSpan / numRays;

      for (let c = 0; c <= numRays; c++) {
        const worldX = -xSpan * 0.5 + c * rayStep;
        ctx.beginPath();
        ctx.strokeStyle = '#00FF66';
        ctx.globalAlpha = 0.12;
        ctx.lineWidth = 0.6;

        let first = true;

        for (let r = numRows - 1; r >= 0; r += -2) {
          const worldZ = zNear + r * zStep;
          const scale = fov / (worldZ + fov);
          const heightOffset = getTerrainHeight(worldX, worldZ, t);

          const screenX = centerX + worldX * scale;
          const screenY = horizonY + (cameraY - horizonY) * scale - heightOffset * scale;

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

