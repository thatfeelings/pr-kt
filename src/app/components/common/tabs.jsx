import React, { useState, useEffect } from 'react';

function TabsComponent() {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    fetchTabsData();
  }, []);

  const fetchTabsData = async () => {
    try {
      const response = await fetch('http://localhost:3001/tabs-data'); // Your backend URL
      const data = await response.json();
      setTabs(data);
      if (data.length > 0) {
        setActiveTab(data[0].COLUMN_NAME); // Set first tab as active by default
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderTabContent = (tabName) => {
    switch (tabName) {
      case 'Column1':
        return <TableContent />;
      case 'Column2':
        return <InputBox />;
      default:
        return <p>No content available.</p>;
    }
  };

  return (
    <div>
      {/* Tabs Navigation */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {tabs.map((tab) => (
          <button
            key={tab.COLUMN_NAME}
            onClick={() => setActiveTab(tab.COLUMN_NAME)}
            style={{ padding: '5px 10px' }}
          >
            {tab.COLUMN_NAME}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ marginTop: '20px' }}>
        {activeTab && renderTabContent(activeTab)}
      </div>
    </div>
  );
}

function TableContent() {
  return (
    <div>
      <h3>Table Content for Column1</h3>
      {/* Example content */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Item One</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function InputBox() {
  return (
    <div>
      <h3>Input Box for Column2</h3>
      <input type="text" placeholder="Enter something..." />
      <button>Submit</button>
    </div>
  );
}

export default TabsComponent;
