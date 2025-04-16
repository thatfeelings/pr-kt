"use client";

import React from "react";
import { useIntl } from "react-intl";

import { Box, Button } from "@mui/material";

import CustomTypography from "./ui/CustomTypography";

const CustomButton = ({
  icon,
  buttonText,
  style,
  disabledCondition = () => false,
  clickHandler,
  buttonTextType = "Body/Medium",
  ariaDescripe = "",
  buttonRef,
  notifNumber,
  styleType = "basic",
  width,
}) => {
  const intl = useIntl();

  const buttonStylesFunc = () => {
    if (styleType === "withBackgroundColor") {
      return {
        backgroundColor: disabledCondition() ? "#EDEDED" : "#18222F",
        borderradius: "100px",
        width: width,
        ":hover": {
          backgroundColor: "#18222F",
          boxShadow: [
            "0px 1px 2px 0px rgba(0,0,0,0.1)", // سایه اول
            "0px 1px 3px 1px rgba(0,0,0,0.1)", // سایه دوم
          ].join(","), // برای اعمال چند سایه
        },
        ":focus-within": {
          backgroundColor: "#333F4F",
        },
        "& p": {
          color: disabledCondition() ? "#C9C9C9" : "#fff",
        },
        pl: icon ? 3 : 0,
        pr: icon ? 2 : 0,
      };
    } else if (styleType === "withBorder") {
      return {
        backgroundColor: "#fff",
        borderradius: "100px",
        border: `1px solid ${disabledCondition() ? "#EDEDED" : "#7E7E7E"}`,
        width: width,
        ":hover": {
          backgroundColor: "#F6F8FA",
        },
        ":focus-within": {
          backgroundColor: "#ECF0F5",
        },
        "& p": {
          color: disabledCondition() ? "#C9C9C9" : "#18222F",
        },
        pl: icon ? 3 : 0,
        pr: icon ? 2 : 0,
      };
    } else {
      return {
        ":focus-within": {
          backgroundColor: (theme) =>
            `${theme.palette.primary.primary_90} !important`,
        },
        ":hover": {
          backgroundColor: (theme) => theme.palette.primary.primary_100,
        },
        width: width,
      };
    }
  };

  const iconRender = () => {
    if (notifNumber) {
      return (
        <Box display="flex" flexDirection="row" alignItems="center">
          <CustomTypography
            text={notifNumber}
            typoName="Caption2/Medium"
            styles={{
              borderRadius: "100%",
              backgroundColor: "#B84E61",
              width: "16px",
              height: "16px",
              p: {
                color: "#fff",
              },
            }}
          />
          {icon}
        </Box>
      );
    } else {
      return icon;
    }
  };

  return (
    <Button
      ref={buttonRef}
      aria-describedby={ariaDescripe}
      onClick={clickHandler}
      disabled={disabledCondition()}
      sx={{
        px: 0,
        py: 1,
        borderRadius: "100px",
        ...buttonStylesFunc(),
        ...style,
      }}
    >
      {icon && iconRender()}

      {buttonText && (
        <CustomTypography
          styles={{ mr: icon ? 1 : 0 }}
          text={intl.formatMessage({ id: buttonText })}
          typoName={buttonTextType}
        />
      )}
    </Button>
  );
};

export default CustomButton;
