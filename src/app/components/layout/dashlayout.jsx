import React from "react";
import DashDrawer from "./drawer";
import HeaderWithBreadcrumbs from "./header";
import { Box } from "@mui/material";

const DashLayout = ({children}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box sx={{ flex: 0.25, display: "flex" }}>
        <DashDrawer />
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <HeaderWithBreadcrumbs />
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashLayout;
