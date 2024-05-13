import AquaLayout from "@/Layout/Layout";
import AquaHeading from "@/reusables/heading";
import AquaCard from "@/reusables/card";
import AquaShopFilters from "./filters/filter";
import AquaProductOperations from "@/Services/product";
import { useCallback, useEffect, useState } from "react";
import AquaToast from "@/reusables/js/toast";
import AquaVerticalCard from "@/reusables/VerticalCard";
import { useRouter } from "next/router";
import TestVerticalcard from "@/reusables/testverticalcard";

const AquaShopComponent = () => {
  const router = useRouter();
  const SeoData = {
    title: "Aquakart | Shop",
    canonical: `${process.env.apiKey}${router.asPath}`,
  };
  const { getProducts, getProductsByFIlter, getAllProducts } =
    AquaProductOperations();
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);

  const LoadProducts = useCallback(() => {
    setProductLoading(true);
    getAllProducts("all", true)
      .then((res) => {
        console.log("all", res.data.products);
        setProducts(res.data.products);
        setProductLoading(false);
      })
      .catch(() => {
        AquaToast("Please try again", "error");
        setProductLoading(false);
      });
  }, [getAllProducts, setProducts]);
  useEffect(() => {
    LoadProducts();
  }, [LoadProducts]);

  const handleRange = (newRange) => {
    console.log("new", newRange, newRange.selectedCategory);
    if (newRange.value !== 0) {
      getAllProducts("price", newRange.value)
        .then((res) => {
          console.log(res.data.products);
          setProducts(res.data.products);
          setProductLoading(false);
        })
        .catch(() => {
          AquaToast("Please try again", "error");
          setProductLoading(false);
        });
    } else if (newRange.selectedCategory) {
      getAllProducts("category", newRange.selectedCategory._id)
        .then((res) => {
          console.log(res.data.products);
          setProducts(res.data.products);
          setProductLoading(false);
        })
        .catch(() => {
          AquaToast("Please try again", "error");
          setProductLoading(false);
        });
    }
  };

  const handleCategory = (data) => {
    console.log("data", data);
  };

  const ReloadAndClear = () => {
    getAllProducts("all", true)
      .then((res) => {
        console.log("all", res.data.products);
        setProducts(res.data.products);
        setProductLoading(false);
      })
      .catch(() => {
        AquaToast("Please try again", "error");
        setProductLoading(false);
      });
  };

  return (
    <AquaLayout seo={SeoData} container={true}>
      <div className="text-center mb-2">
        <AquaHeading level={1} content={"Shop Here"} decorate={true} />
      </div>
      <div className="row mb-4">
        <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
          <AquaCard>
            <AquaHeading level={3} content={"Apply filters"} decorate={true} />
            <AquaShopFilters
              onSelectionChange={handleRange}
              onClear={ReloadAndClear}
            />
          </AquaCard>
        </div>
        <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
          <AquaCard>
            <div className="row">
              {products.length <= 0 ? (
                <>
                  <div className="text-center">
                    <AquaHeading
                      level={2}
                      content={"No Products yet in the selected filter"}
                      decorate={true}
                    />
                    <button
                      className="btn btn-base btn-lg"
                      onClick={ReloadAndClear}
                    >
                      Clear
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {products.map((r, i) => (
                    <div key={i} className="col">
                      <TestVerticalcard data={r} />
                    </div>
                  ))}
                </>
              )}
            </div>
          </AquaCard>
        </div>
      </div>
    </AquaLayout>
  );
};
export default AquaShopComponent;
