import ProductFunctions from "@/reusableUtils/poroductFunctions";
import AquaToast from "@/reusables/js/toast";
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
      <div class="card rounded-4">
        <div className="card-body">
          <img
            src={photos[0].secure_url}
            class="card-img-top rounded-4"
            alt={title}
          />
          <div>
            <InputGroup className="mt-2 mb-3 width-adjust">
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
    </>
  );
};
export default UserDashboardCartCard;
