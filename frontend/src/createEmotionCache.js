import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

export default function createEmotionCache() {
  return createCache({
    key: "css",
    prepend: true,
    stylisPlugins: [prefixer, rtlPlugin],
  });
}
