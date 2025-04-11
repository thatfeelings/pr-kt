'use client';
import React, { useState } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = ({ placeholder = "Search...", onSearch }) => {
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
    <Box  sx={{
      width: "100%",
      maxWidth: 400,
      mx: "auto",
      mt: 2,
      display: "flex",
      alignItems: "center",
    }}>
      <TextField
        fullWidth
        variant="outlined"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="جستجو اطلاعات کالا" // Arabic text for "search for product information"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "gray" }} /> {/* Gray-colored magnifying glass */}
            </InputAdornment>
          ),
          sx: {
            height:'40px',
            borderRadius: "50px", // Rounder edges to match the image
            backgroundColor: "#f5f5f5", // Light gray background
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ACACAC", // Hide default border
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ccc", // Add subtle border on hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#4E4E4E", // Blue border when focused
            },
          },
        }}
      />
    </Box>
  );
};

export default SearchBox;
