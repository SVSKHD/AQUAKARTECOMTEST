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
import AquaCurrencyFormat from "./currencyFormatter";
import { InputGroup, Button, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ProductFunctions from "@/reusableUtils/poroductFunctions";

const AquaHorizontalCard = ({ data }) => {
  const { title, images, customContent, amount } = data;
  const [cartAdd, setCartAdd] = useState(false);
  const [favAdd, setFavAdd] = useState(false);
  const { cartCount, favCount } = useSelector((state) => ({ ...state }));
  const { addProductToCart, addProductToFav } = ProductFunctions();
  const router = useRouter();
  useEffect(() => {
    const isProductInCart = cartCount.some((item) => item._id === data?._id);
    const isProductInFav = favCount.some((item) => item._id === data?._id);
    setCartAdd(isProductInCart);
    setFavAdd(isProductInFav);
  }, [cartCount, data?._id, favCount]);
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
                className="img-fluid rounded-4"
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
              <div className="aqua-horizontal-custom-card">{customContent}</div>
              <div className="row">
                <div className="col">
                  {cartAdd ? (
                    <InputGroup size="sm" className="mb-3 mt-2  width-adjust">
                      <Button
                        variant="outline-light"
                        onClick={() => handleQuantitySub(localQuantity - 1)}
                      >
                        <FaMinus size={25} className="text-dark" />
                      </Button>
                      <Form.Control
                        aria-label="Example text with two button addons"
                        className="text-center"
                        value={localQuantity}
                      />
                      <Button
                        variant="outline-light"
                        onClick={() => handleQuantityAdd(localQuantity + 1)}
                      >
                        <FaPlus size={25} className="text-dark" />
                      </Button>
                    </InputGroup>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col text-end">
                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      class="btn btn-base"
                      onClick={() => addProductToCart(data, setCartAdd)}
                    >
                      {cartAdd ? (
                        <FaCartArrowDown className="text-success" size={25} />
                      ) : (
                        <FaCartPlus className="text-secondary" size={25} />
                      )}
                    </button>
                    <button
                      type="button"
                      class="btn btn-base"
                      onClick={() => {
                        addProductToFav(data, setFavAdd);
                      }}
                    >
                      {favAdd ? (
                        <FaHeart size={25} className="text-danger" />
                      ) : (
                        <FaRegHeart size={25} className="text-danger" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AquaHorizontalCard;
