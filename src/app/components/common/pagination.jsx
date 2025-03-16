import React from "react";

const Pagination = ({ pageIndex, totalPages, rowsPerPage, onPageChange, onRowsPerPageChange }) => {
  return (
    <div className="flex justify-between items-center mt-4">
      {/* Rows per page selector */}
      <div className="flex items-center space-x-2">
        <label className="text-black">Rows per page:</label>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="border border-gray-300 text-black"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* Pagination controls */}
      <div className="flex space-x-2">
        <button
          onClick={() => onPageChange(0)}
          className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
          disabled={pageIndex === 0}
        >
          First
        </button>
        <button
          onClick={() => onPageChange(pageIndex - 1)}
          className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
          disabled={pageIndex === 0}
        >
          Previous
        </button>
        <span className="text-black">
          Page {pageIndex + 1} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(pageIndex + 1)}
          className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
          disabled={pageIndex === totalPages - 1}
        >
          Next
        </button>
        <button
          onClick={() => onPageChange(totalPages - 1)}
          className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
          disabled={pageIndex === totalPages - 1}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Pagination;
