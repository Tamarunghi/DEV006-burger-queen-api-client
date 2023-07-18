/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fondo: '#C68E62',
        crema: '#FFF5E0',
        colorButton: '#69FF78',
        brownText: '#65362A',
        skin: '#D9C5B3',
        notPress: '#FDDE99',
        press: '#82B83E',
        borderNotPress: '#A47D26',
        borderPress: '#5B812C',
        yellow: '#F9B317',
        plusButtom:'#C1D78F',
        minusButtom:'#FF8C8C',
      },
      borderRadius: {
        '5': '5px',
        '25': '25px',
      },
      dropShadow: {
          'productUnpress': '7px 4px 6px 0px rgba(70, 33, 23, 0.90)',
        },
      rotate: {
        '135': '135deg',
      },
      zIndex: {
       '0': 0,
       '1': 1,
       '2': 2,
        'auto': 'auto',
      }
    },
  },
  plugins: [],
}

