/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fondo: '#C68E62',
        fondoLogo: '#FFF5E0',
        colorButton: '#69FF78',
        brownText: '#65362A',
        strokeInput: '#D4C5C5',
        errorRed: '#E63946',
      },
      rotate: {
        '135': '135deg',
      }
    },
  },
  plugins: [],
}

