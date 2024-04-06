import AquaLayout from "@/Layout/Layout";
import AquaHeading from "@/reusables/heading";
import AquaCard from "@/reusables/card";
import AquaShopFilters from "./filters/filter";
import AquaProductOperations from "@/Services/product";
import { useCallback, useEffect, useState } from "react";
import AquaToast from "@/reusables/js/toast";
import AquaVerticalCard from "@/reusables/VerticalCard";
import { useRouter } from "next/router";

const AquaShopComponent = () => {
  const router = useRouter();
  const SeoData = {
    title: "Aquakart | Shop",
    canonical: `${process.env.apiKey}${router.asPath}`,
  };
  const { getProducts } = AquaProductOperations();
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
  const LoadProducts = useCallback(() => {
    setProductLoading(true);
    getProducts()
      .then((res) => {
        console.log(res.data)
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
    <AquaLayout seo={SeoData} container={true}>
      <div className="text-center mb-2">
      <AquaHeading level={1} content={"Shop Here"} decorate={true}/>
      </div>
      <div className="row mb-4">
        <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
          <AquaCard>
            <AquaHeading level={3}  content={"Apply filters"} decorate={true}/>
            <AquaShopFilters />
          </AquaCard>
        </div>
        <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
          <AquaCard>
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
          </AquaCard>
        </div>
      </div>
    </AquaLayout>
  );
};
export default AquaShopComponent;
