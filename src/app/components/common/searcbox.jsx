'use client';
import React, { useState } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = ({ placeholder = "Search...", onSearch, opacity}) => {
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
      opacity: opacity ? 1 : 0
    }}>
      <TextField
        fullWidth
        variant="outlined"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="جستجو اطلاعات کالا" // Arabic text for "search for product information"
        sx={{
          height: "40px", // This won't affect directly but still useful for the container
          borderRadius: "20px", // Applies to the overall field container
          backgroundColor: "#f5f5f5", // Light gray background
          "& .MuiOutlinedInput-root": {
            borderRadius: "50px", // Rounds the edges of the input
            "& fieldset": {
              borderColor: "#ACACAC", // Default border color
            },
            "&:hover fieldset": {
              borderColor: "#ccc", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4E4E4E", // Blue border when focused
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" // Ensures it stays at the start of the input, regardless of layout
            sx={{
              direction: "ltr", // Force LTR for the icon position (makes it stay on the left)
            }}>
              <SearchIcon sx={{ color: "gray" }} />
            </InputAdornment>
          ),

        }}
      />
    </Box>
  );
};

export default SearchBox;
