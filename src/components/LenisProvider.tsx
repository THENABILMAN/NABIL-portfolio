"use client";

import { MotionConfig } from "framer-motion";

/**
 * Applies the visitor's reduced-motion setting to every Framer Motion animation.
 * Lenis smooth scrolling was removed in the redesign: it hijacked the wheel, and
 * anchor jumps now use native CSS smooth scrolling (off under reduced motion).
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
