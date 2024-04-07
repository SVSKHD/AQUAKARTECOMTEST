import { useSelector } from "react-redux";
import AquaCompareCard from "./cartComponent";
const AquaCartComponent = () => {
  const { cartCount } = useSelector((state) => ({ ...state }));
  return (
    <div>
      {cartCount.length > 0 ? (
        <>
          {cartCount.map((r) => (
            <div key={r}>
              <AquaCompareCard data={r} />
            </div>
          ))}
        </>
      ) : (
        <h4>No Products in Cart yet</h4>
      )}
    </div>
  );
};
export default AquaCartComponent;
