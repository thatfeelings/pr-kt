"use client";

import React from "react";

import { Checkbox, Stack } from "@mui/material";

import CustomTypography from "./CustomTypography";

const CustomCheckbox = ({
  type,
  text,
  value,
  styles,
  handleChange = null,
  condition = () => false,
}) => {
  return (
    <Stack direction="row" sx={{ alignItems: "center", ...styles }}>
      <Checkbox
        onChange={handleChange}
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: 24,
            color: (theme) => theme.palette.primary.primary_10,
          },
          p: 0,
          ml: "4px",
        }}
        indeterminate={condition()}
        checked={value}
      />
      <CustomTypography typoName={type} text={text} />
    </Stack>
  );
};

export default CustomCheckbox;
