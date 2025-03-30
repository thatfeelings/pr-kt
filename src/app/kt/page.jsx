"use client";

import React, { useState } from "react";
import SearchBox from "./components/common/searcbox";
import DynamicTable from "./components/common/dynamictables";
import DataTable from "./components/common/dynamictable2";
import KtRadio from "./components/common/ktradio";

export default function DynamicSP() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleExecuteSP = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/dbo-pubdochandling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      // Filter and combine columns
      const transformedData = result.slice(0 ,20).map((item ,index) => ({
        id: index + 1, // Use the index as a unique identifier
        combinedDoc: `${item.DocNoDFS}-${item.DocDateDfs}`,
        combinedStatus: `${item.DocStatusText}-${item.DescDTS}`,
        fromdescdof: item.FromDescDFS,
        fromdatedfs: item.FromDateDFS,
      }));
      

      // Define columns with unique IDs
      const dynamicColumns = [
        { id: "combinedDoc", field: "combinedDoc", header: "شماره سند - تاریخ سند", width: 200 },
        { id: "combinedStatus", field: "combinedStatus", header: "نوع سند - وضعیت سند", width: 200 },
        { id: "fromdescdof", field: "fromdescdof", header: "عنوان", width: 150 },
        { id: "fromdatedfs", field: "fromdatedfs", header: "زمان ایجاد", width: 150 },
      ];
      

      setColumns(dynamicColumns);
      setData(transformedData);
      console.log(transformedData);
      console.log(dynamicColumns);

    } catch (error) {
      console.error("Error executing stored procedure:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-4 ml-4 mr-4 bg-white" dir="rtl">
      <div className="flex flex-row justify-between mt-4">
        <SearchBox />
        <KtRadio />
      </div>
      <div>
        <button onClick={handleExecuteSP} disabled={loading}>
          {loading ? "Executing..." : "Run Stored Procedure"}
        </button>
      </div>
      <div>
        {/* <DynamicTable data={data} columns={columns} /> */}
        <DataTable rows={data} columns={columns}/>
      </div>
    </div>
  );
}
