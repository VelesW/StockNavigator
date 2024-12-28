/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'main-gray': '#333333',
        'main-text': '#929191',
      },
      fontFamily: {
        'exo': ['"Exo 2"', 'sans-serif'], 
      },
    },
  },
  plugins: [],
};
