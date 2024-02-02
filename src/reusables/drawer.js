import { Offcanvas } from "react-bootstrap";
const AquaDrawer = (props) => {
  const { title, show, handleClose, position } = props;
  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={position}
        backdrop="static"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{props.children}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default AquaDrawer;
