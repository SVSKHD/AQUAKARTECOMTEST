import { Card } from "react-bootstrap";
const AquaCard = (props) => {
  return (
    <>
      <Card {...props} className="rounded-4">
        <Card.Body className="p-1">{props.children}</Card.Body>
      </Card>
    </>
  );
};
export default AquaCard;
