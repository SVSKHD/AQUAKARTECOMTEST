import React from "react";
import Carousel from "react-bootstrap/Carousel";

const AquaProductUnControlledCarousel = (props) => {
  const { images } = props;

  if (!Array.isArray(images) || images.length === 0) {
    return null; // or return an appropriate fallback content
  }

  return (
    <Carousel controls={false}>
      {images.map((image, i) => (
        <Carousel.Item key={i}>
          <img
            src={image.secure_url}
            alt={image.alt}
            className="card-img-top  custom-image"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default AquaProductUnControlledCarousel;
