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
      title: '#4a7fbe',

      borderColor: '#2773ff',
      border: '#d6cfcf',
      background: '#eff6ff',
      backgroundPrimary: '#C2DBFF',
      backgroundGray: '#e5e5e5',
      backgroundBlue: '#e8f5ff',
      backgroundLightgray: '#f4f4f4',
      backgroundAccent: '#9fc1ff',

      textDarkBlue: '#0f2744',
      textSecondaryDark: '#676767',
      textSecondary: '#ffffff',
      textPrimary: '#ffffff',
      textBlack: '#000000',
      textWhite: '#ffffff',
      textWarning: '#e08c0f',
      textDisabled: '#4d4d4d',
      textSuccess: '#16843b',
      textDanger: '#ff0d0d',
      textGray: '#728095',
      lightgray: '#f4f5f8',
      darkgray: '#4f4f4f',
      warning: '#fff3c8',
      white: '#ffffff',
      success: '#5aff9280',
      black: '#000000',
      blue: '#276a9c',
      error: '#d32f2f',
      danger: '#f05454',
      disabled: '#cfcdcd',
      secondaryBorder: '#cfcdcd',

      icnSuccess: '#15bdb2',
      icnDanger: '#ff5b62',

      accent900: '#54d2d2',
      lightBlue: '#d5e1eb',

    },
    extend: {},
  },
  plugins: [],

  corePlugins: {
    preflight: false,
  },
};
