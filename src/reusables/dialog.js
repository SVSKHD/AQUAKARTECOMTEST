import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const AquaDialog = (props) => {
    const { size, show, handleClose, title, center, Buttons } = props
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size={size}
                aria-labelledby="contained-modal-title-vcenter"
                centered={center}
            >
                <Modal.Header className='aqua-boder-none'>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.children}
                </Modal.Body>
                <Modal.Footer className='aqua-boder-none'>
                    {Buttons}
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default AquaDialog
