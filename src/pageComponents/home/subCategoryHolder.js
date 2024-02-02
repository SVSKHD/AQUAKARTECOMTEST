import AquaSubCategoryOperations from "@/Services/subCategory";
import AquaImageCard from "@/reusables/imageCard";
import AquaToast from "@/reusables/js/toast";
import AquaCardMultiItemCarousel from "@/reusables/cardCarousel";
import { useEffect, useState, useCallback } from "react";

const AquaSubCategoryHolder = () => {
  const [subcategories, setSubCategories] = useState([]);
  const { getSubCategories } = AquaSubCategoryOperations();
  const loadSubCategories = useCallback(() => {
    getSubCategories()
      .then((res) => {
        setSubCategories(res.data);
      })
      .catch(() => {
        AquaToast("not-fetched", "error");
      });
  }, [getSubCategories, setSubCategories]);

  useEffect(() => {
    loadSubCategories();
  }, [loadSubCategories]);

  return (
    <>
      {!subcategories.length ? (
        <h3>No Categories yet</h3>
      ) : (
        <div className="row">
          <AquaCardMultiItemCarousel>
            {subcategories.map((r, i) => (
              <>
                <div className="col-md-2 col-lg-3 col-xs-6 col-sm-16">
                  <AquaImageCard
                    key={i}
                    title={r.title}
                    images={r.photos}
                    link={`/subcategory/${r.title}`}
                  />
                </div>
              </>
            ))}
          </AquaCardMultiItemCarousel>
        </div>
      )}
    </>
  );
};
export default AquaSubCategoryHolder;
