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
      primary__200: "#e5e5e5",

      secondary: "#858fad",
      secondary__contrastText: "#fff",
      secondary__200: "#e5e5e5",
    },
    extend: {},
  },
  plugins: [],

  corePlugins: {
    preflight: false,
  },
};
