import React from 'react'
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";

const MyListItem = ({link, primary, opacity, icon}) => {
return (
    <div>
        <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton component={Link} href={link}>
                <ListItemIcon
                    sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    mr: opacity ? 3 : "auto"
                    }}
                    >
                        {icon}
                </ListItemIcon>
                <ListItemText primary={primary} sx={{ opacity: opacity ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
        

    </div>
)
}

export default MyListItem