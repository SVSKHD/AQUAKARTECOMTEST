const AquaVerticalCardRevamp = ({ data }) => {
  const { title, description, images, price } = data;
  return (
    <>
      <div className="card rounded-4 aqua-vertical-revamp-card">
        <div className="card-body">
          <img
            className="img-fluid rounded-4"
            src={
              images
                ? images[0]?.secure_url
                : "https://aquakart.co.in/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Faquakartproducts%2Fimage%2Fupload%2Fv1697875761%2Fcategories%2Fhnmzlrucnmpxyirsujx0.png&w=256&q=75"
            }
            alt={`${title} | Aquakart Assests`}
          />
          <div class="card-img-overlay aqua-vertical-fav-button">
            <button class="btn btn-light m-3"></button>
          </div>
        </div>
      </div>
    </>
  );
};
export default AquaVerticalCardRevamp;
