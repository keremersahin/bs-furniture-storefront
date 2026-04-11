import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0f3d6f",
          dark: "#0a2747",
          soft: "#e8f0f8",
          accent: "#2f6fb0"
        },
        sand: "#f4f1ec"
      },
      boxShadow: {
        card: "0 18px 50px rgba(15, 61, 111, 0.08)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(255,255,255,0.95), transparent 28%), linear-gradient(135deg, rgba(15,61,111,0.08), rgba(47,111,176,0.02))"
      }
    }
  },
  plugins: []
};

export default config;
