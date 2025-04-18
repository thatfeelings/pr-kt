'use client';
import React, { useState } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import { MagnifyingGlass } from "@phosphor-icons/react";

const SearchBox = ({ placeholder = "جستجو", onSearch, opacity = true, width = "242" }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Call the parent's callback function if provided
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <Box
      sx={{
        mx: 2,
        maxWidth: 1000,
        display: "flex",
        alignItems: "center",
        opacity: opacity ? 1 : 0,
      }}
    >
<TextField
  disabled= {!opacity ? true : false}
  variant="outlined"
  value={searchTerm}
  onChange={handleInputChange}
  placeholder={placeholder}
  sx={{
    my: 0,
    mx: 0,
    py: 0,
    px: 0,
    direction: "rtl",
    width: width,
    borderRadius: "20px", // Rounds the field container
    backgroundColor: "#f5f5f5", // Light gray background
    "& .MuiOutlinedInput-root": {
      borderRadius: "50px", // Rounds the edges
      "& fieldset": {
        borderColor: "gray", // Default border color
      },
      "&:hover fieldset": {
        borderColor: "black", // Border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "black", // Border color when focused
      },
      color: "black", // Text color inside the input
    },
    "& input": {
      textAlign: "left", // Align placeholder and input text to the right
      direction: "rtl", // Ensure correct layout in rtl mode
    },
    "& .MuiInputLabel-root": {
      color: "gray", // Placeholder color
    },
  }}
  slotProps={{
    input: {
      startAdornment: (
        <InputAdornment
          position="start"
          sx={{

            backgroundColor: "#D9E1EB", // Background color
            borderRadius: "100%", // Ensures the background stays circular
            width: "40px", // Adjust the width to increase the size
            height: "40px", // Adjust the height to increase the size
            display: "flex", // Align the content inside
            justifyContent: "center", // Center the icon horizontally
            alignItems: "center", // Center the icon vertically
          }}
        >
          <MagnifyingGlass
            style={{ fontSize: "34px" }} // Use inline style for fontSize if needed
            sx={{
              color: "gray",
              fontSize: "34px", // Add here as well
            }}
          /> {/* Icon positioned on the left */}
        </InputAdornment>
      ),
    },
  }}
/>

    </Box>
  );
};

export default SearchBox;
