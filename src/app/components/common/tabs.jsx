"use client";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";

const TabComponent = ({ tabs, tabContent }) => {
  const [activeTab, setActiveTab] = useState("0"); // Initialize activeTab as string

  const handleChange = (_, newValue) => {
    setActiveTab(newValue); // Update active tab value on change
  };

  return (
    <Box>
      <TabContext value={activeTab}> {/* Ensure TabContext value matches activeTab */}
        {/* Tab List for Navigation */}
        <Box>
          <TabList onChange={handleChange}>
            {tabs.map(({ id, name }, index) => (
              <Tab key={id} label={name} value={String(index)} /> // Match value with index as a string
            ))}
          </TabList>
        </Box>
        {tabs.map(({ id }, index) => (
          <TabPanel key={id} value={String(index)}>
            {tabContent[`Tab${index + 2}DTS`] || <div>No content available</div>} {/* Render content dynamically */}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default TabComponent;
