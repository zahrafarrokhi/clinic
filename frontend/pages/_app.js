import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import "../styles/globals.css";
import { wrapper } from "../lib/store";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Client-side cache shared for the whole session
// of the user in the browser.

const clientSideEmotionCache = createEmotionCache();
function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);
  const store = useStore();


  return (
    <PersistGate persistor={store.__PERSISTOR} loading={null}>

    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant,
				consistent, and simple baseline to
				build upon. */}

        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
      </CacheProvider>
      </PersistGate>

  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};


export default wrapper.withRedux(MyApp)