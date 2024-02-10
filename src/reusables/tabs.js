import { Card, Tabs, Tab } from "react-bootstrap";
const AquaTabs = (tabs) => {
  return (
    <>
      <Card>
        <Card.Body>
          <Tabs
            defaultActiveKey="profile"
            id="justify-tab-example"
            className="mb-3 tabs-background"
            justify
          >
            {tabs.map((r) => (
              <>
                <Tab eventKey="home" title={r?.title}>
                  {r?.component}
                </Tab>
              </>
            ))}
          </Tabs>
        </Card.Body>
      </Card>
    </>
  );
};
export default AquaTabs;
