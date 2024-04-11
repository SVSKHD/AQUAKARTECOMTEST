import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";

const AquaTabs = ({ tabData }) => {
  const [key, setKey] = useState(tabData[0].title);

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="tabs-background mb-3"
    >
      {tabData.map((r, i) => (
        <Tab eventKey={r.title} title={r.title} key={i} className="m-2">
          <div className="card rounded-4 mb-4">
            <div className="card-body">{r.component}</div>
          </div>
        </Tab>
      ))}
    </Tabs>
  );
};

export default AquaTabs;
