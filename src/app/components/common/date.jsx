"use client";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

const DateDisplay = () => {
  const [date, setDate] = useState("");

  // Format date to Persian calendar
  const formatPersianDate = (d) => {
    const persianFormatter = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    });
    return persianFormatter.format(d);
  };

  useEffect(() => {
    const now = new Date();
    setDate(formatPersianDate(now)); // Set initial date

    const interval = setInterval(() => {
      const updatedDate = new Date();
      setDate(formatPersianDate(updatedDate)); // Update date every second (optional)
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <Typography
      sx={{
        color: "black", // Adjust color based on header style
        fontWeight: "bold",
        fontSize: "16px", // Adjust font size
        marginLeft: "16px" // Spacing between date and icons
      }}
    >
      {date}
    </Typography>
  );
};

export default DateDisplay;
