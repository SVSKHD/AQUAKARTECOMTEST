import { useSelector } from "react-redux";
import AquaHeading from "@/reusables/heading";

const AquaWishComponent = () => {
  const { cartCount } = useSelector((state) => ({ ...state }));
  return (
    <div>
      <AquaHeading level={2} decorate={true} content={"WishList"} />
      <div className="row">
        {cartCount?.map((r, i) => (
          <div key={i} className="col">
            <div className="card w-50">
              <div className="card-body">
                <h5 className="card-title">{r.title}</h5>
                <button className="btn btn-dark">Add to Compare</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AquaWishComponent;
