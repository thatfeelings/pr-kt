"use client";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

// Configure RTL cache
const rtlCache = createCache({
  key: "mui-rtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

// Define Material-UI Theme with RTL support
const theme = createTheme({
  direction: "rtl", // Enables right-to-left support globally
  palette: {
    mode: "light", // Switch to 'dark' for dark mode
    primary: {
      main: "#1976d2", // Customize primary color
    },
    background: {
      default: "#f5f5f5", // Customize background color
    },
  },
  typography: {
    fontFamily: `"Roboto", "Arial", sans-serif`,
  },
});

// RTL Theme Provider Component
export default function RTLThemeProvider({ children }) {
  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
