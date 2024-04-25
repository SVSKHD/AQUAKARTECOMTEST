import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import React from "react";

const AquaTabs = ({ tabs }) => {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey={tabs[0]?.title}>
      <Row>
        <Col sm={3} md={3} lg={3} xs={12}>
          <div className="card rounded-4">
            <div className="card-body">
              <Nav variant="pills" className="flex-column">
                {tabs.map((tab, index) => (
                  <Nav.Item key={index} className="text-bold">
                    <Nav.Link eventKey={tab.title}>{tab.title}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </div>
          </div>
        </Col>
        <Col sm={9} md={3} lg={9} xs={12}>
          <div className="card rounded-4 mb-4">
            <div className="card-body">
              <Tab.Content>
                {tabs.map((tab, index) => (
                  <Tab.Pane eventKey={tab.title} key={index}>
                    {tab.component}
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </div>
          </div>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default AquaTabs;
