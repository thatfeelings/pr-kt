"use client";

import React from "react";

import { Typography } from "@mui/material";

const CustomTypography = ({ text, styles, typoName, component = "p" }) => {
  const renderFunc = () => {
    if (typoName === "Headline1/Bold") {
      return (
        <Typography
          sx={{
            fontWeight: (theme) => theme.typography.h1.fontWeight,
            ...styles,
          }}
          component="h1"
        >
          {text}
        </Typography>
      );
    } else if (typoName === "Headline1/Regular") {
      return (
        <Typography
          sx={{ fontWeight: (theme) => theme.typography.fontWeight, ...styles }}
          component="h1"
        >
          {text}
        </Typography>
      );
    } else if (typoName === "Headline2/Bold") {
      return (
        <Typography
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightBold,
            ...styles,
          }}
          component="h2"
        >
          {text}
        </Typography>
      );
    } else if (typoName === "Headline2/Regular") {
      return (
        <Typography
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightRegular,
            ...styles,
          }}
          component="h2"
        >
          {text}
        </Typography>
      );
    } else if (typoName === "Title1/Bold") {
      return (
        <Typography
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightBold,
            fontSize: (theme) => theme.fontSize.xl,
            lineHeight: "72px",
            color: "#18222F",
            ...styles,
          }}
          component={component}
        >
          {text}
        </Typography>
      );
    } else if (typoName === "Title1/Regular") {
      return (
        <Typography
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightRegular,
            fontSize: (theme) => theme.fontSize.xl,
            lineHeight: "72px",
            color: "#18222F",
            ...styles,
          }}
          component={component}
        >
          {text}
        </Typography>
      );
    } else if (typoName === "Title2/Bold") {
      return (
        <Typography
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightBold,
            fontSize: (theme) => theme.fontSize.lg,
            lineHeight: "40px",
            color: "#18222F",
            ...styles,
          }}
          component={component}
        >
          {text}
        </Typography>
      );
    } else if (typoName === "Title2/Regular") {
      return (
        <Typography
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightRegular,
            fontSize: (theme) => theme.fontSize.lg,
            lineHeight: "40px",
            color: "#18222F",
            ...styles,
          }}
          component={component}
        >
          {text}
        </Typography>
      );
    } else if (typoName === "Button1/Bold") {
      return (
        <Typography
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightBold,
            fontSize: (theme) => theme.fontSize.md,
            lineHeight: "32px",
            color: "#18222F",
            ...styles,
          }}
          component={component}
        >
          {text}
        </Typography>
      );
    } else if (typoName === "Button1/Medium") {
      return (
        <Typography
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightMedium,
            fontSize: (theme) => theme.fontSize.md,
            lineHeight: "32px",
            color: "#18222F",
            ...styles,
          }}
          component={component}
        >
          {text}
        </Typography>
      );
    } else if (typoName === "Button2/Bold") {
      return (
        <Typography
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightBold,
            fontSize: (theme) => theme.fontSize.base,
            lineHeight: "24px",
            color: "#18222F",
            ...styles,
            // overflow: "hidden",
            // textOverflow: "ellipsis",
            // whiteSpace: "nowrap",
          }}
          component={component}
        >
          {text}
        </Typography>
      );
    } else if (typoName === "Button2/Medium") {
      return (
        <Typography
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightMedium,
            fontSize: (theme) => theme.fontSize.base,
            lineHeight: "24px",
            color: "#18222F",
            ...styles,
          }}
          component={component}
        >
          {text}
        </Typography>
      );
    } else if (typoName === "Body/Bold") {
      return (
        <Typography
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightBold,
            fontSize: (theme) => theme.fontSize.sm,
            lineHeight: "24px",
            color: "#18222F",
            ...styles,
          }}
          component={component}
        >
          {text}
        </Typography>
      );
    } else if (typoName === "Body/Medium") {
      return (
        <Typography
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightMedium,
            fontSize: (theme) => theme.fontSize.sm,
            lineHeight: "24px",
            color: "#18222F",
            ...styles,
          }}
          component={component}
        >
          {text}
        </Typography>
      );
    } else if (typoName === "Body/Regular") {
      return (
        <Typography
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightRegular,
            fontSize: (theme) => theme.fontSize.sm,
            lineHeight: "24px",
            color: "#18222F",
            ...styles,
          }}
          component={component}
        >
          {text}
        </Typography>
      );
    } else if (typoName === "Caption1/Bold") {
      return (
        <Typography
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightBold,
            fontSize: (theme) => theme.fontSize.xs,
            lineHeight: "20px",
            color: "#18222F",
            ...styles,
          }}
          component={component}
        >
          {text}
        </Typography>
      );
    } else if (typoName === "Caption1/Medium") {
      return (
        <Typography
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightMedium,
            fontSize: (theme) => theme.fontSize.xs,
            lineHeight: "20px",
            color: "#18222F",
            ...styles,
          }}
          component={component}
        >
          {text}
        </Typography>
      );
    } else if (typoName === "Caption1/Regular") {
      return (
        <Typography
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightRegular,
            fontSize: (theme) => theme.fontSize.xs,
            lineHeight: "20px",
            color: "#18222F",
            ...styles,
          }}
          component={component}
        >
          {text}
        </Typography>
      );
    } else if (typoName === "Caption2/Bold") {
      return (
        <Typography
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightBold,
            fontSize: (theme) => theme.fontSize.xss,
            lineHeight: "16px",
            color: "#18222F",
            ...styles,
          }}
          component={component}
        >
          {text}
        </Typography>
      );
    } else if (typoName === "Caption2/Medium") {
      return (
        <Typography
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightMedium,
            fontSize: (theme) => theme.fontSize.xss,
            lineHeight: "16px",
            color: "#18222F",
            ...styles,
          }}
          component={component}
        >
          {text}
        </Typography>
      );
    }
  };

  return <>{renderFunc()}</>;
};

export default CustomTypography;
