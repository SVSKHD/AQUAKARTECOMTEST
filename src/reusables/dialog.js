import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const AquaDialog = (props) =>{
    const {size , show , hide, title, center } = props
return(
    <>
        <Modal
            show={show}
            onHide={hide}
            size={size}
            aria-labelledby="contained-modal-title-vcenter"
            centered={center}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={hide}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
)
}
export default AquaDialog
