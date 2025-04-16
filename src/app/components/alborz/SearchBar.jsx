"use client";

import React from "react";

import { Box, Button, OutlinedInput } from "@mui/material";

import MagnifyingGlass from "@/assets/svgs/phosphoricons/MagnifyingGlass";
import CustomButton from "../CustomButton";
import TextFieldClose from "@/assets/svgs/phosphoricons/TextFieldClose";
import ListMagnifyingGlass from "@/assets/svgs/phosphoricons/ListMagnifyingGlass";

const SearchBar = ({
  handleSearchBar,
  setSearchValue,
  searchValue,
  searchedTextValue,
  styles,
  inputType = "default",
}) => {
  const removeFunctionHandler = () => {
    handleSearchBar("");
  };

  return (
    <Box
      className="searchBar"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "40px",
        border:
          inputType === "branch-input"
            ? "none"
            : (theme) => `1px solid ${theme.palette.primary.primary_50}`,
        borderRadius: "100px",
        width: "30%",
        ...styles,
      }}
    >
      <OutlinedInput
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchBar(searchValue);
          }
        }}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        value={searchValue}
        sx={{
          "& fieldset": { border: "none" },
          width: "100%",
          fontSize: (theme) => theme.fontSize.sm,
          fontWeight: "500",
        }}
        placeholder="جستجو "
      />

      {searchedTextValue && (
        <CustomButton
          style={{
            width: "24px",
            height: "24px",
            p: 0,
            minWidth: "24px",
            backgroundColor: (theme) => theme.palette.primary.primary_90,
            ":hover": {
              backgroundColor: (theme) => theme.palette.primary.primary_90,
            },
            borderRadius: "100px !important",
            ml: 1,
          }}
          clickHandler={removeFunctionHandler}
          icon={<TextFieldClose />}
        />
      )}

      <Button
        sx={{
          width: "32px",
          minWidth: "32px",
          height: "32px",
          backgroundColor:
            inputType === "branch-input"
              ? "transparent"
              : (theme) => theme.palette.primary.primary_80,
          p: 0,
          borderRadius: "100px",
          ml: "4px",
          display: "flex",
          justifyContent: "center",
          ":hover": {
            backgroundColor:
              inputType === "branch-input"
                ? "transparent"
                : (theme) => theme.palette.primary.primary_80,
          },
        }}
        onClick={() => handleSearchBar(searchValue)}
      >
        {inputType === "branch-input" ? (
          <ListMagnifyingGlass />
        ) : (
          <MagnifyingGlass
            style={{
              fill: (theme) => theme.palette.primary.primary_50,
            }}
          />
        )}
      </Button>
    </Box>
  );
};

export default SearchBar;
