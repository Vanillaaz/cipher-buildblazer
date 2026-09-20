import React, { useEffect, useRef } from 'react';

/**
 * CustomCursor — renders a thin green ring that follows the mouse
 * throughout the entire website, replacing the system cursor.
 *
 * Placed at z-[999999] to ensure it stays on top of all modals and overlays.
 */
export const CustomCursor: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);

  // Raw target position (updated instantly on mousemove)
  const targetRef  = useRef({ x: -200, y: -200 });
  // Smoothed position (lerped each RAF frame)
  const currentRef = useRef({ x: -200, y: -200 });
  const rafRef     = useRef(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    const LERP = 0.18; // ring lag — lower = more lag
    const RING_HALF = 16; // half of ring diameter (32px / 2)
    const DOT_HALF  = 2;  // half of dot diameter (4px / 2)

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visibleRef.current) {
        // Snap ring to position on first move (avoid slide-in from corner)
        currentRef.current = { x: e.clientX, y: e.clientY };
        visibleRef.current = true;
        if (ringRef.current) ringRef.current.style.opacity = '1';
        if (dotRef.current)  dotRef.current.style.opacity  = '1';
      }
    };

    const onLeave = () => {
      visibleRef.current = false;
      if (ringRef.current) ringRef.current.style.opacity = '0';
      if (dotRef.current)  dotRef.current.style.opacity  = '0';
    };

    const tick = () => {
      const { x: tx, y: ty } = targetRef.current;
      const c = currentRef.current;

      c.x += (tx - c.x) * LERP;
      c.y += (ty - c.y) * LERP;

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${c.x - RING_HALF}px, ${c.y - RING_HALF}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${tx - DOT_HALF}px, ${ty - DOT_HALF}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Lagging ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[999999] pointer-events-none opacity-0 transition-opacity duration-200"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      >
        <div className="w-8 h-8 rounded-full border border-[#00FF66]/60" />
      </div>

      {/* Instant dot — snaps exactly to pointer */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[999999] pointer-events-none opacity-0 transition-opacity duration-200"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      >
        <div className="w-1 h-1 rounded-full bg-[#00FF66]" />
      </div>
    </>
  );
};
