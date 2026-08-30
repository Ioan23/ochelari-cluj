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
        brand: {
          50: "#f0f4ff",
          100: "#dce6ff",
          200: "#b8ccff",
          300: "#85a8ff",
          400: "#5079ff",
          500: "#2448ff",
          600: "#0d2af5",
          700: "#0c1fd8",
          800: "#111baf",
          900: "#141c89",
          950: "#0d1152",
        },
        gold: {
          400: "#c9a227",
          500: "#a78620",
          600: "#8a6e19",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
