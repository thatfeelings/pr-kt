import React from "react";

import { Box, FormControlLabel, Radio } from "@mui/material";

import CustomTypography from "./CustomTypography";

const CustomRadio = ({
  text,
  type,
  style,
  value = "",
  selectedValue,
  radioHandleChange,
}) => {
  return (
    <FormControlLabel
      sx={{ width: "max-content", ...style }}
      value={value}
      label={
        <CustomTypography styles={{ mr: 1 }} text={text} typoName={type} />
      }
      control={
        <Radio
          sx={{
            fontSize: "18px",
            padding: "0",
            fill: "#18222F",
            "& svg": {
              width: "24px",
              height: "24px",
              fill: "#18222F",
            },
          }}
          value={value}
          // checked={selectedValue === value}
          onChange={(e, checked) => console.log(checked, "checked")}
        />
      }
    />
  );
};

export default CustomRadio;
