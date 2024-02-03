import AquaCategoryOperations from "@/Services/category";
import AquaImageCard from "@/reusables/imageCard";
import AquaToast from "@/reusables/js/toast";
import AquaCardMultiItemCarousel from "@/reusables/cardCarousel";
import { useEffect, useState, useCallback } from "react";
import { FadeLoader } from "react-spinners";

const AquaCategoryHolder = () => {
  const [categories, setCategories] = useState([]);
  const { getCategories } = AquaCategoryOperations();
  const loadCategories = useCallback(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch(() => {
        AquaToast("something went wrong", "error");
      });
  }, [getCategories, setCategories]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <>
      {!categories.length ? (
        <FadeLoader />
      ) : (
        <div className="row">
          <AquaCardMultiItemCarousel>
            {categories.map((r, i) => (
              <>
                <div className="col-md-2 col-lg-3 col-xs-12 col-sm-12">
                  <AquaImageCard
                    key={i}
                    title={r.title}
                    images={r.photos}
                    link={`/category/${r.title}`}
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
export default AquaCategoryHolder;
