"use client";
import React from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Bell, WarningCircle, DotsNine, Moon, House } from "@phosphor-icons/react";
import DateDisplay from "../common/date";
import { usePathname } from "next/navigation"; // Import the hook to get the current path

export default function HeaderWithBreadcrumbs() {
  const routeNames = {
    "": "خانه",
    dashboard: "داشبورد",
    kt: "کارتابل"
  };
  const pathname = usePathname(); // Get the current route path
  const pathSegments = pathname.split("/").filter((segment) => segment !== ""); // Split the path into segments

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 16px", // Adjust padding as needed
        backgroundColor: "#FFFFFF", // Background color for the header
        color: "white", // Text color
        height: "60px" // Fixed height for the header
      }}
    >
      {/* Breadcrumbs Section */}
      <Box>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            <House size={24} />
          </Link>
          {pathSegments.map((segment, index) => {
            const segmentPath =
              "/" + pathSegments.slice(0, index + 1).join("/");
            const isLast = index === pathSegments.length - 1;

            // Check if the segment is the last dynamic one (e.g., "3088")
            const displayName =
              isLast && !routeNames[segment]
                ? `شماره سند ${segment}` // Combine Persian text with the dynamic ID
                : routeNames[segment] || segment; // Use Persian name or fallback

            return isLast ? (
              <Typography color="text.primary" key={segment}>
                {decodeURIComponent(displayName)}
              </Typography>
            ) : (
              <Link
                underline="hover"
                color="inherit"
                href={segmentPath}
                key={segment}
              >
                {decodeURIComponent(displayName)}
              </Link>
            );
          })}
        </Breadcrumbs>
      </Box>

      {/* Icons Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <DateDisplay />
        <IconButton color="inherit" aria-label="notifications">
          <Bell />
        </IconButton>

        <IconButton edge="end" color="inherit" aria-label="account">
          <WarningCircle />
        </IconButton>

        <IconButton color="inherit" aria-label="notifications">
          <Moon />
        </IconButton>

        <IconButton color="inherit" aria-label="notifications">
          <DotsNine />
        </IconButton>
      </Box>
    </Box>
  );
}
