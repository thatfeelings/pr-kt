"use client";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

const rtlCache = createCache({
  key: "mui-rtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function CacheProviderWrapper({ children }) {
  return <CacheProvider value={rtlCache}>{children}</CacheProvider>;
}
