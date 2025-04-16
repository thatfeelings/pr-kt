import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import Collapse from "@mui/material/Collapse"; // For the dropdown feature
import { ExpandLess, ExpandMore } from "@mui/icons-material"; // Icons for dropdown toggle


const DropDownListItem = ({opacity, primary, icon, handleDropdownClick, dropdownOpen, link, captions  }) => {
  return (
    <div>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton onClick={handleDropdownClick} sx={{}}>
          <ListItemIcon
            sx={{
              color: "black",
              minWidth: 0,
              justifyContent: "center",
              mr: opacity ? 3 : "auto"
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={primary} sx={{ opacity: opacity ? 1 : 0 }} />
          {dropdownOpen ? <ExpandLess sx={{ opacity: opacity ? 1 : 0 }}/> : <ExpandMore sx={{ opacity: opacity ? 1 : 0 }}/>}
        </ListItemButton>
      </ListItem>

      <Collapse in={dropdownOpen} timeout="auto" unmountOnExit>
        {captions.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={Link} href={item.link}>
              <ListItemText sx={{ pl: 4 }} primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </Collapse>
    </div>
  );
};

export default DropDownListItem;
