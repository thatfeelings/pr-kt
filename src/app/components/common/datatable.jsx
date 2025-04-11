import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { arSD } from "@mui/x-data-grid/locales";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

const cacheRtl = createCache({
  key: "data-grid-rtl-demo",
  stylisPlugins: [prefixer, rtlPlugin]
});

const paginationModel = { page: 0, pageSize: 5 };



export default function DataTable({ rows, columns }) {

  const existingTheme = useTheme();

  const theme = React.useMemo(
    () =>
      createTheme({}, arSD, existingTheme, {
        direction: "rtl"
      }),
    [existingTheme]
  );

  return (
    // < Paper sx={{ height: 'calc(100vh - 200px)', width: '100%', direction: 'rtl' }} >
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl" style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableColumnSelector
          />
          {/* </Paper> */}
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
