"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/** A dim burgundy light behind the page that sways from side to side with the scroll. */
export default function ScrollGlow() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const x = useTransform(p, [0, 0.2, 0.4, 0.6, 0.8, 1], ["30vw", "-30vw", "30vw", "-30vw", "30vw", "0vw"]);
  const y = useTransform(p, [0, 0.5, 1], ["-15vh", "10vh", "25vh"]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          ...(reduce ? {} : { x, y }),
          background: "radial-gradient(closest-side, rgba(128,0,32,0.26), rgba(128,0,32,0) 75%)",
        }}
      />
    </div>
  );
}
