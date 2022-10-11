import { alpha, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import tailwindConfig from "../tailwind.config";

// Create a theme instance.
let theme = createTheme({
  direction: "rtl",
  palette: {
    ...Object.keys(tailwindConfig.theme.colors).reduce((prev, cur) => {
      const primary = cur.split("__")[0];
      const secondary =
        cur.split("__").length > 1
          ? cur.split("__").slice(1).join("__")
          : "main";
      return {
        ...prev,
        [primary]: {
          ...prev[primary],
          [secondary]: tailwindConfig.theme.colors[cur],
        },
      };
    }, {}),
  },
  typography: {
    fontFamily: "IRANSansMobile",
    fontSize: 14,
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
      },
    },

    MuiOutlinedInput: {
      // variants: [
      //   {
      //     props: [{}]
      //   }
      // ]
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiSelect-select": {
            fontSize: "1rem",
          },
          "& .MuiInputBase-root": {
            borderRadius: "10px",
            background: "#FFFFFF",
            // boxShadow: '#586C8A30 2px 2px 4px inset, #cfcdcd -3px -3px 4px inset',
          },
          borderRadius: "10px",
          "& .MuiOutlinedInput-notchedOutline": {
            // border:`1px solid ${theme.palette.primary.main}`,
            // border: '1px solid rgba(255, 255, 255, 0.6)',
            borderRadius: "10px",
          },
          "&:hover, &:focus, &:active": {
            boxShadow: "unset",

            "& .MuiOutlinedInput-notchedOutline": {
              border: `1px solid ${theme.palette.primary.main} !important`,
              "& span": {
                backgroundColor: theme.palette.white.main,
              },
              "& legend": {
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
          props: { variant: "opace" },
          style: (params) => {
            const { ownerState, theme } = params;
            const { color } = ownerState;
            return {
              backgroundColor: alpha(theme.palette[color].main, 0.55),
              color: theme.palette[color].contrastText,
              fontWeight: "bold",

              boxShadow:
                "-6px -6px 6px rgba(255, 255, 255, 0.5), 6px 6px 10px rgba(109, 129, 161, 0.25)",
              "&:hover,&:focus,&:active": {
                backgroundColor: alpha(theme.palette[color].main, 0.9),
              },
            };
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
          padding: "0.75rem",
        },

        contained: {
          boxShadow:
            "-6px -6px 6px rgba(255, 255, 255, 0.5), 6px 6px 10px rgba(109, 129, 161, 0.25)",
        },
      },
    },
    MuiToggleButton: {
      variants: [
        {
          props: { variant: "list" },
          style: ({ theme, ownerState }) => {
            return {
              borderRadius: "0.5rem",
            };
          },
        },
        {
          props: { variant: "list", selected: true },
          style: ({ theme, ownerState }) => {
            return {
              borderRadius: "0.5rem",
              // borderWidth: '2px',
              borderColor: theme.palette[ownerState.color].light,
            };
          },
        },
      ],
    },
    MuiChip: {
      variants: [
        {
          props: { variant: "status" },
          style: ({ theme, ownerState }) => {
            let color = ownerState.color
            // console.log(color)
            if (!color) {
              color = 'chip_warning'
            } else {
              color = `chip_${color}`
            }
            // console.log(color, theme.palette[color])

            return {
              borderRadius: "1em",
              padding: "1.25rem 0",
              width: "25ch",
              ['& .MuiChip-label']: {
                fontWeight: 'bold',
                fontSize: '15px',
              },
              color: theme.palette[color].main, // `${color}.main` = 'chip_danger.main'
              backgroundColor:
                theme.palette[color].light,
            };
          },
        },
      ],
    },
  },
});

export default theme;
