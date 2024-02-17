import Image from "next/image";
import AQ from "../testImages/shoe.webp";
import { Badge, ButtonGroup } from "react-bootstrap";
import AquaProductUnControlledCarousel from "./productCarousel";
import {
  FaHeart,
  FaRegHeart,
  FaCartPlus,
  FaCartArrowDown,
  FaShare,
  FaRegShareSquare,
} from "react-icons/fa";
import AquaButton from "./button";
import { useState } from "react";
import AquaDialog from "./dialog";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import AquaToast from "./js/toast";

const AquaVerticalCard = (props) => {
  const dispatch = useDispatch();
  const { data } = props;
  const { cartCount } = useSelector((state) => ({ ...state }));
  const [quickView, setQuickView] = useState(false);
  const [cartAdd, setCartAdd] = useState(false);
  const router = useRouter();

  const addProductToCart = (productData) => {
    // Check if product is already in the cart
    const isProductInCart = cartCount.some(item => item._id === productData._id);
  
    if (!isProductInCart) {
      // Dispatch the action to add the product to the Redux store
      dispatch({
        type: "ADD_TO_CART",
        payload: productData,
      });
  
      // Optionally, show a message or update the UI
      setCartAdd(true);
    } else {
      // Optionally, handle the case where the product is already in the cart
      AquaToast("Product is already in the cart", "info");
    }
  };

  const redirectProduct = (id) => {
    router.push(`/product/${id}`);
  };
  const { title, description, images, favourite, price } = props;
  return (
    <>
      <div class="card aq-card shadow-lg rounded-25">
        <div className="shadow-lg aq-card-image-vertical gradient-1">
          {images ? (
            <>
              <AquaProductUnControlledCarousel
                images={images}
                className="card-img-top custom-image"
                width="100"
                height="280"
                alt={`Aquakart Images | ${title}`}
              />
            </>
          ) : (
            <Image src={AQ} className="card-img-top custom-image" alt="..." />
          )}
        </div>
        <div class="product-card-body">
          <div className="row align-items-center">
            <div className="col-10">
              <h3 class="card-title mt-3">{title}</h3>
            </div>
            <div className="col-2">
              <h1>
                <Badge className="p-2 mt-3" bg="success">
                  {String(price).substring(0, 2)}K
                </Badge>
              </h1>
            </div>
          </div>
        </div>
        <div className="text-center card-body">
          <ButtonGroup size="sm">
            <AquaButton
              onClick={() => redirectProduct(data._id)}
              variant="normal"
            >
              <FaShare size={25} />
            </AquaButton>
            <AquaButton onClick={() => addProductToCart(data)} variant="normal">
              {cartAdd ? (
                <FaCartArrowDown className="text-success" size={25} />
              ) : (
                <FaCartPlus className="text-secondary" size={25} />
              )}
            </AquaButton>
            <AquaButton variant="normal">
              {favourite ? (
                <FaHeart size={25} className="text-danger" />
              ) : (
                <FaRegHeart size={25} className="text-danger" />
              )}
            </AquaButton>
            <AquaButton onClick={() => setQuickView(true)} variant="normal">
              <FaRegShareSquare size={25} />
            </AquaButton>
          </ButtonGroup>
        </div>
      </div>
      <AquaDialog
        show={quickView}
        onMouseLeave={true}
        handleClose={() => setQuickView(false)}
        title={title}
      >
        <div className="row">
          <div className="col-5">
            {images ? (
              <>
                <AquaProductUnControlledCarousel
                  images={images}
                  className="card-img-top custom-image"
                  width="100"
                  height="280"
                  alt={`Aquakart Images | ${title}`}
                />
              </>
            ) : (
              <Image src={AQ} className="card-img-top custom-image" alt="..." />
            )}
          </div>
          <div className="col-7">
            <div className="row">
              <div className="col-8">
                <h4>{title}</h4>
              </div>
              <div className="col-4">
                <h4>
                  <Badge bg="success">{price}</Badge>
                </h4>
              </div>
            </div>
            <div className="card-text text-muted">
              {description?.substring(0, 100)}...
            </div>
            <div className="text-center card-body">
              <ButtonGroup size="sm">
                <AquaButton
                  onClick={() => redirectProduct(data._id)}
                  variant="normal"
                >
                  <FaShare size={25} />
                </AquaButton>
                <AquaButton variant="normal">
                  {cartAdd ? (
                    <FaCartArrowDown className="text-success" size={25} />
                  ) : (
                    <FaCartPlus className="text-secondary" size={25} />
                  )}
                </AquaButton>
                <AquaButton variant="normal">
                  {favourite ? (
                    <FaHeart size={25} className="text-danger" />
                  ) : (
                    <FaRegHeart size={25} className="text-danger" />
                  )}
                </AquaButton>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </AquaDialog>
    </>
  );
};
export default AquaVerticalCard;
