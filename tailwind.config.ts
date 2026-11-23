import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#000000",
        surface: "#0a0a0c",
        raised: "#111114",
        line: "#1e1e23",
        "line-strong": "#2e2e35",
        ink: "#f4f4f5",
        "ink-2": "#c9c9cf",
        muted: "#8f8f99",
        burgundy: "#800020",
        crimson: "#ff4d6d",
        cyan: "#38bdf8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.06em",
        tight: "-0.035em",
        wide: "0.04em",
      },
      maxWidth: {
        wrap: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
