import Image from "next/image";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const AquaUserHead = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    router.push("/");
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
  };
  return (
    <Container>
      <Navbar expand="lg" className="shadow-lg cus-nav">
        <Container>
          <Navbar.Brand href="/">
            <Image
              src="https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-384x384_ijvo24.png"
              alt="Aquakart"
              height="50"
              width="50"
            />
          </Navbar.Brand>
          <button className="btn btn-danger" onClick={handleLogout}>
            <FaArrowRightFromBracket size={25} />
          </button>
        </Container>
      </Navbar>
    </Container>
  );
};

export default AquaUserHead;
