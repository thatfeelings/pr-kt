"use client";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { IconContext } from "@phosphor-icons/react";

// Configure RTL cache
const rtlCache = createCache({
    key: "mui-rtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

// Define Material-UI Theme with RTL support
const theme = createTheme({
    direction: "rtl", // Enables right-to-left support globally

    components: {
        MuiDataGrid: {
            defaultProps: {
                localeText: {
                    MuiTablePagination: {
                        labelRowsPerPage: "تعداد سطر در هر صفحه",
                        labelDisplayedRows: ({ from, to, count }) =>
                            `${from}-${to} از ${count}`
                    }
                }
            },
            styleOverrides: {
                root: {
                    "& .MuiDataGrid-columnHeaders": {
                        fontWeight: "bold !important " // Set bold font weight for column headers
                    }
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    width: "252px",
                    height: "56px", // Adjust the height as needed
                    borderRadius: 8, // Rounded corners
                    backgroundColor: "#FFFFF", // Background color
                    "& .MuiInputBase-root": {
                        borderRadius: 8, // Rounded corners
                        backgroundColor: "#f9f9f9" // Background color
                    },

                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ACACAC" // Default border color
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#18222F" // Hover border color
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#18222F" // Focused border color
                    },
                    "&.Mui-active .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#18222F" // Focused border color
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    width: "115px",
                    height: "40px",
                    borderRadius: "100px", // Rounded corners
                    backgroundColor: "#18222F", // Background color
                    "& .MuiInputBase-root": {
                        borderRadius: 8, // Rounded corners
                        backgroundColor: "#f9f9f9" // Background color
                    },

                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ACACAC" // Default border color
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#18222F" // Hover border color
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#18222F" // Focused border color
                    },
                    "&.Mui-active .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#18222F" // Focused border color
                    }
                }
            }
        }
    },
    palette: {
        mode: "light", // Switch to 'dark' for dark mode
        primary: {
            main: "#1976d2" // Customize primary color
        },
        background: {
            default: "#f5f5f5" // Customize background color
        }
    },
    typography: {
        
        fontFamily: `IRANYekanX`
    }
});


// RTL Theme Provider Component
export default function RTLThemeProvider({ children }) {
    return (
        <CacheProvider value={rtlCache}>
            <ThemeProvider theme={theme}>
                <IconContext.Provider
                    value={{
                        color: "#000000", // Primary color
                        size: 24, // Default size
                    }}
                >
                    <CssBaseline />
                    {children}
                </IconContext.Provider>
            </ThemeProvider>
        </CacheProvider>
    );
}
