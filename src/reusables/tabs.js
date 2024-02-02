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
            <Tab eventKey="home" title="Home">
              Tab content for Home
            </Tab>
            <Tab eventKey="profile" title="Profile">
              Tab content for Profile
            </Tab>
            <Tab eventKey="longer-tab" title="Loooonger Tab">
              Tab content for Loooonger Tab
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </>
  );
};
export default AquaTabs;
