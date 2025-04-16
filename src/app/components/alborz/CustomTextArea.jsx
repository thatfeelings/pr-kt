import React, { useEffect, useState } from "react";

import { Box, TextareaAutosize } from "@mui/material";

import CustomButton from "../CustomButton";
import TextFieldClose from "@/assets/svgs/phosphoricons/TextFieldClose";

const CustomTextArea = ({
  handleSearch,
  placeholder = "",
  value,
  setValue,
  setFilterUsed,
  height,
}) => {
  const [textValue, setTextValue] = useState("");

  // useEffect(() => {
  //   setTextValue(value);
  // }, [value]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #ACACAC",
        borderRadius: "8px",
        "& > textarea:nth-of-type(1)": {
          px: "14px",
          py: 2,
          fontSize: "16px",
          fontWeight: "500",
        },
      }}
    >
      <TextareaAutosize
        className="custom-textarea"
        onChange={(e) => setTextValue(e.target.value)}
        value={textValue}
        placeholder={placeholder}
        style={{
          resize: "none",
          height: `${height - 34}px`,
          width: "100%",
          outline: "none",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "500",
          fontFamily: "IRANYekanX",
        }}
      />

      {value && (
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
          clickHandler={() => {
            setValue(null);
            setTextValue("");
            setFilterUsed(true);
          }}
          icon={<TextFieldClose />}
        />
      )}
    </Box>
  );
};

export default CustomTextArea;
