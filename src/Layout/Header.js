import AquaButton from "@/reusables/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  Offcanvas,
  ButtonGroup,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import {
  FaUser,
  FaCartPlus,
  FaHome,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const AquaNavBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartCount, user, signupStatus, favDrawer } = useSelector((state) => ({
    ...state,
  }));

  const [cartLength, setCartLength] = useState(0);
  useEffect(() => {
    setCartLength(cartCount.length);
  }, [cartCount]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function createUserName(email) {
    if (email) {
      const usernamePart = email.split("@")[0]; // Get the part before '@'
      return usernamePart.split(".")[0] + "."; // Get the part before the first '.' and add '.' back
    }
  }

  const handleCart = () => {
    if (isMobile) {
      router.push("/checkout");
    } else {
      dispatch({
        type: "SET_CART_DRAWER_VISIBLE",
        payload: true,
      });
    }
  };

  const handleFav = () => {
    dispatch({
      type: "SET_FAV_DRAWER_VISIBLE",
      payload: !favDrawer,
    });
  };

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    if (router.asPath === "/checkout") {
      router.push("/");
    }
  };

  const handleClickLogin = () => {
    dispatch({
      type: "SET_AUTH_DIALOG_VISIBLE",
      payload: true,
    });
    dispatch({
      type: "SET_AUTH_STATUS_VISIBLE",
      payload: !signupStatus,
    });
  };

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
                {isMobile ? (
                  <div className="d-grid">
                    <ButtonGroup>
                      <Button href="/" className="btn btn-dark">
                        <FaHome size={20} />
                      </Button>
                      <Button href="/shop" className="btn btn-dark">
                        Shop
                      </Button>
                      <Button href="/checkout" className="btn btn-dark">
                        Cart
                      </Button>
                      {user ? (
                        <DropdownButton
                          variant="dark"
                          as={ButtonGroup}
                          title={`Hello ${createUserName(user?.user?.email)}`}
                          id="bg-nested-dropdown"
                        >
                          <Dropdown.Item href="/dashboard">
                            Dashboard
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Button
                              variant="danger"
                              onClick={() => handleLogout()}
                            >
                              logout
                            </Button>
                          </Dropdown.Item>
                        </DropdownButton>
                      ) : (
                        <Button
                          className="btn btn-dark"
                          onClick={() =>
                            dispatch({
                              type: "SET_AUTH_DIALOG_VISIBLE",
                              payload: true,
                            })
                          }
                        >
                          <FaUser /> Login
                        </Button>
                      )}
                    </ButtonGroup>
                  </div>
                ) : (
                  <>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link className="text-bold" href="/shop">
                        Shop
                      </Nav.Link>
                      {/* <Nav.Link className="text-bold" href="/compare">
                    Compare
                  </Nav.Link> */}
                      <Nav.Link className="text-bold" href="/about">
                        About Us
                      </Nav.Link>
                    </Nav>

                    <div className="position-relative">
                      <AquaButton variant="normal" onClick={handleFav}>
                        {favDrawer ? (
                          <FaHeart size={25} />
                        ) : (
                          <FaRegHeart size={25} />
                        )}
                      </AquaButton>
                      <AquaButton variant="normal" onClick={handleCart}>
                        <FaCartPlus size={25} />
                      </AquaButton>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartLength}
                      </span>
                    </div>
                    {user ? (
                      <>
                        <Dropdown className="ms-3" as={ButtonGroup}>
                          <Button variant="dark" href="/dashboard">
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
                                onClick={() => handleLogout()}
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
                          onClick={handleClickLogin}
                        >
                          <FaUser size={25} />
                        </AquaButton>
                      </>
                    )}
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
