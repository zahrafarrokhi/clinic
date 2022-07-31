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

#### MUI rtl

[Mui RTL config](https://mui.com/material-ui/guides/right-to-left/)


