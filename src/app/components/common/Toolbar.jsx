"use client";
import React from "react";
import { Divider } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import {
  MagnifyingGlass,
  Printer,
  Trash,
  Funnel,
  FileXls,
  SlidersHorizontal,
  TextAlignJustify
} from "@phosphor-icons/react";
import SearchBox from "./searcbox";

export default function ToolBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#f5f5f5", boxShadow: "none" }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
            alignItems: "center", // Align items vertically
          }}
        >
         
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton>
              <TextAlignJustify size={24} />
            </IconButton>
            <IconButton>
              <SlidersHorizontal size={24} />
            </IconButton>
            <IconButton>
              <Funnel size={24} />
            </IconButton>
            <IconButton>
              <Trash size={24} />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />{" "}
            <IconButton>
              <FileXls size={24} color="green" />
            </IconButton>
            <IconButton>
              <Printer size={24} color="blue" />
            </IconButton>
          </Box>
          <Box
            sx={{
              flex: 1,
              maxWidth: "400px",
              paddingLeft: "16px",
            }}
          >
            <SearchBox />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
