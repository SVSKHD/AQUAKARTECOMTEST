import React from 'react';
import { Card, Tabs, Tab } from 'react-bootstrap';

const AquaTabs = ({ tabs }) => {
  if (!Array.isArray(tabs) || !tabs.length) {
    // Optionally handle the case where tabs are not provided or not in the expected format
    return null;
  }

  return (
    <Card className='shadow-lg mb-3'>
      <Card.Body>
        <Tabs
          defaultActiveKey={tabs[0]?.title || 'defaultKey'}
          id="aqua-tabs"
          className="mb-3 tabs-background"
          justify
        >
          {tabs.map((tab, index) => (
            <Tab
              className='m-3'
              key={tab.title || index} // Ensure each tab has a unique key
              eventKey={tab.title || `tab-${index}`}
              title={tab.title}
            >
              {tab.component}
            </Tab>
          ))}
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default AquaTabs;
