import AquaDrawer from "@/reusables/drawer";
import AquaHeading from "@/reusables/heading";
import { useSelector, useDispatch } from "react-redux";

const AquaCartDrawer = () => {
  const dispatch = useDispatch();
  const { cartDrawer } = useSelector((state) => ({ ...state }));
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
        position="bottom"
      >
        <AquaHeading level={3}>cart items</AquaHeading>
      </AquaDrawer>
    </>
  );
};
export default AquaCartDrawer;
