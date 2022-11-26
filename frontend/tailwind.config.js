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
      loginBg: '#EFF6FF',
      secondary: "#858fad",
      secondary__contrastText: "#fff",
      // secondary__light: "#fff",
      // secondary__200: "#fff",

      gray: '#CFCDCD',
      filter: 'rgba(0, 0, 0, 0.23)',

      grayBtn: '#7A7A7A',
      grayBtn__light: 'rgba(196, 196, 196, 0.50)',

      white: "#ffffff",

      border: "#d6cfcf",
      title: '#4a7fbe',

      borderColor: '#2773ff',
      border: '#d6cfcf',
      background: '#fbfbfb',
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
      danger__contrastText: '#ffffff',
      disabled: '#cfcdcd',
      secondaryBorder: '#cfcdcd',

      icnSuccess: '#15bdb2',
      icnDanger: '#ff5b62',

      accent900: '#54d2d2',
      lightBlue: '#d5e1eb',

      //chip colors for visit status table 
      chip_primary: '#54d2d2',
      chip_primary__light: '#54d2d240',
      chip_warning: '#e08c0f',
      chip_warning__light: '#FFF3C8',
      chip_success: '#16843b',
      chip_success__light: 'rgba(90, 255, 146, 0.5)',
      chip_default: '#4D4D4D',
      chip_default__light: '#CFCDCD',
      chip_error: '#FF0D0D',
      chip_error__light: 'rgba(255, 130, 130, 0.5)',
    },
    extend: {
      boxShadow: {
        inner: '#586C8A30 2px 2px 4px inset, white -3px -3px 4px inset',
        'inner-sm': '#586C8A30 1px 1px 4px inset, #18B5D12F -1.5px -1.5px 4px inset',
        navbtn: '4px 4px 7px rgba(0, 0, 0, 0.07), -4px -4px 13px #FFFFFF, 6px 6px 36px rgba(0, 0, 0, 0.06)',
        icnbtn: '-6px -6px 6px rgba(255, 255, 255, 0.5), 6px 6px 10px rgba(109, 129, 161, 0.25)',
        breadcrumb: '#586C8A30 1px -1px 4px inset, #586C8A30 4px 2px 4px inset, white -2px 0px 4px inset',
        btn: '2.74576px 2.74576px 4.80508px rgba(0, 0, 0, 0.07), -2.74576px -2.74576px 8.92373px #FFFFFF, 4.11864px 4.11864px 24.7119px rgba(0, 0, 0, 0.06)',
      },

    },
    screens: {
      md: '920px',
    }
  },
  plugins: [],

  corePlugins: {
    preflight: false,
  },

};
