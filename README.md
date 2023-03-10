## adding git ssh keys

[Generating a new ssh key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
[Adding ssh keys to your account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)

## Git commands
[Git tutorial](https://learngitbranching.js.org/)

# install
```bash
npx create-next-app frontend
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
## Installing mui
[mui](https://mui.com/material-ui/getting-started/installation/)

```jsx
cd frontend

npm install @mui/material @emotion/react @emotion/styled @emotion/server @emotion/cache

* @mui/material
* @emotion/react
* @emotion/server
* @emotion/styled
* @emotion/cache
```

Be sure to add(or just don't remove it in the first place) `globals.css` to _app.js

```jsx
import "../styles/globals.css";

```


#### How to use Material-UI with Next.js ?
### NEXTJS MUI
[material-ui-with-next-js](https://www.geeksforgeeks.org/how-to-use-material-ui-with-next-js/)
[Next.Js + MUI v5 tutorial](https://dev.to/hajhosein/nextjs-mui-v5-tutorial-2k35)

##### Step 1: Create a custom file /pages/\_document.js

##### Step 2: Create  src folder, add theme.js and createEmotionCache.js

```jsx
// theme.js
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;
//createEmotionCache.js
import createCache from '@emotion/cache';

export default function createEmotionCache() {
    return createCache({ key: 'css', prepend: true });
}
```
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
##### Step 3: Update the file /pages/\_app.js
#### import '../styles/globals.scss'; (npm i sass)

```jsx
// import '../styles/globals.css'
import "../styles/globals.scss";
// import 'tailwindcss/tailwind.css';
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/system";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
```
##### Step 4: Update the file /pages/index.js

```jsx
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a> integrated with{" "}
          <a href="https://mui.com/">Material-UI!</a>
        </h1>
        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>
      </main>
    </div>
  );
}
```

##### Steps to run the application: To run the app, type the following command in the terminal.

```jsx
npm run dev

out => Welcome to Next.js! integrated with Material-UI!
```

#### MUI rtl

[Mui RTL config](https://mui.com/material-ui/guides/right-to-left/)
```jsx
1._document.js =><Html lang="en" dir="rtl"></html>

2.theme
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl',
});
3.npm install stylis stylis-plugin-rtl
4.createCache => stylisPlugins: [prefixer, rtlPlugin],
```
#### eslint config
```jsx
{
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": [
		"eslint:recommended", "plugin:react/recommended", "next",
		"next/core-web-vitals", "airbnb"
	],
	"settings": {
		"react": {
			"version": "detect"
		}
	},
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules":  {
		"react/react-in-jsx-scopre": "off"
	}
}


```
##### add fonts

```jsx
1_puplic/fonts
2_styles/_fonts.scss
3_styles/globals.scss
@import "fonts";
html,
body {
  height: 100%;
  padding: 0;
  margin: 0;

  font-family: "IRANSansMobile" !important;
  @screen md {
    font-family: "IRANSans" !important;
  }
}
```
4_
```
// tailwind.config.js
 extend: {
      fontFamily: {
        iranSansWeb: 'iranSansWeb',
        iranSansMobile: 'iranSansMobile',
        iranSansLight: 'iranSansLight',
        iranSansBold: 'iranSansBold',
        hack: 'HACK',
        hackwin: 'HACKWIN',
        anonymice: 'anonymice',
        anonymiceWin: 'anonymice-win',
      },}
```
```jsx
// test
//index.js
<h1 className="text-3xl font-bold underline bg-secondary font-['hackwin']">
                   Hello world!
</h1>
// console.log
.font-\[\'hackwin\'\] {
    font-family: 'hackwin';
}
```
5_ mui
```jsx
`theme.js`

// Create a theme instance.
let theme = createTheme({
  ...
  typography: {
    fontFamily: 'IRANSans',
  },

});
```
##### add ar config

```jsx
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  reactStrictMode: true,
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["ar"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "ar",
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    // domains: [
    //   {
    //     domain: 'example.com',
    //     defaultLocale: 'en-US',
    //   },
    // ],
  },
};

