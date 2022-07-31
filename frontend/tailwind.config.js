/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#3fa9f5",
      primary__contrastText: "#fff",

      background: "#eff6ff",
      secondary: "#858fad",
      secondary__contrastText: "#fff",

      white: "#ffffff",

      border: "#d6cfcf",
    },
    extend: {},
  },
  plugins: [],

  corePlugins: {
    preflight: false,
  },
};
