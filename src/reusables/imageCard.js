import React, { useState, useEffect } from "react";
import Image from "next/image";
import AQ from "@/assests/logo.png";
import Link from "next/link";

const AquaImageCard = ({ card }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (card) {
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Delay of 1 second
    } else {
      setLoading(true);
    }
  }, [card]);

  const { title, photos } = card;
  const imageUrl = photos && photos.length > 0 ? photos[0].secure_url : AQ;

  return (
    <>
      {loading ? (
        <div class="card rounded-4" aria-hidden="true">
          <Image
            src={AQ}
            class="card-img-top"
            alt="..."
            width="250"
            height="250"
          />
          <div class="card-body">
            <h5 class="card-title placeholder-glow rounded-4">
              <span class="placeholder col-12 rounded-4"></span>
            </h5>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default AquaImageCard;
