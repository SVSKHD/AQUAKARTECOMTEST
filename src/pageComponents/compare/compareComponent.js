import { useSelector, useDispatch } from "react-redux";
const AquaCompareComponent = () => {
  const dispatch = useDispatch();
  const compareCount = useSelector((state) => state.compareCount);
  return (
    <>
      {compareCount.length === 0 ? (
        <h1>Add Products to Compare</h1>
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
