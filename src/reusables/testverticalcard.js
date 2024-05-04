import { useState } from "react";
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
import AquaCurrencyFormat from "./currencyFormatter";
import { useRouter } from "next/router";
const TestVerticalcard = ({ data }) => {
  const router = useRouter();
  const { title, price, photos } = data;
  const [buyStateAnimation, setBuyStateAnimation] = useState(false);
  const redirectProduct = (id) => {
    router.push(`/product/${id}`);
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
              <div
                class="buy"
                onClick={() => setBuyStateAnimation(!buyStateAnimation)}
              >
                <FaCartArrowDown size={30} />
              </div>
            </div>
            <div class="right">
              <div class="done">
                <FaCheck />
              </div>
              <div class="details">
                <h6 onClick={() => redirectProduct(data._id)}>{title}</h6>
                <p>Added to your cart</p>
              </div>
              <div class="remove" onClick={() => setBuyStateAnimation(false)}>
                <FaCross />
              </div>
            </div>
          </div>
        </div>
        <div class="inside">
          <div class="icon">
            <FaRegHeart />
          </div>
        </div>
      </div>
    </>
  );
};
export default TestVerticalcard;
