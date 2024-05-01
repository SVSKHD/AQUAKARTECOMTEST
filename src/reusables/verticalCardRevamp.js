import { useState, useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaCartPlus,
  FaCartArrowDown,
  FaMinus,
  FaPlus,
  FaRegShareSquare,
} from "react-icons/fa";
import ProductFunctions from "@/reusableUtils/poroductFunctions";
import AquaCurrencyFormat from "./currencyFormatter";
import { useSelector } from "react-redux";
import AquaProductUnControlledCarousel from "./productCarousel";
import Image from "next/image";
import AQ from "../assests/Default.png";

const AquaVerticalCardRevamp = ({ data, images }) => {
  const { title, photos, customContent, price } = data;
  const [cartAdd, setCartAdd] = useState(false);
  const [favAdd, setFavAdd] = useState(false);
  const { cartCount, favCount } = useSelector((state) => ({ ...state }));
  const { addProductToCart, addProductToFav } = ProductFunctions();
  return (
    <>
      <div className="card rounded-4 aqua-vertical-revamp-card mb-2">
        <div className="card-body">
          {photos ? (
            <AquaProductUnControlledCarousel
              images={photos}
              className="card-img-top custom-image rounded-5"
              width="100"
              height="280"
              alt={`Aquakart Assests | ${title}`}
            />
          ) : (
            <Image
              src={AQ}
              className="card-img-top custom-image rounded-5 shadow-sm"
              alt="..."
              height={250}
            />
          )}
          <div class="card-img-overlay aqua-vertical-fav-button-align mb-2">
            <button class="btn btn-light m-3 aqua-vertical-fav-button">
              {" "}
              {favAdd ? (
                <FaHeart size={20} className="text-danger" />
              ) : (
                <FaRegHeart size={20} className="text-danger" />
              )}
            </button>
          </div>
          <div className="m-2">
            <h5>{title}</h5>
            <div>
              <AquaCurrencyFormat amount={price} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AquaVerticalCardRevamp;
