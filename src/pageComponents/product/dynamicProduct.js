import AquaLayout from "@/Layout/Layout";
import AquaProductOperations from "@/Services/product";
import AquaProductUnControlledCarousel from "@/reusables/productCarousel";
import Image from "next/image";
import LOGO from "../../assests/logo.png";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Badge, Spinner, InputGroup, Button, Form } from "react-bootstrap";
import {
  FaPlus,
  FaMinus,
  FaHeart,
  FaCartArrowDown,
  FaRegHeart,
  FaCartPlus,
} from "react-icons/fa";
import AquaButton from "@/reusables/button";
import ProductFunctions from "@/reusableUtils/poroductFunctions";
import AquaToast from "@/reusables/js/toast";
import { useSelector, useDispatch } from "react-redux";
import AquaCurrencyFormat from "@/reusables/currencyFormatter";
import AquaVerticalCard from "@/reusables/VerticalCard";
import AquaHeading from "@/reusables/heading";
import TestVerticalcard from "@/reusables/testverticalcard";

const DynamicProduct = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({ quantity: 1 });
  const [fav, setFav] = useState(false);
  const [cart, setCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getProductById } = AquaProductOperations();
  const { addProductToCart, addProductToFav, quantityChange } =
    ProductFunctions();
  const { cartCount, favCount } = useSelector((state) => ({ ...state }));
  const router = useRouter();
  const id = router.query.id;
  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((res) => {
        setProduct((prev) => ({ ...res.data, quantity: prev.quantity }));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [getProductById, id]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const isProductInCart = cartCount.some((item) => item._id === product?._id);
    const isProductInFav = favCount.some((item) => item._id === product?._id);
    setCart(isProductInCart);
    setFav(isProductInFav);
  }, [product, favCount, cartCount]);

  const stockAdd = () => {
    setProduct((prevProduct) => {
      const newQuantity =
        prevProduct.quantity < 5 ? prevProduct.quantity + 1 : 5;
      if (newQuantity <= 5) {
        quantityChange(prevProduct._id, newQuantity);
      }
      if (newQuantity === 5) {
        AquaToast("You can only add 5", "info");
      }
      return { ...prevProduct, quantity: newQuantity };
    });
  };

  const stockSub = () => {
    setProduct((prevProduct) => {
      const newQuantity = Math.max(prevProduct.quantity - 1, 1);
      // Dispatch the action after updating the local state
      quantityChange(prevProduct._id, newQuantity);
      return { ...prevProduct, quantity: newQuantity };
    });
  };

  const SeoData = {
    title: `Aquakart | Product - ${product?.title}`,
    description: `${product?.description}`,
    image: `${product?.photos ? product.photos[0].secure_url : LOGO}`,
    keywords: `Aquakart Products ${product?.keywords}`,
    canonical: `${process.env.apiKey}${router.pathname}`,
  };

  return (
    <>
      <AquaLayout seo={SeoData} container={true}>
        {loading ? (
          <div className="text-center m-5">
            {" "}
            <Spinner animation="border" variant="dark" />
          </div>
        ) : (
          <div>
            <div className="dynamic-product">
              <div className="row mb-3">
                <div
                  className={`${
                    isMobile ? "" : "fixed-column"
                  } col-md-5 col-lg-5 col-xs-12 col-sm-12`}
                >
                  {product?.photos ? (
                    <>
                      <AquaProductUnControlledCarousel
                        images={product?.photos}
                        className="card-img-top custom-image"
                        width="100"
                        height="280"
                        alt={`Aquakart Images | ${product.title}`}
                      />
                    </>
                  ) : (
                    <Image
                      src={LOGO}
                      className="card-img-top custom-image"
                      alt="Aquakart"
                    />
                  )}
                </div>
                <div
                  className={`${
                    isMobile ? "" : "scollable-column"
                  } col-md-7 col-xs-12 col-sm-12 col-lg-7`}
                >
                  <h1>{product?.title}</h1>
                  <h5 className="price product-price-align fw-semibold">
                    <span className="text-success">
                      {" "}
                      <AquaCurrencyFormat amount={product?.price} />
                    </span>
                  </h5>
                  <h6 className="mb-3">Brand : {product?.brand}</h6>
                  <InputGroup className="mb-3 width-adjust">
                    <Button variant="outline-dark" onClick={stockSub}>
                      <FaMinus size={25} />
                    </Button>
                    <Form.Control
                      aria-label="Example text with two button addons"
                      className="text-center"
                      value={product.quantity}
                    />
                    <Button variant="outline-dark" onClick={stockAdd}>
                      <FaPlus size={25} />
                    </Button>
                  </InputGroup>
                  <div className="dynamic-product-cart-fav">
                    <AquaButton
                      variant="normal"
                      onClick={() => addProductToCart(product, setCart)}
                    >
                      {cart ? (
                        <FaCartArrowDown className="text-success" size={25} />
                      ) : (
                        <FaCartPlus className="text-dark" size={25} />
                      )}
                    </AquaButton>
                    <AquaButton
                      variant="normal"
                      onClick={() => addProductToFav(product, setFav)}
                    >
                      {fav ? (
                        <FaHeart size={25} className="text-danger" />
                      ) : (
                        <FaRegHeart size={25} className="text-danger" />
                      )}
                    </AquaButton>
                    <AquaButton href="/checkout">Go To Cart</AquaButton>
                  </div>
                  <hr />
                  <div className="container">
                    <div
                      dangerouslySetInnerHTML={{ __html: product?.description }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {product?.relatedProducts?.length > 0 ? (
              <div className="row">
                <>
                  <AquaHeading
                    level={3}
                    decorate={true}
                    content={"Related Products"}
                    customclass={"text-center"}
                  />
                  {product.relatedProducts.map((r, i) => (
                    <>
                      <div
                        key={i}
                        className="col-md-4 col-lg-4 col-xs-12 col-sm-12"
                      >
                        <TestVerticalcard card={r} />
                      </div>
                    </>
                  ))}
                </>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </AquaLayout>
    </>
  );
};
export default DynamicProduct;
