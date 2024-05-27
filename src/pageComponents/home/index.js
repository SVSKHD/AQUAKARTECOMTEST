import AquaLayout from "@/Layout/Layout";
import AquaCategoryHolder from "./categoryHolder";
import AquaSubCategoryHolder from "./subCategoryHolder";
import AquaProductHolder from "./productHolder";
import { useRouter } from "next/router";
import AquaLargeTitle from "@/reusables/largeTitle";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardCarousel from "@/reusables/AquaCardCarouselNew";
import AquaHeading from "@/reusables/heading";

const AquaHomeComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const SeoData = {
    title: "Aquakart | Online Shopping for Softeners purifiers and many more",
    description:
      "Aquakart is renowned for revolutionizing water softening solutions in the e-commerce sphere, offering an array of top-tier water softeners designed to tackle hard water woes effectively. Their innovative range is meticulously engineered to enhance water quality, ensuring that every drop is pure, soft, and conducive to a healthy lifestyle. Aquakart's softeners stand out for their efficiency, durability, and ease of use, making them a prime choice for discerning homeowners seeking to safeguard their appliances from the ravages of hard water.",
    image:
      "https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-384x384_ijvo24.png",
    canonical: `${process.env.apiKey}${router.pathname}`,
    keywords:
      "Aquakart Ecom Store , water softeners  , water Ro  , ro machines , Salt Free Water Softener , Water Softener System , Water Softener Installation",
    keyphrases: "Water Softener Salt Prices , Salt Water Softener",
  };

  const { user } = useSelector((state) => ({ ...state }));
  return (
    <>
      <AquaLayout seo={SeoData}>
        <div className="container mb-3">
          <div>
            <div className="mb-3">
              <div className="card-body">
                <div className="row">
                  <div className={user ? "col-9" : "col-12"}>
                    <div className="card rounded-4">
                      <div className="card-body"></div>
                    </div>
                  </div>
                  <div className={user ? "col-3" : ""}>
                    {user ? (
                      <div className="card rounded-4">
                        <div className="card-body">
                          <div className="mt-2 mb-3">
                            <h3>{user?.user?.firstName}</h3>
                          </div>
                          <div className="text-muted">
                            <p>
                              Thank you for being with us! 🌟 We truly value
                              your continued support. As a token of our
                              appreciation, please explore the exclusive offers
                              we’ve curated just for you. Enjoy your journey
                              with us! 🎉
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AquaHeading
            content={"Categories"}
            level={2}
            customclass={"mb-2"}
            decorate={true}
          />
          <AquaCategoryHolder />
          <AquaHeading
            content={"Products"}
            level={2}
            customclass={"mb-2"}
            decorate={true}
          />
          <AquaProductHolder />
        </div>
        {/* second section */}
      </AquaLayout>
    </>
  );
};
export default AquaHomeComponent;
