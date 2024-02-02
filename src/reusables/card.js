import { Card } from "react-bootstrap";
const AquaCard = (props) => {
  return (
    <>
      <Card {...props} className="shadow-lg">
        <Card.Body>{props.children}</Card.Body>
      </Card>
    </>
  );
};
export default AquaCard;
