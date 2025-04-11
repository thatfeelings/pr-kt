'use client';
import { Box, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";  
import { useState } from "react";

const TabComponent = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState("0"); // Initialize activeTab as string

  const handleChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <TabContext value={activeTab}> {/* Ensure TabContext value matches activeTab */}
        <Box>
          <TabList onChange={handleChange}>
            {tabs.map(({ id, name }, index) => (
              <Tab key={id} label={name} value={String(index)} /> 
            ))}
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
};

export default TabComponent;
