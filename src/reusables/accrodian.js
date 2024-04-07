import { Accordion } from "react-bootstrap";

const AquaAccordian = (props) => {
  const { title, description, key, content } = props;
  return (
    <>
      <Accordion
        className="shadow-lg aqua-accordian mb-3"
        defaultActiveKey={key}
      >
        <Accordion.Item>
          <Accordion.Header>{title}</Accordion.Header>
          <Accordion.Body>{content}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default AquaAccordian;
