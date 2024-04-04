import AquaButton from "@/reusables/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  Offcanvas,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";
import { FaUser, FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const AquaNavBar = () => {
  const dispatch = useDispatch();
  const { cartCount, user } = useSelector((state) => ({ ...state }));

  const [cartLength, setCartLength] = useState(0);
  useEffect(() => {
    setCartLength(cartCount.length);
  }, [cartCount]);

  function createUserName(email) {
    if (email) {
      const usernamePart = email.split("@")[0]; // Get the part before '@'
      return usernamePart.split(".")[0] + "."; // Get the part before the first '.' and add '.' back
    }
  }

  return (
    <>
      <div className="container">
        <Navbar
          key={"md"}
          sticky="top"
          expand={"md"}
          variant="light"
          className="shadow-sm bg-transparent cus-nav pr-3 pl-3 mb-5"
        >
          <Container>
            <Navbar.Brand href="/">
              <Image
                src="https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-384x384_ijvo24.png"
                alt="Aquakart"
                height="50"
                width="50"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link className="text-bold" href="/shop">
                    Shop
                  </Nav.Link>
                  <Nav.Link className="text-bold" href="/compare">
                    Compare
                  </Nav.Link>
                  <Nav.Link className="text-bold" href="/about">
                    About Us
                  </Nav.Link>
                </Nav>
                {/* <Form className="d-flex mr-1">
                  <Form.Control
                    type="search"
                    placeholder="Search Products"
                    className="me-2"
                    aria-label="Search"
                  />
                </Form> */}
                <div className="position-relative">
                  <AquaButton
                    variant="normal"
                    onClick={() =>
                      dispatch({
                        type: "SET_CART_DRAWER_VISIBLE",
                        payload: true,
                      })
                    }
                  >
                    <FaCartPlus size={25} />
                  </AquaButton>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartLength}
                  </span>
                </div>
                {user ? (
                  <>
                    <Dropdown className="ms-3" as={ButtonGroup}>
                      <Button variant="dark">
                        {" "}
                        Hello {createUserName(user?.user?.email)}
                      </Button>

                      <Dropdown.Toggle
                        variant="dark"
                        id="dropdown-split-basic"
                      />

                      <Dropdown.Menu>
                        <Dropdown.Item href="/dashboard">
                          Dashboard
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Button
                            variant="danger"
                            onClick={() =>
                              dispatch({
                                type: "LOGOUT",
                                payload: null,
                              })
                            }
                          >
                            logout
                          </Button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                ) : (
                  <>
                    <AquaButton
                      variant={"normal"}
                      onClick={() =>
                        dispatch({
                          type: "SET_AUTH_DIALOG_VISIBLE",
                          payload: true,
                        })
                      }
                    >
                      <FaUser size={25} />
                    </AquaButton>
                  </>
                )}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default AquaNavBar;
