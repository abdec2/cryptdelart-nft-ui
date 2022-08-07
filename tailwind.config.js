const defaultTheme = require('tailwindcss/defaultTheme')


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-image': "url('./assets/1.jpeg')",
      }, 
      fontFamily: {
        'saira': ['Saira', ...defaultTheme.fontFamily.sans],
      },

    },
  },
  plugins: [],
}
