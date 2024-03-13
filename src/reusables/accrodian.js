import { Accordion } from "react-bootstrap";

const AquaAccordian = (props) => {
  const { title, description, key, children } = props;
  return (
    <>
      <Accordion
        className="shadow-lg aqua-accordian mb-3"
        defaultActiveKey={key}
      >
        <Accordion.Item>
          <Accordion.Header>{title}</Accordion.Header>
          <Accordion.Body>{description}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default AquaAccordian;
