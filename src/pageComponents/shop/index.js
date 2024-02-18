import AquaLayout from "@/Layout/Layout";
import AquaHeading from "@/reusables/heading";
import AquaCard from "@/reusables/card";
import AquaShopFilters from "./filters/filter";
import AquaProductOperations from "@/Services/product";
import { useCallback, useEffect, useState } from "react";
import AquaToast from "@/reusables/js/toast";
import AquaVerticalCard from "@/reusables/VerticalCard";

const AquaShopComponent = () => {
  const SeoData = {
    title: "Aquakart | Shop",
  };
  const { getProducts } = AquaProductOperations();
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
  const LoadProducts = useCallback(() => {
    setProductLoading(true);
    getProducts()
      .then((res) => {
        setProducts(res.data);
        setProductLoading(false);
      })
      .catch(() => {
        AquaToast("Please try again", "error");
        setProductLoading(false);
      });
  }, [getProducts, setProducts]);
  useEffect(() => {
    LoadProducts();
  }, [LoadProducts]);

  return (
    <AquaLayout seo={SeoData}>
      <AquaHeading level={1}>Shop here</AquaHeading>
      <hr />
      <div className="row mb-4">
        <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
          <AquaCard>
            <AquaHeading level={3}>Shop Filters</AquaHeading>
            <hr />
            <AquaShopFilters />
          </AquaCard>
        </div>
        <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
          <AquaCard>
            <AquaHeading level={1}>
              <div className="row">
                {products.map((r, i) => (
                  <div key={i} className="col">
                    <AquaVerticalCard
                      title={r.title}
                      images={r.photos}
                      price={r.price}
                      description={r.description}
                      data={r}
                    />
                  </div>
                ))}
              </div>
            </AquaHeading>
          </AquaCard>
        </div>
      </div>
    </AquaLayout>
  );
};
export default AquaShopComponent;