module.exports = nextConfig;

//
// pages/_document.js
// Done! (with install mui)
```

##### globals.scss

```jsx
#__next {
  height: 100%;
  width: 100vw;
}
```
#### add svg config

```jsx
npm i @svgr/webpack
```
```jsx
// next.config.js
/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "node_modules")],
  },
   i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["ar"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "ar",
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    // domains: [
    //   {
    //     domain: 'example.com',
    //     defaultLocale: 'en-US',
    //   },
    // ],
  },
    exclude: /\.svg$/,
  poweredByHeader: false,
  inlineImageLimit: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
        // test: /\.(js|ts)x?$/,
      },
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            prettier: false,
            svgo: true,
            titleProp: true,
          },
        },
      ],
    });
    return config;
  },
};
module.exports = nextConfig;
```
### Add icons package
```bash
npm i @mui/icons-material
npm i react-icons
```

### axios
```bash
npm i axios axios-auth-refresh
 
```
create lib folder
`lib\axios.js`
```jsx
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    common: {
      'Accept-Language': 'ir',
    },
  },
});

export const setupInterceptors = (store) => {
  createAuthRefreshInterceptor(axiosInstance, (failedRequest) => axiosInstance
    .post('/api/auth/refresh/', {
      user_id: store.getState().authReducer?.username,
      refresh: store.getState().authReducer?.refreshToken,
    })
    .then((resp) => {
      const { access_tok: accessToken } = resp.data;
      const bearer = `${
        process.env.JWT_AUTH_HEADER ?? 'Bearer'
      } ${accessToken}`;
      console.log(accessToken);
      axiosInstance.defaults.headers.common.Authorization = bearer;

      failedRequest.response.config.headers.Authorization = bearer;
      return Promise.resolve();
    }), { statusCodes: [401, 403] });
};

// Create axios interceptor
export default axiosInstance;

```
### add .env 

```jsx
BACKEND_BASE_URL=http://localhost:8000
```
and 
`lib\utils.js`
```jsx
import axios from './axios';

export const preventLettersTyping = (x) => x.replace(/[^\d]/g, '');

export const persianToEnglishDigits = (digit) => String(digit)
  .replace(/[??-??]/g, (d) => '????????????????????'.indexOf(d))
  .replace(/[??-??]/g, (d) => '????????????????????'.indexOf(d));

export const Android = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf('android') > -1;
};

export const IOS = () => [
  'iPad Simulator',
  'iPhone Simulator',
  'iPod Simulator',
  'iPad',
  'iPhone',
  'iPod',
].includes(window.navigator.platform)
  // iPad on iOS 13 detection
  || (window.navigator.userAgent.includes('Mac') && 'ontouchend' in document);


export const logout = (dispatch) => {
  /* eslint-disable import/no-named-as-default-member, global-require */
  dispatch(require('./slices/auth').reset());

  delete axios.defaults.headers.Authorization;
  /* eslint-enable import/no-named-as-default-member */
};

```
### Add redux
```bash 
npm i redux react-redux redux-persist redux-thunk @reduxjs/toolkit next-redux-wrapper
```
`lib\store.js`
```jsx
import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
// import { compose } from 'redux';
import { createWrapper, MakeStore, HYDRATE } from 'next-redux-wrapper';
import { persistStore } from 'redux-persist';
//auth  example
// import { authSlice } from './slices/auth';


