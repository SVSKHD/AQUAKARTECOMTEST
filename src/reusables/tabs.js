import {Card , Tabs , Tab} from "react-bootstrap"
const AquaTabs = ({ tabData }) => {
  if (!Array.isArray(tabs) || tabs.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-lg mb-3">
      <Card.Body>
        {JSON.stringify(tabData)}
        {/* <Tabs defaultActiveKey={tabs[0]?.title} id="aqua-tabs" className="mb-3">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title || index}  // Ensure this key is unique for each tab
              eventKey={tab.title || `tab-${index}`} // This also needs to be unique
              title={tab.title}
            >
              {tab.component}
            </Tab>
          ))}
        </Tabs> */}
      </Card.Body>
    </Card>
  );
};
