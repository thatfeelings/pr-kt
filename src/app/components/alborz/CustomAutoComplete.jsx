"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import {
  Box,
  List,
  TextField,
  createFilterOptions,
  ListItemButton,
  Autocomplete,
  ListItemText,
  Collapse,
} from "@mui/material";

import useWindowResize from "@/hook/useWindowResize";
import CustomButton from "../CustomButton";
import CustomTypography from "./CustomTypography";
import MagnifyingGlassPlus from "@/assets/svgs/phosphoricons/MagnifyingGlassPlus";
import CaretUpDown from "@/assets/svgs/phosphoricons/CaretUpDown";
import TextFieldClose from "@/assets/svgs/phosphoricons/TextFieldClose";
import CaretDown from "@/assets/svgs/phosphoricons/CaretDown";

// setValue2 is only used when the province is removed, and subsequently, the city is also removed

const CustomAutoComplete = ({
  options,
  placeholder,
  value,
  setValue,
  setValue2,
  handleSearch,
  setFilterUsed,
  keyValue,
  dataScale,
  apiStatus,
  setPage,
  labelItem,
  textVaueFromUrl,
  disabledStatus,
  smallDataScaleKeyValue = "id",
}) => {
  const [textValue, setTextValue] = useState(textVaueFromUrl);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchListStatus, setSearchListStatus] = useState(false);
  const [topPosition, setTopPosition] = useState(0);
  const [firstRender, setFirstRender] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState({});

  const windowSize = useWindowResize();
  const urlSearchParams = useSearchParams();
  const divRef = useRef(null);
  const inputRef = useRef(null);
  const debounce = useRef(null);

  // const filterOptions = createFilterOptions({
  //   ignoreCase: true,
  //   matchFrom: "start",
  //   limit: 50,
  // });

  const handleSubMenuToggle = (id) => {
    setOpenSubMenu((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // const defaultFunc = (items) => {
  //   return items.map((op) => {
  //     if (op.children) {
  //       return defaultFunc(op.children);
  //     } else {
  //       return { [op[keyValue]]: true };
  //     }
  //   });
  // };

  const defaultFunc = (items) => {
    let result = {};

    items.forEach((op) => {
      // Add the current item's key-value pair to the result
      result[op[keyValue]] = true;

      // If the item has children, recursively merge their results
      if (op.children && op.children.length > 0) {
        Object.assign(result, defaultFunc(op.children));
      }
    });

    return result;
  };

  useEffect(() => {
    setOpenSubMenu(defaultFunc(options));
  }, []);

  // const openCondition = (item) => {
  //   console.log(
  //     openSubMenu[item[keyValue]],
  //     Object.entries(openSubMenu).length === 0,
  //     "open"
  //   );

  //   if (Object.entries(openSubMenu).length === 0) {
  //     return true;
  //   } else {
  //     if (openSubMenu[item[keyValue]]) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  // };

  const renderListItems = (menuItems, depth = 0, itemHeight = 56) => {
    return menuItems.map((item, i) => {
      return (
        <React.Fragment key={item[keyValue]}>
          {item.children?.length > 0 ? (
            <ListItemButton
              sx={{
                height: "56px",
                ":hover": {
                  borderRadius: "100px !important",
                  backgroundColor: (theme) => theme.palette.primary.primary_90,
                },

                display: "flex",
                mr: "4px",
              }}
              // button
              onClick={() => {
                handleSubMenuToggle(item[keyValue]);
              }}
            >
              <ListItemText
                sx={{
                  textAlign: "start",
                }}
                primary={item[labelItem]}
                component={"div"}
              />

              {openSubMenu[item[keyValue]] ? (
                <CaretDown
                  style={{
                    rotate: "180deg",
                    width: "16px",
                    height: "16px",
                  }}
                />
              ) : (
                <CaretDown
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                />
              )}
            </ListItemButton>
          ) : (
            <ListItemButton
              onClick={() => {
                setTextValue(item[labelItem]);
                handleSearch(item[keyValue]);
                setSearchListStatus(false);
              }}
              sx={{
                height: `${itemHeight}px`,
                borderRadius: "100px",
                ":hover": {
                  backgroundColor: (theme) => theme.palette.primary.primary_90,
                },

                display: "flex",
                mr: "4px",
              }}
              //   to={item.path}
            >
              <ListItemText
                sx={{
                  textAlign: "start",
                  color: (theme) => theme.palette.primary.primary_10,
                }}
                primary={item[labelItem]}
              />
            </ListItemButton>
          )}
          {item.children && (
            <Collapse
              in={openSubMenu[item[keyValue]]}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {renderListItems(item.children, depth + 12, 40)}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(textValue);
      setSearchListStatus(true);
    }
  };

  useEffect(() => {
    if (keyValue === labelItem) {
      setTextValue(value);
    }

    if (firstRender) {
      setFirstRender(false);
    } else {
      if (!value) {
        setTextValue("");

        if (dataScale === "small") {
          setSelectedItem(null);
        }
      }
    }
  }, [value]);

  useEffect(() => {
    const urlKeyValue = urlSearchParams.get(`${keyValue}`);

    if (urlKeyValue && dataScale === "small") {
      let parsedKeyValue;

      // Try to parse the URL key value if it's a valid JSON string
      try {
        parsedKeyValue = JSON.parse(urlKeyValue);
      } catch (e) {
        // If parsing fails, treat it as a plain string or number
        parsedKeyValue = urlKeyValue;
      }

      // Find the item in options
      const objFinded = options.find(
        (item) => item[smallDataScaleKeyValue] === parsedKeyValue
      );

      // Set selected item based on the result
      if (value) {
        setSelectedItem(objFinded);
      } else {
        setSelectedItem(null);
      }
    }
  }, []);

  useEffect(() => {
    const urlKeyValue = urlSearchParams.get(`${keyValue}`);

    if (value && !urlKeyValue && dataScale === "small") {
      // Find the item in options
      const objFinded = options.find(
        (item) => item[smallDataScaleKeyValue] === value
      );

      // Set selected item based on the result
      if (objFinded) {
        setSelectedItem(objFinded);
      }
    }
  }, [value]);

  useEffect(() => {
    // Function to handle the click outside
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setSearchListStatus(false);
        // Call your function here
      }
    };

    // Add event listener for mousedown
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const autocompleteRenderFunc = () => {
    if (dataScale === "small") {
      return (
        <Autocomplete
          disabled={disabledStatus}
          sx={{
            width: "100%",
            ".MuiAutocomplete-endAdornment": {
              left: "8px !important",
              right: "unset !important",
            },
            ".MuiInputBase-root": {
              pr: "8px !important",
            },
            "& > div > div > div": {
              borderRadius: "8px",
            },
            " input": {
              color: (theme) => theme.palette.primary.primary_10,
              // backgroundColor: "#fff",
            },
            backgroundColor: "#fff",
          }}
          // filterOptions={filterOptions}
          value={selectedItem}
          onChange={(event, value, reason, detail) => {
            if (reason === "clear") {
              if (keyValue === "ProvinceId") {
                setValue2(null);
              }

              handleSearch("");
            }

            if (!value) {
              setSelectedItem(null);
            } else {
              handleSearch(value[smallDataScaleKeyValue]);
              setSelectedItem(value);
            }
            setPage && setPage(1);
          }}
          clearIcon={<TextFieldClose />}
          // renderOption={(props) => {
          //   return (
          //     <>
          //       {status ? (
          //         <Box {...props}>{props.key}</Box>
          //       ) : (
          //         <div>loading....</div>
          //       )}
          //     </>
          //   );
          // }}
          PaperComponent={(props) => (
            <Box
              sx={{
                mt: "4px",
                backgroundColor: "#ffff",
                border: "1px solid #18222F",
                borderRadius: "8px",
                "& ul": {
                  ml: 1,
                  "&::-webkit-scrollbar": {
                    backgroundColor: (theme) =>
                      theme.palette.primary.primary_100,
                    width: "4px",
                    height: "4px",
                  },
                  "::-webkit-scrollbar-thumb": {
                    backgroundColor: (theme) =>
                      theme.palette.primary.primary_70,
                    borderRadius: "4px",
                  },
                  fontSize: "16px",
                  fontWeight: "500",
                },
              }}
              {...props}
            />
          )}
          noOptionsText="نتیجه‌ای یافت نشد!"
          getOptionLabel={(options) => options[labelItem]}
          popupIcon={<CaretUpDown style={{ width: "24px", height: "24px" }} />}
          options={options}
          renderInput={(params, index) => {
            return (
              <TextField
                placeholder={placeholder}
                value={textValue}
                {...params}
              />
            );
          }}
        />
      );
    }

    if (dataScale === "large") {
      return (
        <Box
          onClick={() => {
            const divPosition = inputRef.current.getBoundingClientRect().top;
            if (divPosition + 280 > windowSize.height) {
              setTopPosition(divPosition - 144 - 250 - 10);
            } else {
              setTopPosition(divPosition - 144 + 56 + 10);
            }
          }}
          ref={inputRef}
        >
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
              value={textValue}
              data
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setTextValue(e.target.value);
                if (e.target.value.length >= 3) {
                  if (debounce.current) {
                    clearInterval(debounce.current);
                  }

                  debounce.current = setTimeout(() => {
                    if (e.target.value.length >= 3) {
                      handleSearch(e.target.value);
                      setSearchListStatus(true);
                    }

                    if (debounce.current) {
                      clearInterval(debounce.current);
                    }
                  }, 1000);
                } else {
                  setSearchListStatus(false);
                }
              }}
              sx={{
                height: "56px",
                "& fieldset ": {
                  display: "none",
                },
                "& input:focus": {
                  outline: "none",
                },

                outline: "none",
                " input": {
                  color: (theme) => theme.palette.primary.primary_10,
                },
              }}
            />

            {value && (
              <CustomButton
                style={{
                  width: "24px",
                  height: "24px",
                  p: 0,
                  minWidth: "24px",
                  ":hover": {
                    backgroundColor: (theme) =>
                      theme.palette.primary.primary_90,
                  },
                  borderRadius: "100px !important",
                  ml: 1,
                }}
                clickHandler={() => {
                  setValue(null);
                  setTextValue("");
                  setSearchListStatus(false);
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
                ":hover": {
                  backgroundColor: (theme) => theme.palette.primary.primary_90,
                },
                borderRadius: "4px !important",
                ml: 1,
              }}
              clickHandler={() => {
                handleSearch(textValue);
                setSearchListStatus(true);
              }}
              icon={<MagnifyingGlassPlus />}
            />
          </Box>

          {searchListStatus && (
            <Box
              sx={{
                pl: 1,
                position: "fixed",
                top: `${topPosition + 144}px`,
                zIndex: "1420",
                border: "1px solid #18222F",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >
              <Box
                ref={divRef}
                sx={{
                  width: "234px",
                  height: "250px",
                  overflow: "auto",
                  display: "flex",

                  flexDirection: "column",
                  gap: 2,
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  "&::-webkit-scrollbar": {
                    backgroundColor: (theme) =>
                      theme.palette.primary.primary_100,
                    width: "4px",
                    height: "4px",
                  },
                  "::-webkit-scrollbar-thumb": {
                    backgroundColor: (theme) =>
                      theme.palette.primary.primary_70,
                    borderRadius: "4px",
                  },
                }}
              >
                <List>
                  {options?.length >= 1 &&
                    options.map((opt) => (
                      <ListItemButton
                        sx={{
                          color: (theme) => theme.palette.primary.primary_10,
                        }}
                        onClick={() => {
                          setPage(1);
                          setTextValue(opt[labelItem]);
                          setValue(opt[keyValue]);
                          setSearchListStatus(false);
                          setFilterUsed(true);
                        }}
                      >
                        {opt[labelItem]}
                      </ListItemButton>
                    ))}

                  {apiStatus && options?.length === 0 && (
                    <CustomTypography
                      text="نتیجه‌ای یافت نشد!"
                      typoName="Button2/Medium"
                    />
                  )}
                </List>
              </Box>
            </Box>
          )}
        </Box>
      );
    }

    if (dataScale === "nested") {
      return (
        <Box
          onClick={() => {
            const divPosition = inputRef.current.getBoundingClientRect().top;
            if (divPosition + 280 > windowSize.height) {
              setTopPosition(divPosition - 144 - 250 - 10);
            } else {
              setTopPosition(divPosition - 144 + 56 + 10);
            }
          }}
          ref={inputRef}
        >
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
              value={textValue}
              autoComplete="off"
              data
              // onKeyDown={handleKeyDown}
              onClick={() => setSearchListStatus(true)}
              sx={{
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
                    backgroundColor: (theme) =>
                      theme.palette.primary.primary_90,
                  },
                  borderRadius: "100px !important",
                  ml: 1,
                }}
                clickHandler={() => {
                  setValue(null);
                  setTextValue("");
                  setSearchListStatus(false);
                  setFilterUsed(true);
                }}
                icon={<TextFieldClose />}
              />
            )}
          </Box>

          {searchListStatus && (
            <Box
              sx={{
                pl: 1,
                position: "fixed",
                top: `${topPosition + 144}px`,
                zIndex: "1420",
                border: "1px solid #18222F",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >
              <Box
                ref={divRef}
                sx={{
                  width: "234px",
                  height: "250px",
                  overflow: "auto",
                  display: "flex",

                  flexDirection: "column",
                  gap: 2,
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  "&::-webkit-scrollbar": {
                    backgroundColor: (theme) =>
                      theme.palette.primary.primary_100,
                    width: "4px",
                    height: "4px",
                  },
                  "::-webkit-scrollbar-thumb": {
                    backgroundColor: (theme) =>
                      theme.palette.primary.primary_70,
                    borderRadius: "4px",
                  },
                }}
              >
                <List>{renderListItems(options)}</List>
              </Box>
            </Box>
          )}
        </Box>
      );
    }
  };

  return <>{autocompleteRenderFunc()}</>;
};

export default CustomAutoComplete;
