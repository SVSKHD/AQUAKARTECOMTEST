import ProductFunctions from "@/reusableUtils/poroductFunctions";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { InputGroup, Button, Form } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
import AQ from "../../assests/Default.png";
import AquaCurrencyFormat from "@/reusables/currencyFormatter";

const AquaCartPageCard = ({ data }) => {
  const { title, price, photos, quantity, _id } = data;
  const [localQuantity, setLocalQuantity] = useState(data ? data?.quantity : 1);
  const router = useRouter();
  const Redirect = () => {
    router.push(`/product/${_id}`);
  };

  const { QuantityAdd, QuantitySub } = ProductFunctions();

  const handleQuantityAdd = () => {
    if (localQuantity < 5) {
      setLocalQuantity(localQuantity + 1);
      QuantityAdd(data, localQuantity + 1);
    }
  };

  const handleQuantitySub = () => {
    if (localQuantity > 1) {
      setLocalQuantity(localQuantity - 1);
      QuantitySub(data, localQuantity - 1);
    }
  };

  return (
    <>
      <div>
        <div>
          <div class="row g-0">
            <div class="col-md-2">
              <Image
                src={photos ? photos[0].secure_url : AQ}
                height="250"
                width="200"
                className="img-fluid rounded-3"
                alt={`Aquakart | ${title}`}
              />
            </div>
            <div class="col-md-6">
              <div class="card-body">
                <h5 class="cart-title" onClick={() => Redirect()}>
                  {title}
                </h5>
                <p class="card-text">
                  <small class="text-success">
                    <AquaCurrencyFormat amount={price} />
                  </small>
                </p>
                <InputGroup size="sm" className="mb-3 width-adjust">
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
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-end"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AquaCartPageCard;
