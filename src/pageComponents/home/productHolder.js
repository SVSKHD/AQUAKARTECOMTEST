import AquaProductOperations from "@/Services/product";
import AquaCardMultiItemCarousel from "@/reusables/cardCarousel";
import AquaToast from "@/reusables/js/toast";
import { useEffect, useState, useCallback } from "react";
import TestVerticalcard from "@/reusables/testverticalcard";
import CardCarousel from "@/reusables/AquaCardCarouselNew";
import AquaImageCard from "@/reusables/imageCard";

const AquaProductHolder = () => {
  const [products, setProducts] = useState([]);
  const { getProducts } = AquaProductOperations();
  const LoadProducts = useCallback(() => {
    getProducts()
      .then((res) => {
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
            <CardCarousel cards={products} CardComponent={<TestVerticalcard/>} />
          </div>
        )}
      </div>
    </>
  );
};
export default AquaProductHolder;
