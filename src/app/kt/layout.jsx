import React from "react";
import DashDrawer from "../components/layout/drawer";
import HeaderWithBreadcrumbs from "../components/layout/header";
import { Box } from "@mui/material";

const DashLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden" // Prevent content overflow
      }}
    >
      <Box
        sx={{
          flex: 1, // Adjust flex to maintain layout proportions
          display: "flex",
          width: "100%" // Ensure the container fits the viewport
        }}
      >
        <DashDrawer />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            width: "calc(100vw - 240px)" // Shrink width dynamically based on DashDrawer width
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              position: "sticky",
              top: 0,
              zIndex: 1000,
              overflow: "hidden" // Prevent sticky header from growing horizontally
            }}
          >
            <HeaderWithBreadcrumbs />
          </Box>
          <Box
            sx={{
              flex: 1, // Allows children content to fill remaining vertical space
              width: "100%", // Prevent horizontal growth
              overflowY: "auto", // Enables vertical scrolling
              overflowX: "hidden" // Prevents horizontal scrolling
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashLayout;
