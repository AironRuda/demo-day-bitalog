/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#31C48D',
          secondary: '#339989',
          complementaryBlue: '#3A80BF',
          lightGreen: '#83EA3A',
          accent: '#73EABD',
          neutral: '#191D24',
          'base-100': '#2A303C',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#B4103C',
          error: '#F87272',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
