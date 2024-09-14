/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      sora: ["Sora", "sans-serif"]
    },
    colors: {
      lightPurple: '#7765DA',
      blue: '#5767D0',
      darkPurple: '#4F0DCE',
      white: '#F2F2F2',
      black: '#373737',
      grey: '#6E6E6E'
    },
    extend: {
      fadeIn: {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
}

