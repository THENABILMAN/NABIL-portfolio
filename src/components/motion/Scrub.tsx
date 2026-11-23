"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Scroll-scrubbed focus: the block rises and brightens as it enters, holds at full
 * strength while it is read, then recedes as its end leaves the top half of the screen,
 * so one section at a time holds the eye. Tied to the scroll position, so scrolling
 * back up runs it in reverse. Off entirely under prefers-reduced-motion.
 */
export default function Scrub({
  children,
  className,
  distance = 72,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start 0.98", "start 0.5"] });
  const { scrollYProgress: exit } = useScroll({ target: ref, offset: ["end 0.35", "end 0"] });
  const y = useTransform(enter, [0, 1], [distance, 0]);
  const scale = useTransform(exit, [0, 1], [1, 0.94]);
  const opacity = useTransform([enter, exit], ([a, b]: number[]) => (0.15 + 0.85 * a) * (1 - 0.75 * b));

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y, scale, opacity, transformOrigin: "50% 100%" }}>{children}</motion.div>
    </div>
  );
}
