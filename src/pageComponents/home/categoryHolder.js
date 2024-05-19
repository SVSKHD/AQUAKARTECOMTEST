import AquaCategoryOperations from "@/Services/category";
import AquaImageCard from "@/reusables/imageCard";
import AquaToast from "@/reusables/js/toast";
import AquaCardMultiItemCarousel from "@/reusables/cardCarousel";
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
  const cards = [
    {
      title: "Card 1",
      description: "This is card 1",
    },
    {
      title: "Card 2",
      description: "This is card 2",
    },
    {
      title: "Card 3",
      description: "This is card 3",
    },
    {
      title: "Card 4",
      description: "This is card 4",
    },
    {
      title: "Card 5",
      description: "This is card 5",
    },
    {
      title: "Card 6",
      description: "This is card 6",
    },
    {
      title: "Card 7",
      description: "This is card 7",
    },
    {
      title: "Card 8",
      description: "This is card 8",
    },
  ];
  return (
    <>
      {!categories.length ? (
        <FadeLoader />
      ) : (
        <div className="row">
          {/* <AquaCardMultiItemCarousel>
            {categories.map((r, i) => (
              <div key={i} className="col-md-2 col-lg-3 col-xs-12 col-sm-12">
                <AquaImageCard
                  key={i}
                  title={r.title}
                  images={r.photos}
                  link={`/category/${r.title}`}
                />
              </div>
            ))}
          </AquaCardMultiItemCarousel> */}
          <CardCarousel cards={categories} CardComponent={<AquaImageCard />} />
        </div>
      )}
    </>
  );
};
export default AquaCategoryHolder;
