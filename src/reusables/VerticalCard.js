import React, { useState, useEffect, useRef } from "react";
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
import AquaDialog from "./dialog";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ProductFunctions from "@/reusableUtils/poroductFunctions";
import ReactCanvasConfetti from "react-canvas-confetti";

const AquaVerticalCard = (props) => {
  const { data } = props;
  const { cartCount, favCount } = useSelector((state) => ({ ...state }));
  const [quickView, setQuickView] = useState(false);
  const [cartAdd, setCartAdd] = useState(false);
  const [favAdd, setFavAdd] = useState(false);
  const router = useRouter();
  const { addProductToCart, addProductToFav } = ProductFunctions();
  const confettiRef = useRef(null);

  useEffect(() => {
    const isProductInCart = cartCount.some((item) => item._id === data?._id);
    const isProductInFav = favCount.some((item) => item._id === data?._id);
    setCartAdd(isProductInCart);
    setFavAdd(isProductInFav);
  }, [cartCount, data?._id, favCount]);

  const redirectProduct = (id) => {
    router.push(`/product/${id}`);
  };

  const fireConfetti = () => {
    if (confettiRef.current) {
      confettiRef.current({
        angle: 90,
        spread: 360,
        startVelocity: 30,
        elementCount: 100,
        decay: 0.9,
        colors: ["#bb0000", "#ffffff"],
      });
    }
  };
  const { title, description, images, price } = props;

  return (
    <>
      <ReactCanvasConfetti
        ref={confettiRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      />
      <div className="card aq-card shadow-lg rounded-25">
        <div className="shadow-sm aq-card-image-vertical rounded-4">
          {images ? (
            <AquaProductUnControlledCarousel
              images={images}
              className="card-img-top custom-image rounded-5"
              width="100"
              height="280"
              alt={`Aquakart Images | ${title}`}
            />
          ) : (
            <Image
              src={AQ}
              className="card-img-top custom-image rounded-5 shadow-lg"
              alt="..."
            />
          )}
        </div>
        <div className="product-card-body">
          <div className="row align-items-center">
            <div className="col-10">
              <h3 className="card-title mt-3">{title}</h3>
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
            <AquaButton
              onClick={() => addProductToCart(data, setCartAdd)}
              variant="normal"
            >
              {cartAdd ? (
                <FaCartArrowDown className="text-success" size={25} />
              ) : (
                <FaCartPlus className="text-secondary" size={25} />
              )}
            </AquaButton>
            <AquaButton
              onClick={() => {
                addProductToFav(data, setFavAdd);
                fireConfetti();
              }}
              variant="normal"
            >
              {favAdd ? (
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
              <AquaProductUnControlledCarousel
                images={images}
                className="card-img-top custom-image"
                width="100"
                height="280"
                alt={`Aquakart Images | ${title}`}
              />
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
          </div>
        </div>
      </AquaDialog>
    </>
  );
};

export default AquaVerticalCard;
