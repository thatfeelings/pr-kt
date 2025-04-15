"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import {Stack, PenNib, Bag, Users, Shapes, ChartLineUp, Storefront, ArrowLineLeft, ArrowLineRight } from "@phosphor-icons/react";
import MyListItem from "./listitem";
import DropDownListItem from "./dropdownlistitem";

const drawerWidth = 240;
const menuItems = [
    { name: "Home", link: "/kt" },
    { name: "Profile", link: "/kt" },
    { name: "Settings", link: "/kt" },
    { name: "Logout", link: "/kt" },
  ];
  const menuItems2 = [
    { name: "Home", link: "/kt" },
    { name: "Profile", link: "/kt" },
    { name: "Settings", link: "/kt" },
    { name: "Logout", link: "/kt" },
  ];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});



const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

export default function DashDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
    
        <CssBaseline />
    
            
            <Drawer variant="permanent" open={open}>
        <List >
            <MyListItem link={"/kt"} primary={"عمومی"} opacity={open} icon={<Stack size={34}/>} />
            <DropDownListItem opacity={open} primary={"کارتابل"} icon={<PenNib size={34}/>}
            handleDropdownClick={handleDropdownClick} dropdownOpen={dropdownOpen} link={"/kt"} captions={menuItems} />
            <DropDownListItem opacity={open} primary={"تولید"} icon={<Shapes size={34} />}
            handleDropdownClick={handleDropdownClick} dropdownOpen={dropdownOpen} link={"/kt"} captions={menuItems} />


        </List>
        <Box
            sx={{
                marginTop: "auto", // Pushes this box to the bottom
                display: "flex",
                justifyContent: "flex-end",
              p: 1 // Padding for better spacing
            }}
        >
            <IconButton onClick={!open ? handleDrawerOpen : handleDrawerClose}>
              {open ? <ArrowLineRight /> : <ArrowLineLeft />}
            </IconButton>
          </Box>
      </Drawer>
    </Box>
  );
}
