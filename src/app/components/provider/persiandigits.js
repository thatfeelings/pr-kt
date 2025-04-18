// components/provider/PersianDigitContext.js

"use client";

import React, { createContext, useContext } from "react";
import { ToPersianNumber } from "topersiannumber";

// Create the context
const PersianDigitContext = createContext();

// Function to convert digits to Persian
const convertToPersianDigits = (content) => {
  if (typeof content === "string" || typeof content === "number") {
    return ToPersianNumber(content.toString());
  }
  return content;
};

// Provider component
export const PersianDigitProvider = ({ children }) => {
  return (
    <PersianDigitContext.Provider value={convertToPersianDigits}>
      {children}
    </PersianDigitContext.Provider>
  );
};

// Custom hook to use the context
export const usePersianDigits = () => {
  const context = useContext(PersianDigitContext);
  if (!context) {
    throw new Error("usePersianDigits must be used within a PersianDigitProvider");
  }
  return context;
};
