import { useSelector } from "react-redux";
import AquaCompareCard from "./cartComponent";
const AquaCartComponent = () => {
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
        "No Products in cart yet"
      )}
    </div>
  );
};
export default AquaCartComponent;
