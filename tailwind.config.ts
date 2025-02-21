import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'space': {
          DEFAULT: '#0A0E1F', // Deep Space Blue
          light: '#1A1E2F',
          dark: '#050912',
        },
        'cosmic': {
          DEFAULT: '#4A1E9E', // Cosmic Purple
          light: '#5A2EAE',
          dark: '#3A0E8E',
        },
        'nebula': {
          DEFAULT: '#FF16B0', // Nebula Pink
          light: '#FF36C0',
          dark: '#EF06A0',
        },
        'star': {
          DEFAULT: '#F8F7FF', // Star Glow
          dim: '#E8E7EF',
          bright: '#FFFFFF',
        },
        // Secondary Colors
        'asteroid': '#2E3754', // Asteroid Gray
        'aurora': '#26EDBB',   // Aurora Green
        'comet': '#22A5B3',    // Comet Teal
        'galaxy': '#FFD166',   // Galaxy Gold
      },
      fontFamily: {
        'exo': ['Exo\\ 2', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(to right bottom, #0A0E1F, #4A1E9E)',
        'nebula-glow': 'radial-gradient(circle at center, #FF16B0, transparent)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      boxShadow: {
        'cosmic': '0 0 20px rgba(74, 30, 158, 0.3)',
        'nebula': '0 0 30px rgba(255, 22, 176, 0.2)',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
