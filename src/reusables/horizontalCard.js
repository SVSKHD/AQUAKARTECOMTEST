import { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaCartPlus,
  FaCartArrowDown,
  FaShare,
  FaRegShareSquare,
} from "react-icons/fa";
import AquaCurrencyFormat from "./currencyFormatter";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ProductFunctions from "@/reusableUtils/poroductFunctions";

const AquaHorizontalCard = ({ data }) => {
  const { title, images, customContent, amount } = data;
  const [cartAdd, setCartAdd] = useState(false);
  const [favAdd, setFavAdd] = useState(false);
  const router = useRouter();
  const redirectProduct = (id) => {
    router.push(`/product/${id}`);
  };
  return (
    <>
      <div className="card rounded-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <img
                className="img-fluid m-1 rounded-4"
                src={
                  images
                    ? images[0]?.secure_url
                    : "https://aquakart.co.in/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Faquakartproducts%2Fimage%2Fupload%2Fv1697875761%2Fcategories%2Fhnmzlrucnmpxyirsujx0.png&w=256&q=75"
                }
                alt={`${title} | Aquakart Assests`}
              />
            </div>
            <div className="col-md-7 m-3">
              <div className="row">
                <div className="col">
                  <h5>{title}</h5>
                </div>
                <div className="col text-end">
                  <AquaCurrencyFormat amount={amount} />
                </div>
              </div>

              {customContent}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AquaHorizontalCard;
