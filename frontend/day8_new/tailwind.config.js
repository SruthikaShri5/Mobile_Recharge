/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
