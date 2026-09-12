"use client";

import { useEffect, useState } from "react";

export default function WireframeGrid() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY * 0.15); // Perspective scroll movement calculation
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none h-screen w-screen overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_52%)]" />

      {/* Top-Left Crisp White Grid */}
      <svg
        className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vh] opacity-100 transition-transform duration-75 ease-out"
        style={{
          transform: `perspective(600px) rotateX(45deg) rotateY(-20deg) translateY(${scrollY}px)`,
        }}
      >
        <defs>
          <pattern
            id="grid-top"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeOpacity="0.9"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-top)" />
      </svg>

      {/* Bottom-Right Crisp White Grid */}
      <svg
        className="absolute -bottom-[10%] -right-[10%] w-[70vw] h-[70vh] opacity-100 transition-transform duration-75 ease-out"
        style={{
          transform: `perspective(600px) rotateX(-45deg) rotateY(20deg) translateY(-${scrollY}px)`,
        }}
      >
        <defs>
          <pattern
            id="grid-bottom"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeOpacity="0.9"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-bottom)" />
      </svg>
    </div>
  );
}
