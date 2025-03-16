"use client";

import React, { useState } from "react";
import SearchBox from "./components/common/searcbox";
import DynamicTable from "./components/common/dynamictables";

export default function DynamicSP() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleExecuteSP = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/fetch-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      // Filter and combine columns
      const transformedData = result.map((item ,index) => ({
        id: index + 1, // Use the index as a unique identifier
        combinedDoc: `${item.DocNoDFS}-${item.DocDateDfs}`,
        combinedStatus: `${item.DocStatusText}-${item.DescDTS}`,
        fromdescdof: item.FromDescDFS,
        fromdatedfs: item.FromDateDFS,
      }));
      

      // Define columns with unique IDs
      const dynamicColumns = [
        { id: "combinedDoc", accessorKey: "combinedDoc", header: "شماره سند - تاریخ سند", width: 200 },
        { id: "combinedStatus", accessorKey: "combinedStatus", header: "نوع سند - وضعیت سند", width: 200 },
        { id: "fromdescdof", accessorKey: "fromdescdof", header: "عنوان", width: 150 },
        { id: "fromdatedfs", accessorKey: "fromdatedfs", header: "زمان ایجاد", width: 150 },
      ];
      

      setColumns(dynamicColumns);
      setData(transformedData);

    } catch (error) {
      console.error("Error executing stored procedure:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flx flx-row ml-4 mr-4">
      <div>
        <h1>Dynamic Stored Procedure Runner</h1>
        <SearchBox />
        <button onClick={handleExecuteSP} disabled={loading}>
          {loading ? "Executing..." : "Run Stored Procedure"}
        </button>
      </div>
      <div>
        <DynamicTable data={data} columns={columns} />
      </div>
    </div>
  );
}
