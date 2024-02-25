import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
const AquaUnControlledCarousel = (images) => {
  return (
    <Carousel>
      {images?.map((r, i) => (
        <div key={i}>
          <Carousel.Item>
            <Image className="d-block w-100 rounded" src={r.image} alt={r.alt} />
            <Carousel.Caption>
              <h5>{r.title}</h5>
              <p>{r.subtitle}</p>
            </Carousel.Caption>
          </Carousel.Item>
        </div>
      ))}
    </Carousel>
  );
};

export default AquaUnControlledCarousel;
