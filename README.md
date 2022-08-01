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

