// AquaImageCard.js
import React from "react";
import Image from "next/image";
import AQ from "../testImages/shoe.webp";
import Link from "next/link";

const AquaImageCard = ({ card }) => {
  const { title, photos } = card;
  const imageUrl = photos && photos.length > 0 ? photos[0].secure_url : AQ;

  return (
    <Link href={`/category/${title}`} passHref>
      <div
        className="card text-bg-dark image-card-width rounded-5 border-0"
        style={{ width: "18rem", margin: "auto" }}
      >
        <Image
          src={imageUrl}
          className="card-img rounded-5"
          alt={title}
          width="250"
          height="500"
          layout="responsive"
          objectFit="cover"
          quality={100}
        />
        <div className="card-img-overlay">
          <div className="img-card-display">
            <h5 className="card-title">{title}</h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AquaImageCard;
