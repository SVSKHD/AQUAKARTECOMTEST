import AquaButton from "@/reusables/button";
import { Button, Container, Form, Nav, Navbar, Offcanvas } from "react-bootstrap"
import { FaSearch, FaUser, FaCartPlus } from "react-icons/fa"
import { useDispatch } from "react-redux";

const AquaNavBar = () => {
    const dispatch = useDispatch()
    return (
        <>

            <Navbar key={'md'} sticky="top" expand={'md'} variant="light" className="shadow-lg bg-transparent cus-nav">
                <Container>
                    <Navbar.Brand href="/">Aquakart</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-md`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                                Offcanvas
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/shop">Shop</Nav.Link>
                                <Nav.Link href="/compare">Compare</Nav.Link>
                                <Nav.Link href="/about">About Us</Nav.Link>
                            </Nav>
                            <Form className="d-flex mr-1">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <AquaButton variant="outline-success"><FaSearch size={25} /></AquaButton>
                            </Form>
                            <AquaButton onClick={() => dispatch({
                                type: "SET_CART_DRAWER_VISIBLE",
                                payload: true
                            })}><FaCartPlus size={25} /></AquaButton>
                            <AquaButton variant={'normal'} onClick={() => dispatch({
                                type: "SET_AUTH_DIALOG_VISIBLE",
                                payload: true
                            })}><FaUser size={25} /></AquaButton>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

        </>
    );
}

export default AquaNavBar;
