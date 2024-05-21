import AquaHeading from "@/reusables/heading";
import { useSelector, useDispatch } from "react-redux";
const AquaCompareComponent = () => {
  const dispatch = useDispatch();
  const compareCount = useSelector((state) => state.compareCount);
  return (
    <>
      {compareCount.length === 0 ? (
        <AquaHeading content={"No products to compare yet"} decorate={true} />
      ) : (
        <>
          {compareCount.map((item) => {
            return (
              <div>
                <h1>{item.name}</h1>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};
export default AquaCompareComponent;
