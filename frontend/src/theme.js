import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import tailwindConfig from "../tailwind.config";



// Create a theme instance.
const theme = createTheme({
  direction: "rtl",
  palette: {
    ...Object.keys(tailwindConfig.theme.colors).reduce((prev, cur) => {
      const primary = cur.split('__')[0]
      const secondary = cur.split('__').length > 1 ? cur.split('__').slice(1).join('__') : 'main'
      return (
      {
        ...prev, 
        [primary]: {
          ...prev[primary],
          [secondary]: tailwindConfig.theme.colors[cur]
        }
      }
    )
    }, {})
  },
  typography: {
    fontFamily: 'IRANSans',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-input': {
            paddingTop: '12px',
            paddingBottom: '12px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '.6em',
          },
        },
      },
    },
  }
});

export default theme;
