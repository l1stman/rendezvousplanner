/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    colors: {
      'primary': '#1C1C1C',
      'secondary': "#34C083",
      'white': colors.white,
      'blue': colors.blue,
      'gray': colors.gray,
      'green': colors.green,
      'black': colors.black,
      'cyan': colors.cyan,
      'emerald': colors.emerald,
    },
    extend: {
      fontFamily: {
        mybold: "mybold",
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

