import { Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";  
import { useState } from "react";

const TabComponent = ({ tabs, activeTab, setActiveTab, tabContentComponents }) => {
  const handleChange = (_, newValue) => { // ✅ Corrected function syntax
    setActiveTab(newValue);
  };

  return (
    <Box>
      <TabContext value={String(activeTab)}> {/* ✅ Ensure value is a string */}
        <Box>
          <TabList onChange={handleChange}> {/* ✅ Removed nested `Tabs` */}
            {tabs.map(({ id, name }, index) => (
              <Tab key={id} label={name} value={String(index)} />
            ))}
          </TabList>
        </Box>

        {/* ✅ Render corresponding tab content */}
        {tabs.map(({ id }, index) => (
          <TabPanel key={id} value={String(index)}>
            {tabContentComponents?.[index]}
          </TabPanel>
        ))}

      </TabContext>
    </Box>
  );
};

export default TabComponent;
