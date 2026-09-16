import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#fcfcfc",
        ink: "#09090b",
        card: "#ffffff",
        neon: "#06b6d4",
        violet2: "#7c3aed",
        magenta: "#e879f9",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "spin-slow": "spin 14s linear infinite",
        marquee: "marquee 42s linear infinite",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-18px)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
    },
  },
  plugins: [],
};
export default config;
