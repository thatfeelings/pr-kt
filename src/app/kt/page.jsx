'use client'
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SearchBox from "../components/common/searcbox";
import DataTable from "../components/common/dynamictable2";
import KtRadio from "../components/common/ktradio";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit"; // Import Material UI edit icon

export default function DynamicSP() {
  const queryClient = useQueryClient();
const cachedUser = queryClient.getQueryData(["user"]) || JSON.parse(localStorage.getItem("user"));
console.log("Cached User Data:", cachedUser);

  console.log("Cached User Data:", cachedUser);
 
  
  const fetchSPData = async () => {
    if (!cachedUser || !cachedUser.USN) {
      throw new Error("User authentication required. Please log in.");
    }
    const response = await fetch("/api/dbo-pubdochandling", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: cachedUser.USN }), // ✅ Directly use cached user ID
    });

    if (!response.ok) throw new Error("Failed to fetch data");

    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["spData"],
    queryFn: fetchSPData,
    retry: 3, // Retry fetching SP data up to 3 times
    staleTime: Infinity, // Cache data permanently until invalidated
    onError: (err) => {
      console.error("Failed to fetch SP data:", err);
      alert("Unable to load document data. Please try again.");
    },
  });
  

  const columns = [
    { id: "combinedDoc", field: "combinedDoc", header: "شماره سند - تاریخ سند", width: 200 },
    { id: "combinedStatus", field: "combinedStatus", header: "نوع سند - وضعیت سند", width: 200 },
    { id: "fromdescdof", field: "fromdescdof", header: "عنوان", width: 150 },
    { id: "fromdatedfs", field: "fromdatedfs", header: "زمان ایجاد", width: 150 },
    {
      id: "edit",
      field: "edit",
      header: "ویرایش",
      width: 80,
      renderCell: (params) => (
        <Link href={`/kt/${params.row.id}`}>
          <EditIcon style={{ cursor: "pointer", color: "blue" }} />
        </Link>
      ),
    },
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
        <DataTable rows={data || []} columns={columns} />
      </div>
    </div>
  );
}
