import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";

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
                backgroundColor: "#f5f5f5", // Optional: Add background color to the header for visibility
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold", // Make header title bold
                fontSize: "16px",   // Adjust the font size if needed
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
