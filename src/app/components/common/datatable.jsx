import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { Box } from "@mui/material";


const cacheRtl = createCache({
  key: "data-grid-rtl-demo",
  stylisPlugins: [prefixer, rtlPlugin]
});

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({ rows, columns, isLoading }) {

  return (
    <Box
  sx={{
    height: "500px",      // Define a fixed height for the table container
    overflowY: "auto",    // Enable vertical scrolling
    width: "100%",        // Full width for the container
    boxSizing: "border-box", // Consistent sizing
  }}
>
      <DataGrid
        loading={isLoading}
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 20, 30]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
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
              {"هیچ داده‌ای موجود نیست"}
              {/* Change the placeholder text to Persian */}
            </Box>
          ),
          LoadingOverlay: () => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                position: "relative", // Add this line to make the container position relative

              }}
            >
              <CircularProgress color="primary" />{" "}
              {/* ✅ Centered loading icon */}
            </Box>
          ),
        }}
        sx={{
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            position: "sticky !important", // Makes the header sticky
            top: 0, // Pins it to the top
            zIndex: 2, // Ensures it stays above other content
            backgroundColor: "#f5f5f5",
          }, // Optional: Add background color              },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold", // Make header title bold
            fontSize: "16px", // Adjust the font size if needed
          },
          "& .MuiDataGrid-columnSeparator": {
            left: "auto !important", // ✅ Ensure resizing handle is positioned on the left
            right: "0 !important",
            transform: "scaleX(-1)", // ✅ Reverse resizing logic so dragging right shrinks
          },
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#f9f9f9", // Light gray background for odd rows
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#ffffff",} // Optional: Ensures even rows have a white background
        }}
      />
    </Box>
  );
}
