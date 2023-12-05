import Image from "next/image";
import AQ from "../testImages/shoe.webp";
import Link from "next/link";

const AquaImageCard = (props) => {
  const { title, description, images, children, link } = props;
  return (
    <>
      <Link href={link}>
        <div className="card text-bg-dark image-card-width shadow-lg">
          <Image
            src={images ? images[0].secure_url : AQ}
            className="card-img"
            alt={title}
            width="50"
            height="200"
            layout="responsive" 
            objectFit="cover" 
            quality={75}
          />
          <div className="card-img-overlay">
            <div className="img-card-display">
              <h5 className="card-title">{title}</h5>
            </div>
            <p className="card-text">{description}</p>
            {children}
          </div>
        </div>
      </Link>
    </>
  );
};
export default AquaImageCard;
