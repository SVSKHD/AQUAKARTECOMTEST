import { Accordion } from "react-bootstrap";

const AquaAccordian = (props) => {
  const { title, description, key, children } = props;
  return (
    <>
      <Accordion className="shadow-lg aqua-accordian" defaultActiveKey={key}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{title}</Accordion.Header>
          <Accordion.Body>{children}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default AquaAccordian;
