"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** A thin crimson bar across the top that fills as the page is read. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-crimson"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  );
}
