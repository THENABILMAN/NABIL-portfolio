"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * A dot on the pointer with a ring trailing behind it; the ring opens over anything
 * clickable. The system cursor stays visible. Mouse only: touch never shows it, and
 * under prefers-reduced-motion the trailing ring is left out.
 */
export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let raf = 0;
    let last = 0;
    let seen = false;
    let x = 0, y = 0, rx = 0, ry = 0, scale = 1, target = 1;

    const tick = (now: number) => {
      const dt = Math.min(50, now - last || 16);
      last = now;
      const k = 1 - Math.exp(-dt / 70);
      rx += (x - rx) * k;
      ry += (y - ry) * k;
      scale += (target - scale) * k;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${scale})`;
      const moving = Math.abs(x - rx) + Math.abs(y - ry) > 0.2 || Math.abs(target - scale) > 0.005;
      raf = moving ? requestAnimationFrame(tick) : 0;
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return hide();
      x = e.clientX;
      y = e.clientY;
      if (!seen) {
        seen = true;
        rx = x;
        ry = y;
      }
      const el = e.target instanceof Element ? e.target : null;
      target = el?.closest("a, button, summary, input, textarea, [role='button']") ? 1.7 : 1;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      dot.style.opacity = "1";
      if (reduce) return;
      ring.style.opacity = "1";
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const hide = () => {
      seen = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
    };
  }, [reduce]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] overflow-hidden print:hidden">
      <div ref={ringRef} className="absolute left-0 top-0 -ml-4 -mt-4 h-8 w-8 rounded-full border border-crimson/60 opacity-0" />
      <div ref={dotRef} className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-crimson opacity-0" />
    </div>
  );
}
