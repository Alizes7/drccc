import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        marble: "#F5F2EC",
        stone: "#D8D0C5",
        wine: "#5A2028",
        ivory: {
          DEFAULT: "#F5F2EC",
          2: "#EAE4DA",
        },
        beige: {
          DEFAULT: "#EAE4DA",
          2: "#D8D0C5",
        },
        gold: {
          DEFAULT: "#A9782E",
          light: "#D4A84B",
          deep: "#805A1F",
          pale: "#F0E4CC",
          border: "rgba(169,120,46,0.24)",
          bg: "rgba(169,120,46,0.06)",
        },
        ink: {
          DEFAULT: "#292520",
          2: "#11100F",
        },
        muted: "#6C665D",
        faint: "#9A9087",
      },
      fontFamily: {
        serif: ["'Newsreader'", "serif"],
        sans:  ["'Manrope'", "sans-serif"],
        mono:  ["'IBM Plex Mono'", "monospace"],
      },
      animation: {
        "float-slow": "float-slow 8s ease-in-out infinite",
        "fade-up":    "fade-up 0.6s ease forwards",
        "draw-line":  "draw-line 2s ease forwards",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%":      { transform: "translateY(-12px) rotate(1deg)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(22px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "draw-line": {
          from: { strokeDashoffset: "600" },
          to:   { strokeDashoffset: "0" },
        },
      },
      boxShadow: {
        "gold-sm":  "0 1px 8px rgba(184,137,59,0.10), 0 0 0 1px rgba(184,137,59,0.08)",
        "gold-md":  "0 4px 24px rgba(184,137,59,0.14), 0 1px 4px rgba(184,137,59,0.08)",
        "gold-lg":  "0 12px 48px rgba(184,137,59,0.16), 0 2px 8px rgba(184,137,59,0.10)",
        "card":     "0 2px 20px rgba(26,23,20,0.06), 0 1px 4px rgba(26,23,20,0.04)",
        "card-hover": "0 8px 40px rgba(26,23,20,0.10), 0 2px 8px rgba(26,23,20,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
