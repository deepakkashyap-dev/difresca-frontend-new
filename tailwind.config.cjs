/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: '420px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        'theme-green': {
          DEFAULT: '#7ED957', // Default shade (when using bg-theme-green)
          400: '#8EE065', // Lighter shade
          600: '#6FC64A', // Darker shade
        },
      },
      boxShadow: {
        'theme-green': '0 0 5px #7ED957', // Example hover box shadow with green tint
      },
      fontFamily: {
        cursive: ['cursive'],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