const makeStore = (initialState) => {
  let store;
  const isClient = typeof window !== 'undefined';

  if (isClient) {
    const { persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const combinedReducers = combineReducers({
      //auth example
      // authReducer: authSlice.reducer,
      
    });

    const rootReducer = (state, action) => {
      if (action.type === HYDRATE) {
        const nextState = {
          ...state,
          ...action.payload,
        };
        return nextState;
      }
      return combinedReducers(state, action);
    };

    const persistConfig = {
      key: 'root',
      storage,
    };

    const persistedReducers = persistReducer(persistConfig, rootReducer); // Wrapper reducers: if incoming actions are persist actions, run persist commands otherwise use rootReducer to update the state

    store = configureStore({
      reducer: persistedReducers, preloadedState: initialState, middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(thunk), devTools: { shouldStartLocked: false },
    });

    store.__PERSISTOR = persistStore(store);
  } else {
    const combinedReducers = combineReducers({
      //auth example
      // authReducer: authSlice.reducer,
      
    });

    const rootReducer = (state, action) => {
      if (action.type === HYDRATE) {
        const nextState = {
          ...state,
          ...action.payload,
        };
        return nextState;
      }
      return combinedReducers(state, action);
    };
    store = configureStore({ reducer: rootReducer, preloadedState: initialState, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk) });
  }
  return store;
};
export const wrapper = createWrapper(makeStore, { storeKey: 'key' });


```
### connection to back
```jsx
// lib/slice/visit.js
//loadVisitsPatient
export const loadVisitsPatient = createAsyncThunk(
  'visits/list',
  async ({patient_id, ...data}, thunkAPI) => {

    try {
      const response = await axios.get(`/api/visits/visit/patient/${patient_id}/`, {params: data});

      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);
//visit/index.jsx

  const lstVisits =  async () => {
        try {
          await dispatch(
            loadVisitsPatient({
             backend(models field): frontend(state)
            })
          ).unwrap();
        } catch (error) {
       
        }
      }

// lstVisits run loadVisitsPatient
// we need lstVisits because useEffect can't be async
 

await dispatch(loadVisitsPatient(payload={backend(models field): frontend(state)})
		|
		v
export const loadVisitsPatient = createAsyncThunk(
  async (payload, thunkAPI) => {
    const {patient_id, ...data} = payload
    const response = await axios.get(`/api/visits/visit/patient/${patient_id}/`, {params: data});
// for example:
// http://localhost:3000/api/visits/visit/patient/3/?ordering=created_at&created_at__date__lte=2022-10-20&created_at__date__gte=2022-10-02&status__in=started,waiting_for_payment&search=&limit=10&offset=0
// {"count":12,"next":"http://localhost:8000/api/visits/visit/patient/3/?created_at__date__gte=2022-10-02&created_at__date__lte=2022-10-20&limit=10&offset=10&ordering=created_at&search=&status__in=started%2Cwaiting_for_payment","previous":null,"results":[{"id":1,"doctor":{"user":7,"first_name":"parham","last_name":"??????","department":{"id":2,"name":"eye","faname":"??????","icon":"http://localhost:8000/media/Eye.svg"},"image":null,"degree":"full_doctor","medical_code":"1212","description":"dldldldld","office":{"id":2,"location":{"type":"Point","coordinates":[54.5727753639221,34.34947143384983]},"address":"kddkdkd","open_hours":"???????? ???? ???????????????? 14:00 ?????? 19:00","postal_code":"7657","phone_number":"0992832729"}},"payment":{"id":8,"created_at":"2022-10-18T12:58:07.287070Z","amount":500000,"card_number":null,"rrn":null,"ref_id":"internal error","status":"pending","user":4},"created_at":"2022-10-18T12:58:32.771032Z","updated_at":"2022-10-18T12:58:32.771042Z","status":"waiting_for_payment","patient":3},...]
export const loadVisitsPatient = createAsyncThunk(
  async (...) => {
      const response = await axios.get(`/api/visits/visit/patient/${patient_id}/`, {params: data});
		|
		v
      return { data: response.data };
  },
);

builder.addCase(loadVisitsPatient.fulfilled, (state, action) => {
	state.loading = IDLE;
	//total data => action.payload.data
	//up => {...respose.data } or response.data => action.payload
	state.visits = action.payload.data;

	return state;
});
// lib/store.js
// save in redux store:

const combinedReducers = combineReducers({
	...
	visitReducer :visitSlice.reducer,

});

//visit/index.jsx
  const count = useSelector((state) => state.visitReducer?.visits?.count); //pagination
  const visits = useSelector((state) => state.visitReducer?.visits?.results);
  
    {visits?.map(...)}
```
