/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: '#F8F6FF',
          100: '#E9E4FF',
          200: '#D1C4FF',
          300: '#B39DFF',
          400: '#9574FF',
          500: '#7B4DFF',
          600: '#6133E8',
          700: '#4B25B8',
          800: '#361A8B',
          900: '#230F5C',
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
