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

  return (

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
              NoRowsOverlay: () => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontWeight: "bold", // Make the text bold if needed
                    fontSize: "18px", // Adjust font size
                  }}
                >
                  هیچ داده‌ای موجود نیست {/* Change the placeholder text to Persian */}
                </Box>
              ),
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
              "& .MuiDataGrid-columnHeaders": {
                fontWeight: "bold !important", // Set bold font weight for column headers
              },
              "& .MuiDataGrid-columnSeparator": {
                left: "auto !important", // ✅ Ensure resizing handle is positioned on the left
                right: "0 !important",
                transform: "scaleX(-1)" // ✅ Reverse resizing logic so dragging right shrinks
              }
            }}
          />
          {/* </Paper> */}
        </div>

  );
}
