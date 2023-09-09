import {Offcanvas} from "react-bootstrap"
const AquaDrawer = (props) =>{
    const {title , show , handleClose } = props
    return(
        <>
            <Offcanvas show={show} onHide={handleClose} backdrop="static">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {props.children}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
AquaDrawer
