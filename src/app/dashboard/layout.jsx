import React from "react";
import DashDrawer from "../components/layout/drawer";
import HeaderWithBreadcrumbs from "../components/layout/header";
import { Box } from "@mui/material";

const DashLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex", // Makes the drawer and content side-by-side
        height: "100vh", // Full height of the viewport
        width: "100vw", // Full width of the viewport
        overflow: "hidden", // Prevents content overflow outside the main layout
      }}
    >
      {/* Drawer Section */}
      <DashDrawer />

      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1, // Takes up the remaining space next to the drawer
          display: "flex",
          flexDirection: "column",
          overflow: "hidden", // Prevent horizontal overflow
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            position: "sticky", // Sticks the header at the top
            top: 0,
            zIndex: 1000, // Ensures it stays above scrollable content
            backgroundColor: "#FFFFFF", // Background color for header
          }}
        >
          <HeaderWithBreadcrumbs />
        </Box>

        {/* Scrollable Content Section */}
        <Box
          sx={{
            flex: 1, // Fills the remaining vertical space
            overflowY: "auto", // Enables vertical scrolling
            overflowX: "hidden", // Prevents horizontal scrolling
            padding: 0, // Optional: Add some spacing for content
            backgroundColor: "#FFFFFF", // Background color for the content area
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashLayout;
