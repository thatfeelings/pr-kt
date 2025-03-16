import React, { useState } from "react";
import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table";

const DynamicTable = ({ columns, data }) => {
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows

   // Add auto-incrementing ID to each row
   const dataWithIds = data.map((item, index) => ({
    id: index + 1, // Auto-increment ID starting from 1
    ...item,
  }));

  // Handle "Select All" checkbox
  const handleSelectAll = (e, table) => {
    const isChecked = e.target.checked;
    const allRowIds = table.getRowModel().rows.map((row) => row.id); // Get all row IDs
    setSelectedRows(isChecked ? allRowIds : []); // Select all or clear selection
  };

  // Handle individual row selection
  const handleRowSelection = (rowId, isChecked) => {
    setSelectedRows((prev) =>
      isChecked ? [...prev, rowId] : prev.filter((id) => id !== rowId)
    );
  };

  // Add checkbox column
  const enhancedColumns = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          onChange={(e) => handleSelectAll(e, table)}
          checked={
            table.getRowModel().rows.length > 0 &&
            selectedRows.length === table.getRowModel().rows.length
          }
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row.id)}
          onChange={(e) => handleRowSelection(row.id, e.target.checked)}
        />
      ),
    },
    ...columns, // Keep your existing columns
  ];

  // Initialize table with enhanced columns
  const table = useReactTable({
    data: dataWithIds,
    columns: enhancedColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-gray-300 px-4 py-2 text-center text-black"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`text-black ${row.index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display selected rows */}
      <div className="mt-4">
        <p>Selected Rows: {selectedRows.join(", ")}</p>
      </div>
    </div>
  );
};

export default DynamicTable;
