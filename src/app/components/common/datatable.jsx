import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
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

export default function DataTable({ rows, columns, isLoading }) {
  const existingTheme = useTheme();

  const theme = React.useMemo(
    () =>
      createTheme({}, arSD, existingTheme, {
        direction: "rtl",
        components: {
          MuiDataGrid: {
            defaultProps: {
              localeText: {
                MuiTablePagination: {
                  labelRowsPerPage: "تعداد سطر در هر صفحه", // ✅ Change "Rows per page" text to Persian
                  labelDisplayedRows: ({ from, to, count }) =>
                    `${from}-${to} از ${count}` // ✅ Example: "1-10 از 50"
                }
              }
            }
          }
        }
      }),
    [existingTheme]
  );

  return (
    // < Paper sx={{ height: 'calc(100vh - 200px)', width: '100%', direction: 'rtl' }} >
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl" style={{ height: "100%", width: "100%" }}>
          <DataGrid
            loading={isLoading}
            rows={rows}
            columns={columns}
            pageSizeOptions={[10, 20, 30]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } }
            }}
            autoPageSize={false}
            checkboxSelection
            disableColumnSelector
            components={{
              LoadingOverlay: () => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%"
                  }}
                >
                  <CircularProgress color="primary" />{" "}
                  {/* ✅ Centered loading icon */}
                </Box>
              )
            }}
            sx={{

              "& .MuiDataGrid-columnSeparator": {
                left: "auto !important", // ✅ Ensure resizing handle is positioned on the left
                right: "0 !important",
                transform: "scaleX(-1)" // ✅ Reverse resizing logic so dragging right shrinks
              }
            }}
          />
          {/* </Paper> */}
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
