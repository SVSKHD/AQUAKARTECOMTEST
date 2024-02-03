import AQ from "../../assests/Default.png";
import Image from "next/image";
const AquaCommonCategoryCard = ({ data }) => {
  const { title, photos, description } = data;
  return (
    <>
      <div className="card aqua-category-card shadow-lg p-2 mb-3">
        <Image
          src={photos ? photos[0].secure_url : AQ}
          className="card-img-top rounded-4"
          alt={title}
          width="180"
          height="380"
        />

        <br />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text fw-light text-secondary">{description}</p>
        </div>
      </div>
    </>
  );
};
export default AquaCommonCategoryCard;
