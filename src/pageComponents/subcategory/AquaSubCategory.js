import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AquaLayout from "@/Layout/Layout";
import AquaCommonCategoryCard from "@/components/cards/categoryPageCard";
import AquaSubCategoryOperations from "@/Services/subCategory";

const AquaSubCategoryPageComponent = () => {
  const [category, setCategory] = useState({});
  const { getSubCategoryByTitle } = AquaSubCategoryOperations();
  const SeoData = {
    title: `Aquakart | ${category.title}`,
    description: category.description,
    keywords: category.keywords,
    image: category.photos
      ? category.photos[0].secure_url
      : "https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-384x384_ijvo24.png",
  };

  const router = useRouter();
  let titleData = router.query.id;

  const loadCategory = useCallback(() => {
    getSubCategoryByTitle(titleData)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [getSubCategoryByTitle, setCategory, titleData]);

  useEffect(() => {
    loadCategory();
  }, [loadCategory]);

  return (
    <>
      <AquaLayout seo={SeoData}>
        <div className="row">
          <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
            <AquaCommonCategoryCard data={category} />
          </div>
          <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12"></div>
        </div>
      </AquaLayout>
    </>
  );
};
export default AquaSubCategoryPageComponent;
