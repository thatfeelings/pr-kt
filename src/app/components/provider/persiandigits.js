"use client";

import React, { createContext, useContext } from "react";

const PersianDigitContext = createContext();

const toPersianDigits = (value) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return value.toString().replace(/\d/g, (digit) => persianDigits[digit]);
};

export const PersianDigitProvider = ({ children }) => {
  return (
    <PersianDigitContext.Provider value={toPersianDigits}>
      {children}
    </PersianDigitContext.Provider>
  );
};

export const usePersianDigits = () => useContext(PersianDigitContext);
