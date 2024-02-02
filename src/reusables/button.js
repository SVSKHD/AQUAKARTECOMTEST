import { Button } from "react-bootstrap";

const AquaButton = (props) => {
  return (
    <>
      {props.variant === "normal" ? (
        <Button variant={props.variant} {...props}>
          {props.children}
        </Button>
      ) : (
        <Button
          className="custom-button ms-1 me-1"
          variant={props.variant}
          {...props}
        >
          {props.children}
        </Button>
      )}
    </>
  );
};
export default AquaButton;
