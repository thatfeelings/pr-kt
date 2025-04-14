import React from "react";
import DashDrawer from "../components/layout/drawer";
import HeaderWithBreadcrumbs from "../components/layout/header";
import { Box } from "@mui/material";

const page = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header stays at the top */}
      <HeaderWithBreadcrumbs />

      {/* Main content area: Drawer and Content */}
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Drawer */}
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <DashDrawer />
        </Box>

        {/* Content Area */}
        <Box sx={{ flex: 1, p: 2 }}>
          {/* Add your main page content here */}
          Main Content Area
        </Box>
      </Box>
    </Box>
  );
};

export default page;
