/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'btn-emerald',
    'btn-orange', 
    'btn-cyan',
    'btn-rose',
    'card',
    'input-field',
    'animate-fade-in',
    'animate-scale-in',
    'animate-slide-in',
    'stat-card-emerald',
    'stat-card-orange',
    'stat-card-cyan',
    'stat-card-rose',
    'stat-card-lime',
    'font-poppins',
    'font-roboto',
    'font-opensans',
    'font-montserrat',
    'font-lato'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f472b6',
          dark: '#ec4899',
        },
        secondary: {
          DEFAULT: '#a78bfa',
          dark: '#8b5cf6',
        },
        accent: {
          DEFAULT: '#818cf8',
          dark: '#6366f1',
        },
      },
    },
  },
  plugins: [],
}
