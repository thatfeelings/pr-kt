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
import {
    Stack,
    PenNib,
    Bag,
    Users,
    Shapes,
    ChartLineUp,
    Storefront,
    ArrowLineLeft,
    ArrowLineRight,
    Archive
} from "@phosphor-icons/react";
import MyListItem from "./listitem";
import DropDownListItem from "./dropdownlistitem";
import SearchBox from "../common/searcbox";
import AccountCustom from "../common/account";

const drawerWidth = 265;
const menuItems = [
    { name: "Home", link: "/kt" },
    { name: "Profile", link: "/kt" },
    { name: "Settings", link: "/kt" },
    { name: "Logout", link: "/kt" }
];
const menuItems2 = [
    { name: "Home", link: "/kt" },
    { name: "Profile", link: "/kt" },
    { name: "Settings", link: "/kt" },
    { name: "Logout", link: "/kt" }
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

  // State to control individual dropdowns
const [dropdownStates, setDropdownStates] = React.useState({
    drop1: false,
    drop2: false,
    drop3: false,
    drop4: false,
    drop5: false,
    drop6: false
});

const handleDrawerOpen = () => {
    setOpen(true);
};

const handleDrawerClose = () => {
    setOpen(false);
};

  // Toggle a specific dropdown
  const handleDropdownClick = (dropdownKey) => {
    if (open) { // Ensure dropdown interaction only works when the drawer is open
        setDropdownStates((prevState) => ({
          ...prevState, // Preserve other dropdown states
          [dropdownKey]: !prevState[dropdownKey] // Toggle the specific dropdown
        }));
    }
};

return (
    <Box sx={{ display: "flex"}}>
    <CssBaseline />
    <Drawer variant="permanent" open={open} sx={{backgroundColor: "#FFFFF",
         "& .MuiDrawer-paper": {

            scrollbarWidth: "none", // Hide scrollbar (Firefox)
            "&::-webkit-scrollbar": {
              display: "none", // Hide scrollbar (Chrome/Safari)
            },
          },
     }}>
        <Box sx={{ my: 3}}>
        <AccountCustom  />
        </Box>
        <Box sx={{ mb: 5}}>
        <SearchBox opacity={open} />
        </Box>
        <List sx={{  display: "flex",
                     flexDirection: "column", // Stack items vertically
                    gap: 2 ,
                    height: "calc(100vh - 150px)", // Adjust height based on the content above and below
                     scrollbarWidth: "none",       // Hide scrollbar in Firefox
                    "&::-webkit-scrollbar": {
                    width: "0px",
                    paddingBottom: "60px",   // Reserve space for the fixed button
                    },
                    }}>
        <DropDownListItem
            isDrawerOpen={open} // Pass the open state as a prop
            opacity={open}
            primary={"عمومی"}
            icon={<PenNib size={34} />}
            handleDropdownClick={() => handleDropdownClick("drop1")} // Pass unique key
            dropdownOpen={dropdownStates.drop1} // Use specific dropdown state
            link={"/dashboard/kt"}
            captions={menuItems}
        />
        <DropDownListItem
            isDrawerOpen={open} // Pass the open state as a prop
            opacity={open}
            primary={"تولید"}
            icon={<Shapes size={34} />}
            handleDropdownClick={() => handleDropdownClick("drop2")} // Pass unique key
            dropdownOpen={dropdownStates.drop2} // Use specific dropdown state
            link={"/dashboard/kt"}
            captions={menuItems2}
        />
        <MyListItem
            link={"/dashboard/kt"}
            primary={"دبیرخانه"}
            opacity={open}
            icon={<Archive size={34} />}
        />

        <DropDownListItem
            isDrawerOpen={open} // Pass the open state as a prop
            opacity={open}
            primary={"فروشگاهی"}
            icon={<Storefront size={34} />}
            handleDropdownClick={() => handleDropdownClick("drop3")} // Pass unique key
            dropdownOpen={dropdownStates.drop3} // Use specific dropdown state
            link={"/dashboard/kt"}
            captions={menuItems2}
        />

        <DropDownListItem
            isDrawerOpen={open} // Pass the open state as a prop
            opacity={open}
            primary={"پرسنلی"}
            icon={<Users size={34} />}
            handleDropdownClick={() => handleDropdownClick("drop4")} // Pass unique key
            dropdownOpen={dropdownStates.drop4} // Use specific dropdown state
            link={"/dashboard/kt"}
            captions={menuItems2}
        />
        <Box
            sx={{
            display: "flex",
            justifyContent: "center",
            }}
        >
            <Divider sx={{ width: "80%" }} />
        </Box>

        <DropDownListItem
            isDrawerOpen={open} // Pass the open state as a prop
            opacity={open}
            primary={"خرید"}
            icon={<Bag size={34} />}
            handleDropdownClick={() => handleDropdownClick("drop5")} // Pass unique key
            dropdownOpen={dropdownStates.drop5} // Use specific dropdown state
            link={"/dashboard/kt"}
            captions={menuItems2}
        />

        <DropDownListItem
            isDrawerOpen={open} // Pass the open state as a prop
            opacity={open}
            primary={"فروش"}
            icon={<ChartLineUp size={34} />}
            handleDropdownClick={() => handleDropdownClick("drop6")} // Pass unique key
            dropdownOpen={dropdownStates.drop6} // Use specific dropdown state
            link={"/dashboard/kt"}
            captions={menuItems2}
        />

<Box
        sx={{
            backgroundColor: "#FBFBFB",
            width: "100%",
            position : "sticky",
            bottom: 0,
            right: 0,
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
        
        </List>
       
    </Drawer>
    </Box>
);
}
