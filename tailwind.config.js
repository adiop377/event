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
        ink: "#07080a",
        graphite: "#111317",
        line: "hsla(40, 64%, 84%, 0.12)",
        ivory: "#f8f5ee",
        stone: "#a8a398",
        champagne: {
          DEFAULT: "#dfb269",
          hover: "#ecc47e",
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
        "card-luxury": "inset 0 1px 0 hsla(0,0%,100%,0.08), 0 18px 40px -14px rgba(0,0,0,0.85)",
        "glow-champagne": "0 0 35px rgba(223, 178, 105, 0.15)",
        "button-champagne": "0 4px 18px hsla(37, 65%, 64%, 0.28)",
      },
    },
  },
  plugins: [],
};

