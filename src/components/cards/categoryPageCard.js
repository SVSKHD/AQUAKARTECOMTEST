import AquaHeading from "@/reusables/heading";
import AQ from "../../assests/Default.png";
import Image from "next/image";
const AquaCommonCategoryCard = ({ data }) => {
  const { title, photos, description } = data;
  return (
    <>
      <div className="card aqua-category-card shadow-md p-2 mb-3 rounded-5">
        <Image
          src={photos ? photos[0].secure_url : AQ}
          className="card-img-top rounded-5"
          alt={title}
          width="180"
          height="380"
        />

        <br />
        <div className="card-body">
          <AquaHeading content={title} decorate={true} level={4} />
          <p className="card-text fw-light text-secondary">{description}</p>
        </div>
      </div>
    </>
  );
};
export default AquaCommonCategoryCard;
