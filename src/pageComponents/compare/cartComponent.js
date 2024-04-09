import { useSelector } from "react-redux";
import AquaCompareCard from "./cartComponent";
const AquaCartComponent = () => {
  const { cartCount } = useSelector((state) => ({ ...state }));
  return (
    <div>
      {cartCount.length > 0 ? (
        <>
        <div className="row">
          {cartCount.map((r) => (
            <div className="col" key={r}>
            <div className="card w-50">
              <div className="card-body">
                <h5 className="card-title">{r.title}</h5>
                <button className="btn btn-dark">Add to Compare</button>
              </div>
            </div>
          </div>
          ))}
          </div>
        </>
      ) : (
        <h4>No Products in Cart yet</h4>
      )}
    </div>
  );
};
export default AquaCartComponent;
