import { useState, useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaCartPlus,
  FaCartArrowDown,
  FaShare,
  FaRegShareSquare,
  FaCross,
  FaCheck,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";
import AquaCurrencyFormat from "./currencyFormatter";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ProductFunctions from "@/reusableUtils/poroductFunctions";

const TestVerticalcard = ({ data }) => {
  const { title, price, photos } = data;
  const { cartCount, favCount } = useSelector((state) => ({ ...state }));
  const [quickView, setQuickView] = useState(false);
  const [cartAdd, setCartAdd] = useState(false);
  const [favAdd, setFavAdd] = useState(false);
  const router = useRouter();
  const { addProductToCart, addProductToFav } = ProductFunctions();
  const [buyStateAnimation, setBuyStateAnimation] = useState(false);

  useEffect(() => {
    const isProductInCart = cartCount.some((item) => item._id === data?._id);
    const isProductInFav = favCount.some((item) => item._id === data?._id);
    setCartAdd(isProductInCart);
    setFavAdd(isProductInFav);
  }, [cartCount, data?._id, favCount]);

  const redirectProduct = (id) => {
    router.push(`/product/${id}`);
  };

  const handleAddToCart = () => {
    setBuyStateAnimation(!buyStateAnimation);
    addProductToCart(data, setCartAdd);
  };
  return (
    <>
      <div class="hovercard">
        <div class="container1">
          <div class="top">
            <img src={photos[0].secure_url} className="top" />
          </div>
          <div class={buyStateAnimation ? "bottom clicked" : "bottom"}>
            <div class="left">
              <div class="details">
                <a
                  href="##"
                  className="d-block fw-medium text-dark text-decoration-none"
                  onClick={() => redirectProduct(data._id)}
                >
                  {title}
                </a>
                <AquaCurrencyFormat amount={price} />
              </div>
              <div class="buy" onClick={handleAddToCart}>
                <FaCartArrowDown size={30} />
              </div>
            </div>
            <div class="right">
              <div class="done">
                <FaCheck />
              </div>
              <div class="details">
                <h6 onClick={() => redirectProduct(data._id)}>{title}</h6>
                <p>Added to cart</p>
              </div>
              <div class="remove" onClick={() => setBuyStateAnimation(false)}>
                <MdClose size={30} />
              </div>
            </div>
          </div>
        </div>
        <div class="inside">
          <div class="icon">
            {favAdd ? (
              <FaHeart
                onClick={() => addProductToFav(data, setFavAdd)}
                size={25}
                className="text-light"
              />
            ) : (
              <FaRegHeart
                onClick={() => addProductToFav(data, setFavAdd)}
                size={25}
                className="text-light"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default TestVerticalcard;
