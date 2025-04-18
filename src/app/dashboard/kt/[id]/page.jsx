"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import QueryDts from "../../../components/common/querydts";
import { Box, Typography } from "@mui/material";
// Fetch function for document details

const fetchDocDetail = async ({dtsserialdfs, xxxserialdfs, docstatus}) => {


  const response = await fetch(
    `/api/dbo-pubdocdetailview?dtsserialdfs=${dtsserialdfs}&xxxserialdfs=${xxxserialdfs}&docstatus=${docstatus}`
  );

  if (!response.ok) throw new Error("Failed to fetch document details");
  return response.json();
};

// Fetch function for document view
const fetchDocView = async ({ dtsserialdfs, xxxserialdfs, docstatus }) => {

  const response = await fetch(
    `/api/dbo-pubdocmainview?dtsserialdfs=${dtsserialdfs}&xxxserialdfs=${xxxserialdfs}&docstatus=${docstatus}`
  );
  if (!response.ok) throw new Error("Failed to fetch document view");
  return response.json();
};

export default function DynamicTabsPage() {
  const params = useParams(); // Get dynamic route params
  const id = params?.id;
    

  const dboData = typeof window !== "undefined" && localStorage.getItem("spData");

  if (!dboData) {
    console.error("No data found in localStorage for spData.");
  }
  
  let parsedData = [];
  try {
    parsedData = JSON.parse(dboData);
  } catch (error) {
    console.error("Failed to parse dboData:", error);
  }
  
  if (!Array.isArray(parsedData)) {
    console.error("Expected parsedData to be an array but got:", parsedData);
  }
  
  const matchingObject = parsedData.find((item) => String(item.DFS) === String(id));
  if (!matchingObject) {
    console.error("No matching object found for id:", id);
  }
  const dtsserialdfs = String(matchingObject?.DTSSerialDFS)
  const xxxserialdfs = String(matchingObject?.XXXSerialDFS)
  const docstatus = String(matchingObject?.DocStatus)


  console.log("bla bla :", dtsserialdfs, xxxserialdfs, docstatus);
  console.log("ID :", id);

  // Query for document details
  const {
    data: docDetail,
    isLoading: isLoadingDocDetail,
    error: errorDocDetail
  } = useQuery({
    queryKey: ["docDetail", dtsserialdfs, xxxserialdfs, docstatus],
    queryFn: () => fetchDocDetail({dtsserialdfs, xxxserialdfs, docstatus}),
    enabled: !!dtsserialdfs && !!xxxserialdfs && !!docstatus, 
  });
  console.log("docdetail", docDetail);

  

  // Query for document view
  const {
    data: docView,
    isLoading: isLoadingDocView,
    error: errorDocView
  } = useQuery({
    queryKey: ["docView", dtsserialdfs, xxxserialdfs, docstatus],
    queryFn: () => fetchDocView({dtsserialdfs, xxxserialdfs, docstatus}),
    enabled: !!dtsserialdfs && !!xxxserialdfs && !!docstatus, 
  });

  console.log("docview", docView);


  if (isLoadingDocDetail || isLoadingDocView) return <p>Loading...</p>;
  if (errorDocDetail)
    return <p>Error loading document details: {errorDocDetail.message}</p>;
  if (errorDocView)
    return <p>Error loading document view: {errorDocView.message}</p>;

    

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", pt:"20px", gap:"20px" }}>
      <Box >
        <Typography sx={{  color: "#000000"}}>
          شماره سند: {id}
        </Typography>
      </Box>
      <QueryDts id={id} docDetail={docDetail} docView={docView} />
    </Box>
  );
}
