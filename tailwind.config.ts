import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#F7F1E6",
          soft: "#F2E9DD",
        },
        gold: {
          DEFAULT: "#C9A94F",
          dark: "#A6853A",
          light: "#E4CE8F",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          soft: "#2A2A28",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "Helvetica", "Arial", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      transitionTimingFunction: {
        "power3-out": "cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.215, 0.61, 0.355, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
