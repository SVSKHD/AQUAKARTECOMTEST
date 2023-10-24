import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const AquaCardMultiItemCarousel = (props) => {
    return (
        <Carousel infinite={true} dots={true} autoPlaySpeed={1000} autoPlay={true} swipeable={true} ssr={true} draggable={true} responsive={responsive} className='card-carousel'>
            {props.children}
        </Carousel>
    );
}

export default AquaCardMultiItemCarousel;
