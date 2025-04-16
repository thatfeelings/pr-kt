"use client";

import React from "react";

import { TextField, Box, IconButton, Select, MenuItem } from "@mui/material";

// import CaretDown from "../../assets/svgs/phosphoricons/CaretDown";
import CustomTypography from "./CustomTypography";
import PaperClip from "../../assets/svgs/phosphoricons/PaperClip";
import CustomAutoComplete from "./CustomAutoComplete";
import CustomSearchTextfield from "./CustomSearchTextfield";
import CustomButton from "../CustomButton";
import CaretDown from "@/assets/svgs/phosphoricons/CaretDown";
import CustomTextArea from "./CustomTextArea";

// handle search use for filter on api
// setValue will filter in CustomAutoComplete

const CustomInput = ({
  placeholder,
  value,
  selectTagValue,
  setValue,
  setValue2 = {},
  styles,
  parentStyle,
  type = "text",
  width = "220px",
  height = "56",
  label = "",
  required = false,
  haveDetail = false,
  options,
  detailContent,
  handleSearch,
  setFilterUsed,
  keyValue,
  labelItem,
  dataScale = "small",
  apiStatus,
  scrollPosition,
  setPage,
  textVaueFromUrl = "",
  disabledStatus = false,
  onKeyDown,
  underInputText = "",
  smallDataScaleKeyValue,
}) => {
  const inputRender = () => {
    if (type === "file") {
      return (
        <TextField
          variant="outlined"
          type="text"
          sx={{
            height: "56px",
            width: "252px",
            "& > div": {
              width: "100%",
              borderRadius: "8px",
              pr: 0,
            },
            input: {
              p: 0,
            },
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                component="label"
                sx={{ width: "100%", height: "100%", borderRadius: 0 }}
              >
                <Box
                  sx={{
                    ml: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "4px",
                      height: "40px",

                      backgroundColor: (theme) =>
                        theme.palette.primary.primary_90,
                    }}
                  >
                    <PaperClip />
                  </Box>
                  <CustomTypography
                    typoName="Button2/Medium"
                    text={`${value ? value.name : "برای بارگذاری کلیک کنید"}`}
                    styles={{ height: "max-content" }}
                  />
                </Box>
                <input
                  styles={{ display: "none" }}
                  type="file"
                  hidden
                  onChange={(e) => {
                    setValue(e.target.files[0]);
                  }}
                  name="[licenseFile]"
                />
              </IconButton>
            ),
          }}
        />
      );
    }

    if (type === "autocomplete") {
      return (
        <CustomAutoComplete
          disabledStatus={disabledStatus}
          options={options}
          placeholder={placeholder}
          value={value}
          scrollPosition={scrollPosition}
          setValue={setValue}
          setValue2={setValue2}
          handleSearch={handleSearch}
          setFilterUsed={setFilterUsed}
          keyValue={keyValue}
          dataScale={dataScale}
          apiStatus={apiStatus}
          setPage={setPage}
          labelItem={labelItem}
          textVaueFromUrl={textVaueFromUrl}
          smallDataScaleKeyValue={smallDataScaleKeyValue}
        />
      );
    }

    if (type === "search") {
      return (
        <CustomSearchTextfield
          placeholder={placeholder}
          handleSearch={handleSearch}
          setFilterUsed={setFilterUsed}
          setValue={setValue}
          setPage={setPage}
          value={value}
        />
      );
    }

    if (type === "textArea") {
      return (
        <CustomTextArea
          placeholder={placeholder}
          handleSearch={handleSearch}
          setFilterUsed={setFilterUsed}
          setValue={setValue}
          setPage={setPage}
          value={value}
          height={height}
        />
      );
    }

    if (type === "nested") {
      return (
        <Box sx={{ position: "relative" }}>
          <TextField
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onKeyDown();
              }
            }}
            sx={{
              width: "100%",
              height: "100%",
              position: "relative",
              ...styles,
              "input::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
                m: 0,
              },
              "& > div": {
                height: `${height}px`,
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "#ffff",
              },
              "& fieldset": {
                width: "100%",
              },
            }}
            disabled={disabledStatus}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            type={type}
            placeholder={placeholder}
          />
          <Select
            value={selectTagValue}
            sx={{
              width: "72px",
              minWidth: "72px",
              maxWidth: "72px",
              position: "absolute",
              left: "8px",
              top: "8px",
              height: "40px",
              "& fieldset": {
                width: "72px",
                height: "40px",
                border: "none",
              },
              backgroundColor: "#ECF0F5",
              "& > div": {
                pr: "8px !important",
                textOverflow: "unset !important",
              },
              fontSize: "14px",
              fontWeight: "500",
            }}
            IconComponent={(e) => {
              if (!e.className.includes("iconOpen")) {
                return (
                  <CaretDown
                    style={{
                      position: "absolute",
                      right: "40px",
                      pointerEvents: "none",
                    }}
                  />
                );
              } else {
                return (
                  <CaretDown
                    style={{
                      position: "absolute",
                      right: "40px",
                      pointerEvents: "none",
                      rotate: "180deg",
                    }}
                  />
                );
              }
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  mt: "4px",
                  backgroundColor: "#ffff",
                  border: "1px solid #18222F",
                  borderRadius: "8px",
                  "& ul": {
                    // ml: 1,
                    "&::-webkit-scrollbar": {
                      backgroundColor: (theme) =>
                        theme.palette.primary.primary_100,
                      width: "4px",
                      height: "4px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: (theme) =>
                        theme.palette.primary.primary_70,
                      borderRadius: "4px",
                    },
                  },
                  "& li": {
                    fontSize: "14px !important",
                    fontWeight: "500",
                  },
                },
              },
            }}
            onChange={handleSearch}
          >
            {options.map((opt) => (
              <MenuItem value={opt.id}>{opt.label}</MenuItem>
            ))}
          </Select>
        </Box>
      );
    }

    return (
      <TextField
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onKeyDown();
          }
        }}
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          ...styles,
          "input::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            m: 0,
          },
          "& > div": {
            height: `${height}px`,
            width: "100%",
            borderRadius: "8px",
            backgroundColor: "#ffff",
          },
          "& fieldset": {
            width: "100%",
          },
        }}
        disabled={disabledStatus}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        type={type}
        placeholder={placeholder}
      />
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        width: width,
        input: {
          fontSize: (theme) => theme.fontSize.base,
        },
        "& fieldset": { borderRadius: "8px" },
        ...parentStyle,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CustomTypography
            styles={{ mb: "4px", mr: "4px" }}
            typoName="Body/Bold"
            text={label}
          />
          {required ? (
            <CustomTypography
              text="*"
              typoName="Body/Bold"
              styles={{
                mr: "2px",

                color: "#DC362E !important",
              }}
            />
          ) : null}
        </Box>

        {!detailContent && haveDetail ? (
          <CustomButton
            buttonText="جزئیات"
            buttonTextType="Caption1/Medium"
            style={{
              "& p": {
                color: "#3960EC !important",
                mr: 0,
              },
              p: 0,
              width: "max-content",
              minWidth: "max-content",
            }}
          />
        ) : null}

        {haveDetail && detailContent && detailContent()}
      </Box>

      {inputRender()}
      {underInputText.length > 0 && (
        <CustomTypography
          styles={{ position: "absolute", bottom: "-20px", color: "#ACACAC" }}
          text={underInputText}
          typoName="Caption1/Medium"
        />
      )}
    </Box>
  );
};

export default CustomInput;
