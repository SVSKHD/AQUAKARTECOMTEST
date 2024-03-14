import { useSelector } from "react-redux";
import AquaCompareCard from "./cartComponent";
const AquaWishComponent = () => {
  const { cartCount } = useSelector((state) => ({ ...state }));
  return (
    <div>
      {cartCount.length > 0 ? (
        <>
          {cartCount.map((r) => (
            <div key={r}></div>
          ))}
        </>
      ) : (
        <h4>No Products in Wish List yet</h4>
      )}
    </div>
  );
};
export default AquaWishComponent;
