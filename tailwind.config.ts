import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#000000",
        "bone-white": "#ffffff",
        "ash-gray": "#888888",
        "silver-mist": "#b0b0b0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "PPNeueMontreal", "Inter", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.06em",
        tight: "-0.04em",
        wide: "0.04em",
      },
      borderRadius: {
        pill: "22.5px",
        card: "24px",
      },
      boxShadow: {
        white: "0 0 30px rgba(255, 255, 255, 0.12)",
        subtle: "0 0 24px rgba(255, 255, 255, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
