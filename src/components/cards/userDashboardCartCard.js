import ProductFunctions from "@/reusableUtils/poroductFunctions";
import AquaToast from "@/reusables/js/toast";
import Image from "next/image";
import { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";

const UserDashboardCartCard = ({ r }) => {
  const [product, setProduct] = useState(r);
  const { addProductToCart, addProductToFav, quantityChange } =
    ProductFunctions();
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

  const stockSub = (r) => {
    setProduct((prevProduct) => {
      const newQuantity = Math.max(prevProduct.quantity - 1, 1);
      // Dispatch the action after updating the local state
      quantityChange(prevProduct._id, newQuantity);
      return { ...prevProduct, quantity: newQuantity };
    });
  };
  const { title, photos } = r;
  return (
    <>
      <div className="card mb-3 dashboard-cart-card">
        <div className="row g-0">
          <div className="col-md-2">
            <Image
              src={photos[0].secure_url}
              className="img-fluid rounded-start"
              alt={title}
              width={100}
              height={100}
            />
          </div>
          <div className="col-md-10">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <InputGroup className="mb-3 width-adjust">
                <Button variant="outline-dark" onClick={stockSub}>
                  <FaMinus size={25} />
                </Button>
                <Form.Control
                  aria-label="Example text with two button addons"
                  className="text-center"
                  value={r.quantity}
                />
                <Button variant="outline-dark" onClick={stockAdd}>
                  <FaPlus size={25} />
                </Button>
              </InputGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserDashboardCartCard;
