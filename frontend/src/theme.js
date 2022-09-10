import { alpha, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import tailwindConfig from "../tailwind.config";



// Create a theme instance.
let theme = createTheme({
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
    fontFamily: 'IRANSansMobile',
  },
  components: {
   
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiInputBase-root': {
            borderRadius: '10px',
            background: '#FFFFFF',
            // boxShadow: '#586C8A30 2px 2px 4px inset, #cfcdcd -3px -3px 4px inset',
          },
          borderRadius: '10px',
          '& .MuiOutlinedInput-notchedOutline': {
            // border:`1px solid ${theme.palette.primary.main}`,
            // border: '1px solid rgba(255, 255, 255, 0.6)',
            borderRadius: '10px',
          },
          '&:hover, &:focus, &:active': {
            boxShadow: 'unset',

            '& .MuiOutlinedInput-notchedOutline': {
              border: `1px solid ${theme.palette.primary.main} !important`,
              '& span': {
                backgroundColor: theme.palette.white.main,
              },
              '& legend': {
                backgroundColor: theme.palette.white.main,
              },
            },
          },

        }),
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'opace' },
          style: (params) => {
            const { ownerState, theme } = params;
            const { color } = ownerState;
            return ({
              backgroundColor: alpha(theme.palette[color].main, 0.55),
              color: theme.palette[color].contrastText,
              fontWeight: 'bold',

              boxShadow: '-6px -6px 6px rgba(255, 255, 255, 0.5), 6px 6px 10px rgba(109, 129, 161, 0.25)',
              '&:hover,&:focus,&:active': {
                backgroundColor: alpha(theme.palette[color].main, 0.9),

              },
            });
          },

        },
      ],
      styleOverrides: {

        contained: {
          boxShadow: '-6px -6px 6px rgba(255, 255, 255, 0.5), 6px 6px 10px rgba(109, 129, 161, 0.25)',

        }
      },
    },
  }
});


export default theme;
