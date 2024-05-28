import React from "react";
import Image from "next/image";
import Link from "next/link";

const AquaHoverImageCard = ({ title1, title2, title3, imageUrl, link }) => {
  return (
    <Link href={link} passHref>
      <figure className="figure" style={{ margin: "auto" }}>
        <Image
          src={imageUrl}
          alt={`${title1} ${title2} ${title3}`}
          width={250}
          height={500}
          layout="responsive"
          objectFit="cover"
          quality={100}
          className="card-img rounded-5"
        />
        <figcaption>
          <h3 className="title1">{title1}</h3>
          <h3 className="title2">{title2}</h3>
          <h3 className="title3">{title3}</h3>
        </figcaption>
      </figure>
    </Link>
  );
};

export default AquaHoverImageCard;
