import AquaDrawer from "@/reusables/drawer";
import AquaHeading from "@/reusables/heading";
import { useSelector, useDispatch } from "react-redux";
import AquaCartCard from "../cards/cartCard";

const AquaCartDrawer = () => {
  const dispatch = useDispatch();
  const { cartDrawer , cartCount } = useSelector((state) => ({ ...state }));
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
        title={ <AquaHeading level={3}>cart items</AquaHeading>}
        size={"md"}
        position="bottom"
      >
       
        <div className="row">
        {cartCount.map((r,i)=>(
          <div className="col" key={i}>
            <AquaCartCard data={r}/>
          </div>
        ))}
        </div>
      </AquaDrawer>
    </>
  );
};
export default AquaCartDrawer;
