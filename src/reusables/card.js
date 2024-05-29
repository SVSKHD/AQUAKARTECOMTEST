import { Card } from "react-bootstrap";
const AquaCard = (props) => {
  return (
    <>
      <Card {...props} className="rounded-4">
        <Card.Body className="ps-5 pe-5 pt-1 pb-1">{props.children}</Card.Body>
      </Card>
    </>
  );
};
export default AquaCard;
