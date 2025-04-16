import React, { useEffect, useState } from "react";

import { Box, TextField } from "@mui/material";

import CustomButton from "../CustomButton";
import MagnifyingGlassPlus from "@/assets/svgs/phosphoricons/MagnifyingGlassPlus";
import TextFieldClose from "@/assets/svgs/phosphoricons/TextFieldClose";

const CustomSearchTextfield = ({
  handleSearch,
  placeholder,
  value,
  setValue,
  setFilterUsed,
}) => {
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    setTextValue(value);
  }, [value]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #ACACAC",
        borderRadius: "8px",
      }}
    >
      <TextField
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(textValue);
          }
        }}
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        sx={{
          // width: "100%",
          height: "56px",
          "& fieldset ": {
            display: "none",
          },
          "& input:focus": {
            outline: "none",
          },

          outline: "none",
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

      <CustomButton
        style={{
          width: "40px",
          height: "40px",
          p: 0,
          minWidth: "40px",
          // backgroundColor: (theme) => theme.palette.primary.primary_90,
          ":hover": {
            backgroundColor: (theme) => theme.palette.primary.primary_90,
          },
          borderRadius: "4px !important",
          ml: 1,
        }}
        clickHandler={() => handleSearch(textValue)}
        icon={<MagnifyingGlassPlus />}
      />
    </Box>
  );
};

export default CustomSearchTextfield;
