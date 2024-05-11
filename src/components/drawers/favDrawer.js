import AquaDrawer from "@/reusables/drawer";
import AquaHeading from "@/reusables/heading";
import { useSelector, useDispatch } from "react-redux";
import AquaCartCard from "../cards/cartCard";
import EC from "../../assests/ec.jpg";
import Image from "next/image";

const AquaFavDrawer = () => {
  const dispatch = useDispatch();
  const { favDrawer, favCount} = useSelector((state) => ({ ...state }));
  return (
    <>
      <AquaDrawer
        show={favDrawer}
        handleClose={() =>
          dispatch({
            type: "SET_FAV_DRAWER_VISIBLE",
            payload: false,
          })
        }
        title={<AquaHeading content={"Your Favourites"} decorate={true}/>}
        size={"md"}
        position="bottom"
      >
        {favCount.length > 0 ? (
          <>
            {" "}
            <div className="row mb-1">
              {favCount.map((r, i) => (
                <div className="col-md-3 col-lg-3 col-xs-12 col-sm-12" key={i}>
                  <AquaCartCard data={r} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <Image
              height={300}
              src={EC}
              alt="Aquakart Empty Cart"
              className="d-block mx-auto"
            />
            <h6 className="text-center text-muted">Your Don't have any favorite's yet</h6>
          </>
        )}
      </AquaDrawer>
    </>
  );
};
export default AquaFavDrawer;
