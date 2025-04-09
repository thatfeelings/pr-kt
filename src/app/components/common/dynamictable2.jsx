import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const paginationModel = { page: 0, pageSize: 5 };



export default function DataTable({ rows, columns }) {
  return (
      < Paper sx={{ height: 'calc(100vh - 200px)', width: '100%', direction: 'rtl' }} >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableColumnSelector
          />
      </Paper>
  );
}
