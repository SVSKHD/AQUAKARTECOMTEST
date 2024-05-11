import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AquaLayout from "@/Layout/Layout";
import AquaCommonCategoryCard from "@/components/cards/categoryPageCard";
import AquaCategoryOperations from "@/Services/category";
import AquaProductOperations from "@/Services/product";
import AquaVerticalCard from "@/reusables/VerticalCard";
import TestVerticalcard from "@/reusables/testverticalcard";

const AquaSubCategoryPageComponent = () => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { getCategoryByTitle } = AquaCategoryOperations();
  const { getProductByCategory } = AquaProductOperations();

  const SeoData = {
    title: `Aquakart | ${category.title}`,
    description: category.description,
    keywords: category.keywords,
    canonical: `${process.env.apiKey}${router.asPath}`,
    image:
      category.photos && category.photos.length > 0
        ? category.photos[0].secure_url
        : "https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-384x384_ijvo24.png",
  };

  const titleData = router.query.id;

  const loadCategory = useCallback(() => {
    if (titleData) {
      getCategoryByTitle(titleData)
        .then((res) => {
          setCategory(res.data);
        })
        .catch((err) => {
          console.error("Error loading category:", err);
        });
    }
  }, [titleData, getCategoryByTitle]);

  useEffect(() => {
    loadCategory();
  }, [loadCategory]);

  useEffect(() => {
    if (category._id) {
      getProductByCategory(category._id)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.error("Error loading products:", err);
        });
    }
  }, [category._id, getProductByCategory]);

  return (
    <>
      <AquaLayout seo={SeoData} container={true}>
        <div className="row">
          <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
            <AquaCommonCategoryCard data={category} />
          </div>
          <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
            <h1 className="text-muted">
              {category.title} category has {products.length} product
            </h1>
            <hr />
            <div className="row">
              {products.map((product, index) => (
                <div className="col" key={index}>
                  <TestVerticalcard data={product} />
                  {/* <AquaVerticalCard
                    title={product.title}
                    images={product.photos}
                    price={product.price}
                    description={product.description}
                    data={product}
                  /> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </AquaLayout>
    </>
  );
};

export default AquaSubCategoryPageComponent;
