import ProductFunctions from "@/reusableUtils/poroductFunctions";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InputGroup, Button, Form } from "react-bootstrap";
import { FaMinus, FaPlus, FaTrash , FaCartArrowDown , FaCartPlus} from "react-icons/fa";
import AQ from "../../assests/Default.png";
import AquaCurrencyFormat from "@/reusables/currencyFormatter";
import { useDispatch, useSelector } from "react-redux";


const AquaCartCard = ({ data }) => {
  const { title, price, photos, quantity, _id } = data;
  const { favDrawer } = useSelector((state) => ({ ...state }));
  const [localQuantity, setLocalQuantity] = useState(data ? data?.quantity : 1);
  const [favourite, setFavourite] = useState(false);
  const [cartAdd, setCartAdd] = useState(false);
  const { addProductToCart, addProductToFav } = ProductFunctions();
  const router = useRouter();
  const dispatch = useDispatch();

  const Redirect = () => {
    router.push(`/product/${_id}`);
  };

  const { QuantityAdd, QuantitySub } = ProductFunctions();
  useEffect(() => {
    if (favDrawer === true) {
      setFavourite(true);
    }
  }, [favDrawer, setFavourite]);
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

  const handleRemoveClicked = (r) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: r._id,
    });
  };

  const handleAddToCart = () => {
    addProductToCart(data, setCartAdd);
  };

  return (
    <>
      <div>
        <div>
          <div className="card rounded-4 g-1">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <Image
                    src={photos ? photos[0].secure_url : AQ}
                    height="450"
                    width="200"
                    className="img-fluid rounded-3"
                    alt={`Aquakart | ${title}`}
                  />
                </div>
                <div className="col-md-6">
                  <h6 class="cart-title" onClick={() => Redirect()}>
                    {title}
                  </h6>
                  <p class="card-text">
                    <small class="text-success text-bold">
                      <AquaCurrencyFormat amount={price} />
                    </small>
                  </p>
                  {favourite ? (
                    <>
                      <button className={cartAdd? `btn btn-success` : 'btn btn-dark'} onClick={handleAddToCart}>{cartAdd ? <FaCartArrowDown size={25}/> : <FaCartPlus size={25}/>}</button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AquaCartCard;
