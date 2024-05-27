// CardCarousel.js
import React from "react";
import { Carousel } from "react-bootstrap";

const CardCarousel = ({ cards, CardComponent }) => {
  // Split cards into chunks of 4 to display in a grid within the carousel
  const chunkSize = 4;
  const chunks = [];

  for (let i = 0; i < cards.length; i += chunkSize) {
    chunks.push(cards.slice(i, i + chunkSize));
  }

  return (
    <Carousel indicators={false} wrap={true} controls={false}>
      {chunks.map((chunk, index) => (
        <Carousel.Item key={index}>
          <div className="container">
            <div className="row">
              {chunk.map((card, idx) => (
                <div className="col-md-3 col-sm-12" key={idx}>
                  {React.cloneElement(CardComponent, { card })}
                </div>
              ))}
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CardCarousel;
