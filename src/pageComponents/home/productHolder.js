import AquaProductOperations from "@/Services/product";
import AquaCardMultiItemCarousel from "@/reusables/cardCarousel";
import AquaToast from "@/reusables/js/toast";
import { useEffect, useState, useCallback } from "react";

const AquaProductHolder = () => {
  const [products, setProducts] = useState([]);
  const { getProducts } = AquaProductOperations();
  const LoadProducts = useCallback(() => {
    getProducts()
      .then((res) => {
        console.log("prod", res.data);
        setProducts(res.data);
      })
      .catch(() => {
        AquaToast("not-fetched", "error");
      });
  }, [getProducts, setProducts]);

  useEffect(() => {
    LoadProducts();
  }, [LoadProducts]);
  return (
    <>
      <div className="mt-2">
        {!products.length ? (
          <h3>No Products yet</h3>
        ) : (
          <div className="row">
            <AquaCardMultiItemCarousel>
              {products.map((r, i) => (
                <div key={i}>{r.title}</div>
              ))}
            </AquaCardMultiItemCarousel>
          </div>
        )}
      </div>
    </>
  );
};
export default AquaProductHolder;
