"use client";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SearchBox from "../components/common/searcbox";
import DataTable from "../components/common/dynamictable2";
import KtRadio from "../components/common/ktradio";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit"; // Import Material UI edit icon

export default function DynamicSP() {
  const queryClient = useQueryClient();
  const cachedUser =
    typeof window !== "undefined" // Check if window is available
      ? queryClient.getQueryData(["user"]) ||
        JSON.parse(localStorage.getItem("user"))
      : null;

  const fetchSPData = async () => {
    if (!cachedUser || !cachedUser.USN) {
      throw new Error("User authentication required. Please log in.");
    }
    const response = await fetch(
      `/api/dbo-pubdochandling?userId=${cachedUser.USN}`
    );

    if (!response.ok) throw new Error("Failed to fetch data");

    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["spData"],
    queryFn: fetchSPData,
    retry: 3,
    staleTime: Infinity,
    onError: (err) => {
      console.error("Failed to fetch SP data:", err);
      alert("Unable to load document data. Please try again.");
    }
  });
  console.log("Fetched Data:", data); // Make sure it's an array with proper structure

  
  const processedRows = (Array.isArray(data) ? data : []).map((row, index) => ({
    ...row,
    id: row.DFS || `${row.DocNoDFS}_${index}`, // Ensure unique ID
    combinedStatus: `${row.DocStatusText}-${row.DocDateDfs}`,
    combinedDoc: `${row.DocNoDFS}-${row.DocDateDfs}`,
    fromdatedfs: row.FromDateDFS,
    fromdescdfs: row.FromDescDFS,
  }));


  const columns = [
    {
      id: "combinedDoc",
      field: "combinedDoc",
      headerName: "شماره سند - تاریخ سند",
      flex: 1
    },
    {
      id: "combinedStatus",
      field: "combinedStatus",
      headerName: "نوع سند - وضعیت سند",
      flex: 1
    },
    {
      id: "fromdescdfs",
      field: "fromdescdfs",
      headerName: "عنوان",
      flex: 2
    },
    {
      id: "fromdatedfs",
      field: "fromdatedfs",
      headerName: "زمان ایجاد",
      flex: 1
    },
    {
      id: "edit",
      field: "edit",
      headerName: "ویرایش",
      flex: 0.5,
      renderCell: (params) => (
        <Link href={`/kt/${params.row.id}`}>
          <EditIcon style={{ cursor: "pointer", color: "blue" }} />
        </Link>
      )
    }
  ];

  return (
    <div className="flex flex-col p-4 ml-4 mr-4 bg-white" dir="rtl">
      <div className="flex flex-row justify-between mt-4">
        <SearchBox />
        <KtRadio />
      </div>
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      </div>
      <div>
        <DataTable
          rows={processedRows}
          columns={columns}
        />
      </div>
    </div>
  );
}
