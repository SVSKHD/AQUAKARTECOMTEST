import AquaCategoryOperations from "@/Services/category";
import AquaImageCard from "@/reusables/imageCard";
import AquaToast from "@/reusables/js/toast";
import { useEffect, useState, useCallback } from "react";
import { FadeLoader } from "react-spinners";
import CardCarousel from "@/reusables/AquaCardCarouselNew";

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
      <div className="mb-3">
        {categories.length ? (
          <CardCarousel cards={categories} CardComponent={<AquaImageCard />} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default AquaCategoryHolder;
