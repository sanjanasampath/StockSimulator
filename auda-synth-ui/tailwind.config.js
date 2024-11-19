/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Custom 80-20 grid layout for the app page
        '80-20': '82.5% 17%',
      },
      colors: {
        "brand": "#1ec7d3",
        'brandHover': '#25dae7',
        "brandText": "#f3f4f6",
        "primary": "#d533ed",
        "primaryHover": "",
        "navBackground": "#27262d",
        "background": "#514878",
        "backgroundHover": "#4a425c",
        "textboxBackground": "#372f47"
      },
      textColor: {
        "brand": "#f3f4f6",
        "brandPurple": "#7a6eaa",
      },
      boxShadow: {
        // "brand": "0 0 10px 0 rgba(30, 199, 211, 0.5)",
        inner: 'inset 2px 2px 5px 2px rgba(0, -0.01, 0, 0.2)',
      },
    },
  },
  plugins: [],
}

