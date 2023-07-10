/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,jsx,ts,tsx}",
    "./src/*.{ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  plugins: [require("tw-elements/dist/plugin.cjs")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        nav: "#0d1117",
        blue: {
          450: "#57da44",
        },
      },
    },
  },
};
