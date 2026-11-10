/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#060709",
        obsidian: "#0B0D12",
        graphite: "#12151C",
        line: "hsla(40, 64%, 84%, 0.12)",
        ivory: "#f8f5ee",
        stone: "#a8a398",
        champagne: {
          light: "#F5DFB2",
          DEFAULT: "#dfb269",
          hover: "#ecc47e",
          dark: "#a67c33",
        },
        ember: "#e04e26",
      },
      fontFamily: {
        heading: ["var(--font-barlow)", "sans-serif"],
        numbers: ["var(--font-barlow)", "sans-serif"],
        accent: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        "card-luxury": "inset 0 1px 0 hsla(0,0%,100%,0.08), 0 20px 45px -15px rgba(0,0,0,0.9)",
        "glow-champagne": "0 0 45px rgba(223, 178, 105, 0.22)",
        "button-champagne": "0 4px 22px hsla(37, 75%, 55%, 0.35)",
        "glass-elevated": "0 10px 30px -10px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)",
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
