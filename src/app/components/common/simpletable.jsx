import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const DocTable = ({ rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        {/* Table Header */}
        <TableHead>
          <TableRow>
            <TableCell align="center">ردیف</TableCell>
            <TableCell align="center">شرح</TableCell>
            <TableCell align="center">مقدار</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">{index + 1}</TableCell> {/* Auto-incremented index */}
              <TableCell align="center">{row.TitleStr}</TableCell>
              <TableCell align="center">{row.valueStr}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DocTable;
