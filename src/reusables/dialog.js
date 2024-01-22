import Modal from 'react-bootstrap/Modal';
const AquaDialog = (props) => {
    const { size, show, handleClose, title, center, footerButtons } = props
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size={size}
                aria-labelledby="Aqua"
                centered={center}
                className='dialog-customs'
            >
                <div className='dialog-customs container'>
                <Modal.Header className='aqua-boder-none dialog-customs'>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.children}
                </Modal.Body>
                <Modal.Footer className='aqua-boder-none'>
                    {footerButtons}
                </Modal.Footer>
                </div>
            </Modal>
        </>
    )
}
export default AquaDialog
