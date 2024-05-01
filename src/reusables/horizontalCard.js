import Image from "next/image";
import AQ from "../assests/Default.png";
const AquaHorizontalCard = () => {
  return (
    <>
      <div class="card dark rounded-4">
        <img
          src="https://aquakart.co.in/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Faquakartproducts%2Fimage%2Fupload%2Fv1697875761%2Fcategories%2Fhnmzlrucnmpxyirsujx0.png&w=256&q=75"
          className="m-3 rounded-4 img-fluid shadow-md"
          alt="..."
        />
        <div class="card-body">
          <div class="text-section">
            <h5 class="card-title fw-bold">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card's content.
            </p>
          </div>
          <div class="cta-section">
            <div>$129.00</div>
            <a href="#" class="btn btn-light">
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default AquaHorizontalCard;
