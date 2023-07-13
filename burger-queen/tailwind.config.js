/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fondo: '#C68E62',
        gunMetal: '#1D2939',
        blackInput: '#252D37',
        strokeInput: '#D4C5C5',
        errorRed: '#E63946',
      },
    },
  },
  plugins: [],
}

