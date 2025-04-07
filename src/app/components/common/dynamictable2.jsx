import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const paginationModel = { page: 0, pageSize: 5 };

const theme = createTheme({
  direction: 'rtl',
});


export default function DataTable({ rows, columns }) {
  return (
    <ThemeProvider theme={theme}>
      < Paper sx={{ height: 'calc(100vh - 200px)', width: '100%', direction: 'rtl' }} >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableColumnSelector
          sx={{
            "& .MuiDataGrid-columnHeader": {
              position: "relative",
              textAlign: "right", // Ensures headers are RTL
            },
            "& .MuiDataGrid-columnSeparator": {
              right: "auto",
              left: 0
            },
            direction: 'rtl',
            border: 0,
            "& .MuiDataGrid-cell": {
              color: "black", // Ensures cell text is black
              textAlign: "right", // Ensures data is aligned RTL
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              direction: "rtl", // Ensures column headers respect RTL
              textAlign: "right",
            }
          }} />
      </Paper>
    </ThemeProvider>
  );
}
