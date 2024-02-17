import Image from "next/image";

const AquaCartCard = ({ data }) => {
  const { title, photos } = data;
  return (
    <>
      <div className="card shadow-lg cart-card-width">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <Image
                className="rounded"
                src={photos[0]?.secure_url}
                alt={title}
                width="150"
                height="150"
              />
            </div>
            <div className="col">{title}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AquaCartCard;
