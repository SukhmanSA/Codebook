/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Covers all source files
    './public/index.html', // Covers the public index file
    './components/**/*.{html,js,jsx,ts,tsx}', // Covers components directory if you have one
    './pages/**/*.{html,js,jsx,ts,tsx}', // Covers pages directory if using Next.js or similar
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors:{
        darkbg:"#1E293B"
      }
    },
  },
  plugins: [],
};