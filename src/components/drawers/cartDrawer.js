import AquaDrawer from "@/reusables/drawer";
import AquaHeading from "@/reusables/heading";
import { useSelector, useDispatch } from "react-redux";
import AquaCartCard from "../cards/cartCard";

const AquaCartDrawer = () => {
  const dispatch = useDispatch();
  const { cartDrawer, cartCount } = useSelector((state) => ({ ...state }));
  const total = cartCount.reduce((a, r) => a + Number(r.price), 0);
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
            <AquaHeading level={3}>Cart Items -- </AquaHeading>
            <div className="flex-fill text-end text-success text-end">
              <AquaHeading level={3}>{total}</AquaHeading>
            </div>
          </div>
        }
        size={"md"}
        position="bottom"
      >
        <div className="row">
          {cartCount.map((r, i) => (
            <div className="col-md-3 col-lg-3 col-xs-12 col-sm-12" key={i}>
              <AquaCartCard data={r} />
            </div>
          ))}
        </div>
      </AquaDrawer>
    </>
  );
};
export default AquaCartDrawer;
