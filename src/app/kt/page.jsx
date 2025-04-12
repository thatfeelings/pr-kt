"use client";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ToolBar from "../components/common/Toolbar";
import DataTable from "../components/common/datatable";
import Link from "next/link";
// import EditIcon from "@mui/icons-material/Edit"; // Import Material UI edit icon
import { Menu, MenuItem, IconButton, Toolbar } from "@mui/material"; // ✅ Import menu components
import MoreVertIcon from "@mui/icons-material/MoreVert"; // ✅ Import three vertical dots icon



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
    onSuccess: (data) => {
      queryClient.setQueryData(["spData"], data); // Update the query data
    },
    onError: (err) => {
      console.error("Failed to fetch SP data:", err);
      alert("Unable to load document data. Please try again.");
    }
  });
  console.log("Fetched Data:", data); // Make sure it's an array with proper structure

  const processedRows = (Array.isArray(data) ? data : []).map((row, index) => ({
    ...row,
    codedts: row.CodeDTS,
    id: row.DFS || `${row.DocNoDFS}_${index}`, // Ensure unique ID
    combinedStatus: `${row.DocStatusText}-${row.DocDateDfs}`,
    combinedDoc: `${row.DocNoDFS}-${row.DocDateDfs}`,
    fromdatedfs: row.FromDateDFS,
    fromdescdfs: row.FromDescDFS
  }));

  console.log(
    "All codedts values:",
    processedRows.map((row) => row.codedts)
  ); // ✅ Logs array of codedts
  const columns = [
    {
      id: "combinedDoc",
      field: "combinedDoc",
      headerName: "شماره سند - تاریخ سند",
      disableColumnMenu: true,
      flex: 1,
      minWidth: 150,
      maxWidth: 200
    },
    {
      id: "combinedStatus",
      field: "combinedStatus",
      headerName: "نوع سند - وضعیت سند",
      disableColumnMenu: true,
      flex: 1,
      minWidth: 150,
      maxWidth: 200
    },
    {
      id: "fromdescdfs",
      field: "fromdescdfs",
      headerName: "عنوان",
      disableColumnMenu: true,
      flex: 2,
      minWidth: 150,
      maxWidth: 400
    },
    {
      id: "fromdatedfs",
      field: "fromdatedfs",
      headerName: "زمان ایجاد",
      disableColumnMenu: true,
      flex: 1,
      minWidth: 150,
      maxWidth: 300
    },
    {
      id: "edit",
      field: "edit",
      headerName: "",
      flex: 0,
      maxWidth: 20,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      pinned: "left", // ✅ Locks the column to the left side
      headerAlign: "left", // ✅ Aligns the column header to the left
      renderCell: (params) => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };

        return (
          <>
            {/* ✅ Three vertical dots button instead of edit icon */}
            <IconButton onClick={handleClick}>
              <MoreVertIcon style={{ cursor: "pointer" }} />
            </IconButton>

            {/* ✅ Pop-up menu with links */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link href={`/kt/${params.row.id}`}>ویرایش</Link>
              </MenuItem>
              {/* <MenuItem onClick={handleClose}>
                <Link href={`/kt/${params.row.id}/additional-link`}>
                  More Info
                </Link>
              </MenuItem> */}
            </Menu>
          </>
        );
      }
    }
  ];

  
  // console.log("Storage Test:", localStorage);

  return (
      <div className="flex flex-col p-4 ml-4 mr-4 bg-white">
        <div className="flex flex-row justify-between mt-4">
          <ToolBar />
        </div>
        <div>
          {/* {isLoading && <p>Loading...</p>} */}
          {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        </div>
        <div>
          <DataTable
            rows={processedRows}
            columns={columns}
            loading={isLoading}
          />
        </div>
      </div>
  );
}
