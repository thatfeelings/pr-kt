import { Tabs, Tab, Box } from "@mui/material";

const TabComponent = ({ tabs, activeTab, setActiveTab, TabContentComponents }) => {
  return (
    <Box>
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
        {tabs.map((tab, index) => (
          <Tab key={tab.id} label={tab.name} />
        ))}
      </Tabs>
      <Box sx={{ padding: 2 }}>
        {TabContentComponents[activeTab]}
      </Box>
    </Box>
  );
};

export default TabComponent;
