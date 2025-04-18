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
            height: "100px"
          }}
        >
         
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton>
              <TextAlignJustify size={24} color="#18222F" />
            </IconButton>
            <IconButton>
              <SlidersHorizontal size={24} color="#18222F" />
            </IconButton>
            <IconButton>
              <Funnel size={24} color="#18222F"/>
            </IconButton>
            <IconButton>
              <Trash size={24} color="#18222F" />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} color="#18222F" />{" "}
            <IconButton>
              <FileXls size={24} color="#7CD95D" />
            </IconButton>
            <IconButton>
              <Printer size={24} color="#59A8D4" />
            </IconButton>
          </Box>
          <Box
            sx={{
              mr: 3,
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent:"center",
              maxWidth: "400px",
              paddingLeft: "16px",
              alignItems : "center"
            }}
          >
            <SearchBox width="422px"/>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
