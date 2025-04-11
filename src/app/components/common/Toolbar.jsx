'use client';
import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { MagnifyingGlass, Printer, Trash, Funnel, FileXls ,SlidersHorizontal,TextAlignJustify } from "phosphor-react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px", // Rounded edges for modern style
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  maxWidth: 400, // Limit search box width
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`, // Adjust for search icon spacing
    width: "100%",
  },
}));

export default function ToolBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#f5f5f5", boxShadow: "none" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Search Box on the left */}
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass size={24} color="gray" /> {/* Phosphor search icon */}
            </SearchIconWrapper>
            <StyledInputBase placeholder="جستجو اطلاعات کالا" inputProps={{ "aria-label": "search" }} />
          </Search>

          {/* Icons on the right */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton>
              <FileXls  size={24} color="green" /> {/* Excel Icon */}
            </IconButton>
            <IconButton>
              <Printer size={24} color="blue" /> {/* Printer Icon */}
            </IconButton>
            <IconButton>
              <Trash size={24}  /> {/* Trash Icon */}
            </IconButton>
            <IconButton>
              <Funnel size={24}  /> {/* Filter Icon */}
            </IconButton>
            <IconButton>
            <SlidersHorizontal size={24} />
            </IconButton>
            <IconButton>
            <TextAlignJustify size={24} />
            </IconButton>
            

          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
