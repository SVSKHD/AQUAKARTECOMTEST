import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


const AquaUserHead = () => {
  return (
    <Container>
      <Navbar expand="lg" className='shadow-lg cus-nav'>
        <Container>
          <Navbar.Brand href="/"><Image
                src="https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-384x384_ijvo24.png"
                alt="Aquakart"
                height="50"
                width="50"
              /></Navbar.Brand>
        </Container>
      </Navbar>
    </Container>
  );
}

export default AquaUserHead;