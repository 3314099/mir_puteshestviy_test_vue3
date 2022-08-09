const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {
      colors: {
        inherit: 'inherit',
        'alabaster': '#FAFAFA',
      },
    },
  },
}