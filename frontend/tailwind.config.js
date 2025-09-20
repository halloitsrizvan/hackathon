/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f4ff',
          500: '#8e9752',
          600: '#7a8447',
          700: '#6b7440',
        },
        secondary: {
          50: '#fbffde',
        }
      }
    },
  },
  plugins: [],
}
