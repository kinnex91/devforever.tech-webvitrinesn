import { fontFamily } from 'tailwindcss/defaultTheme';

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
          DEFAULT: '#4B0082', // indigo
          50: '#F0E7FF',
          100: '#E1D0FF',
          200: '#C4A1FF',
          300: '#A772FF',
          400: '#8A43FF',
          500: '#6D14FF',
          600: '#5000E6',
          700: '#4B0082',
          800: '#380061',
          900: '#250040',
        },
      },
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}