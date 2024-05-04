import AquaDrawer from "@/reusables/drawer";
import AquaHeading from "@/reusables/heading";
import { useSelector, useDispatch } from "react-redux";
import AquaCartCard from "../cards/cartCard";
import ProductFunctions from "@/reusableUtils/poroductFunctions";
import AquaButton from "@/reusables/button";
import AquaCurrencyFormat from "@/reusables/currencyFormatter";
import EC from "../../assests/ec.jpg";
import Image from "next/image";

const AquaCartDrawer = () => {
  const dispatch = useDispatch();
  const { cartDrawer, cartCount } = useSelector((state) => ({ ...state }));
  const { cartTotal } = ProductFunctions();
  const total = cartTotal(cartCount);
  return (
    <>
      <AquaDrawer
        show={cartDrawer}
        handleClose={() =>
          dispatch({
            type: "SET_CART_DRAWER_VISIBLE",
            payload: false,
          })
        }
        title={
          <div className="d-flex">
            <AquaHeading level={3}>
              {" "}
              {cartCount.length > 0 ? "CART TOTAL -- " : ""}
            </AquaHeading>
            <div className="flex-fill text-end text-success text-end">
              <AquaHeading
                level={3}
                content={
                  <>
                    {cartCount.length > 0 ? (
                      <>
                        Total -
                        <AquaCurrencyFormat amount={total} adjust={true} />
                      </>
                    ) : (
                      "Your Cart"
                    )}
                  </>
                }
              />
            </div>
          </div>
        }
        size={"md"}
        position="bottom"
      >
        {cartCount.length > 0 ? (
          <>
            {" "}
            <div className="row mb-1">
              {cartCount.map((r, i) => (
                <div className="col-md-3 col-lg-3 col-xs-12 col-sm-12" key={i}>
                  <AquaCartCard data={r} />
                </div>
              ))}
            </div>
            {cartCount.length ? (
              <>
                <AquaButton href="/checkout">Go to Cart</AquaButton>
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <Image
              height={300}
              src={EC}
              alt="Aquakart Empty Cart"
              className="d-block mx-auto"
            />
            <h6 className="text-center text-muted">Your Cart is Empty!</h6>
          </>
        )}
      </AquaDrawer>
    </>
  );
};
export default AquaCartDrawer;
