import Carousel from 'react-bootstrap/Carousel';

const AquaUnControlledCarousel = (images) => {
    return (
        <Carousel>
            {images.map((r, i) => (
                <div>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={r.image}
                            alt={r.alt}
                        />
                        <Carousel.Caption>
                            <h5>{r.title}</h5>
                            <p>{r.subtitle}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </div>
            ))}
        </Carousel>
    );
}

export default AquaUnControlledCarousel;