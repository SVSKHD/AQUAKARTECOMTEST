import { Accordion } from "react-bootstrap";

const AquaAccordian = ({ eventKey, title, content }) => {
  return (
    <Accordion className="shadow-lg aqua-accordian mb-3">
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>{title}</Accordion.Header>
        <Accordion.Body>{content}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AquaAccordian