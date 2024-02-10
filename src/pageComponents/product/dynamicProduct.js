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
  FaRegHeart,
  FaCartPlus,
} from "react-icons/fa";
import AquaButton from "@/reusables/button";

const DynamicProduct = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const { getProductById } = AquaProductOperations();
  const router = useRouter();
  const id = router.query.id;
  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((res) => {
        console.log("res", res.data);
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  }, [getProductById, id]);
  const SeoData = {
    title: `Aquakart | Product - ${product?.title}`,
    description: `${product?.description}`,
    image: `${product?.photos ? product.photos[0].secure_url : LOGO}`,
    keywords: `Aquakart Products ${product?.keywords}`,
  };
  return (
    <>
      <AquaLayout seo={SeoData}>
        {loading ? (
          <div className="text-center">
            {" "}
            <Spinner animation="border" variant="dark" />
          </div>
        ) : (
          <div className="row mb-3">
            <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
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
                  alt="..."
                />
              )}
            </div>
            <div className="col-md-8 col-xs-12 col-sm-12 col-lg-8">
              <h1 className="display-2 text-bold">{product?.title}</h1>
              <span className="dynamic-product-price-brand">
                <h4 className="price product-price-align">
                  <Badge bg="success"> ₹{product?.price}</Badge>
                </h4>
                <h4 className="dynamic-product-brand">
                  Brand : {product?.brand}
                </h4>
              </span>
              <InputGroup className="mb-3 width-adjust">
                <Button variant="outline-secondary">
                  <FaMinus size={25} />
                </Button>
                <Form.Control
                  aria-label="Example text with two button addons"
                  className="text-center"
                  value={quantity}
                />
                <Button variant="outline-secondary">
                  <FaPlus size={25} />
                </Button>
              </InputGroup>
              <div className="dynamic-product-cart-fav">
                <AquaButton>
                  <FaCartPlus size={25} />
                </AquaButton>
                <AquaButton>Checkout</AquaButton>
                <AquaButton variant="normal">
                  <FaRegHeart size={25} className="text-danger" />
                </AquaButton>
              </div>
              <hr />
              <h5 className="text-muted">{product?.description}</h5>
            </div>
          </div>
        )}
      </AquaLayout>
    </>
  );
};
export default DynamicProduct;
