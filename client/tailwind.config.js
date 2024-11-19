/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand": "#7a6eaa",
        "primary": "#1ec7d3",
        "background": "#27262d",
      },
    },
  },
  plugins: [],
}