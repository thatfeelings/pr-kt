import React from "react";
import DashDrawer from "../components/layout/drawer";
import HeaderWithBreadcrumbs from "../components/layout/header";
import { Box } from "@mui/material";

const page = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box sx={{ flex: 0.25, display: "flex" }}>
        <DashDrawer />
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <HeaderWithBreadcrumbs />
          <Box sx={{ flex: 1, p: 2 }}>
            Main Content Area
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default page;
