/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgLogin: '#C68E62',
        bgLogo: '#FFF5E0',
        blackInput: '#252D37',
        strokeInput: '#D4C5C5',
        errorRed: '#E63946',
      },
    },
  },
  plugins: [],
}