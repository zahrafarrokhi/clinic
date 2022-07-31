## adding git ssh keys

[Generating a new ssh key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
[Adding ssh keys to your account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)

## Git commands
[Git tutorial](https://learngitbranching.js.org/)

# install
```bash
npm create-next-app frontend
cd frontend
rm -rdf .git

```
### install tailwind
#### nextjs tailwind
[nextjs tailwind](https://tailwindcss.com/docs/guides/nextjs)
```jsx

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
`tailwind.config.js`
```jsx
/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
Add this to tailwind config in order to disabled preflight(it styles tags like buttons/h2/...)
```js
  corePlugins: { 
    preflight: false, 
  },
```
`globals.css`
```css
//remove prev content
@tailwind base;
@tailwind components;
@tailwind utilities;

```

### NEXTJS MUI
[mui](https://www.geeksforgeeks.org/how-to-use-material-ui-with-next-js/)
```jsx

npm install @mui/material @emotion/react @emotion/styled @emotion/server
```

Be sure to add(or just don't remove it in the first place) `globals.css` to _app.js

```jsx
import "../styles/globals.css";
```

#### MUI rtl

[Mui RTL config](https://mui.com/material-ui/guides/right-to-left/)


#### Importing tailwind colors to mui

Sample:
```js


tailwind = {
  primary: 'blue',
  primary__contrastText: 'white',
  secondary: 'red',
  secondary__contrastText: 'yellow',
}
console.log(
  Object.keys(tailwind))

console.log(
  Object.keys(tailwind).reduce((prev, cur) => {
    return ({...prev, [cur]: '1'})
  }, {}))

console.log(
  Object.keys(tailwind).reduce((prev, cur) => {
    const main = cur.split('__')[0]
    const secondary = cur.split('__').length > 1 ? cur.split('__').slice(1).join('__') : 'main'

    console.log(main, secondary)
    return ({...prev, [cur]: '1'})
  }, {}))

  console.log(
    Object.keys(tailwind).reduce((prev, cur) => {
      const main = cur.split('__')[0]
      const secondary = cur.split('__').length > 1 ? cur.split('__').slice(1).join('__') : 'main'
  
      console.log(main, secondary)
      return ({...prev, [main]: {
        ...prev[main],
        [secondary]: tailwind[cur]
      }})
    }, {}))
  
```

`theme.js`

```jsx

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
});
```


### Page: auth/login
Not updating the state if value is null:
In js, converting null/undefined to boolean results in false.
```jsx
val && setState()
```
checks if val is false, if val is null/undefined, setState won't run.

```jsx
const PHONENUMBER = "phone_number";
const EMAIL = "email";

...

      <div className="flex flex-col items-center flex-grow">
      <div className="flex">
        <ToggleButtonGroup
          value={selected}
          // onChange={(e, val) => {
          //   if(val)
          //     setSelected(val)
          // }}
          onChange={(e, val) => val && setSelected(val)}
          // Fix newValue.splice error
          exclusive
        >
           <ToggleButton value={PHONENUMBER}>تلفن همراه</ToggleButton>
          <ToggleButton value={EMAIL}>ایمیل</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
```

#### style ToggleButtonGroup

```jsx


const PHONENUMBER = "phone_number";
const EMAIL = "email";

export default function Login() {
  const [selected, setSelected] = useState(PHONENUMBER);
  const theme = useTheme();
  return (
    <div className="flex flex-col items-center flex-grow">
      <div className="flex">
        <ToggleButtonGroup
          value={selected}
          onChange={(e, val) => val && setSelected(val)}
          // Fix newValue.splice error
          exclusive
          sx={{
            border: `1px solid ${theme.palette.border.main}`,
            borderRadius: "0.5em !important",
            "& .MuiToggleButtonGroup-grouped": {
              border: 0,
              borderRadius: "0.5em !important",
              width: "8em",
            },
          }}
        >
         <ToggleButton value={PHONENUMBER}>تلفن همراه</ToggleButton>
          <ToggleButton value={EMAIL}>ایمیل</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}


```

### style ToggleButtonGroup mobile

```jsx

const PHONENUMBER = "phone_number";
const EMAIL = "email";

export default function Login() {
  const [selected, setSelected] = useState(PHONENUMBER);
  const theme = useTheme();
  return (
    <div className="flex flex-col items-center flex-grow py-6 md:p-12">
      <div className="flex w-full justify-center">
        <ToggleButtonGroup
          value={selected}
         
          onChange={(e, val) => val && setSelected(val)}
          // Fix newValue.splice error
          exclusive
          sx={{
            border: `1px solid ${theme.palette.border.main}`,
            borderRadius: "0.5em !important",
            [theme.breakpoints.down("md")]: {
              padding: "0.25em",
              flexBasis: "80%",
            },
            "& .MuiToggleButtonGroup-grouped": {
              border: 0,
              borderRadius: "0.5em !important",
              width: "50%",
              [theme.breakpoints.up("md")]: {
                width: "12em",
              },
            },
          }}
          // color="primary"
        >
        <ToggleButton value={PHONENUMBER}>تلفن همراه</ToggleButton>
          <ToggleButton value={EMAIL}>ایمیل</ToggleButton>
        </ToggleButtonGroup>
      </div>
      
    </div>
  );
}

```