import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaCartArrowDown, FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import AquaCurrencyFormat from "./currencyFormatter";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ProductFunctions from "@/reusableUtils/poroductFunctions";

const TestVerticalcard = ({ card }) => {
  if (!card) {
    console.error("No data provided to TestVerticalcard");
    return null;
  }

  const { title, price, photos } = card;
  const { cartCount, favCount } = useSelector((state) => ({ ...state }));
  const [quickView, setQuickView] = useState(false);
  const [cartAdd, setCartAdd] = useState(false);
  const [favAdd, setFavAdd] = useState(false);
  const router = useRouter();
  const { addProductToCart, addProductToFav } = ProductFunctions();
  const [buyStateAnimation, setBuyStateAnimation] = useState(false);

  useEffect(() => {
    const isProductInCart = cartCount.some((item) => item._id === card?._id);
    const isProductInFav = favCount.some((item) => item._id === card?._id);
    setCartAdd(isProductInCart);
    setFavAdd(isProductInFav);
  }, [cartCount, card?._id, favCount]);

  const redirectProduct = (id) => {
    router.push(`/product/${id}`);
  };

  const handleAddToCart = () => {
    setBuyStateAnimation(!buyStateAnimation);
    addProductToCart(card, setCartAdd);
  };

  return (
    <div className="hovercard">
      <div className="container1">
        <div className="top">
          {photos && photos.length > 0 ? (
            <img
              src={photos[0].secure_url}
              className="top"
              alt={`Aquakart | ${title}`}
            />
          ) : (
            <p>No Image Available</p>
          )}
        </div>
        <div className={cartAdd ? "bottom clicked" : "bottom"}>
          <div className="left">
            <div className="details">
              <a
                href="#"
                className="d-block fw-medium text-dark text-decoration-none"
                onClick={() => redirectProduct(data._id)}
              >
                {title}
              </a>
              <AquaCurrencyFormat amount={price} />
            </div>
            <div className="buy" onClick={handleAddToCart}>
              <FaCartArrowDown size={30} />
            </div>
          </div>
          <div className="right">
            <div className="done">
              <FaCheck />
            </div>
            <div className="details">
              <h6 onClick={() => redirectProduct(data._id)}>{title}</h6>
              <p>Added to cart</p>
            </div>
            <div
              className="remove"
              onClick={() => addProductToCart(card, setFavAdd)}
            >
              <MdClose size={30} />
            </div>
          </div>
        </div>
      </div>
      <div className="inside">
        <div className="icon">
          {favAdd ? (
            <FaHeart
              onClick={() => addProductToFav(card, setFavAdd)}
              size={25}
              className="text-light"
            />
          ) : (
            <FaRegHeart
              onClick={() => addProductToFav(card, setFavAdd)}
              size={25}
              className="text-light"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TestVerticalcard;
