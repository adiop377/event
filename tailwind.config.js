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
        ink: "#090D14", // Deep Midnight Charcoal
        obsidian: "#0D131F", // Dark Athletic Navy
        graphite: "#141C2B", // Tech Panel
        surface: "#1A2436", // Card Elevated
        line: "rgba(255, 255, 255, 0.09)",
        ivory: "#F8FAFC", // Crisp athletic white
        stone: "#94A3B8", // Cool slate
        volt: {
          light: "#E5FF66",
          DEFAULT: "#CCFF00", // Signature Nike Volt Speed
          hover: "#b8e600",
          dark: "#99cc00",
        },
        blaze: {
          light: "#FF7A50",
          DEFAULT: "#FF5722", // Neon Blaze Orange
          hover: "#f4511e",
          dark: "#d84315",
        },
        // Backwards compatibility mappings so existing components look electric immediately
        champagne: {
          light: "#E5FF66",
          DEFAULT: "#CCFF00",
          hover: "#b8e600",
          dark: "#99cc00",
        },
        ember: "#FF5722",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "'Oswald'", "'Bebas Neue'", "sans-serif"],
        numbers: ["var(--font-heading)", "'Oswald'", "sans-serif"],
        accent: ["var(--font-heading)", "'Oswald'", "sans-serif"],
        body: ["var(--font-body)", "'Manrope'", "'Inter'", "sans-serif"],
      },
      boxShadow: {
        "card-luxury": "inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 45px -15px rgba(0,0,0,0.85)",
        "glow-volt": "0 0 35px rgba(204, 255, 0, 0.28)",
        "glow-blaze": "0 0 35px rgba(255, 87, 34, 0.28)",
        "button-volt": "0 4px 22px rgba(204, 255, 0, 0.35)",
        "button-blaze": "0 4px 22px rgba(255, 87, 34, 0.35)",
      },
      animation: {
        marquee: "marquee 25s linear infinite",
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
