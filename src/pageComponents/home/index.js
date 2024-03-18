import AquaLayout from "@/Layout/Layout";
import AquaCategoryHolder from "./categoryHolder";
import AquaSubCategoryHolder from "./subCategoryHolder";
import AquaProductHolder from "./productHolder";
import { useRouter } from "next/router";
import AquaLargeTitle from "@/reusables/largeTitle";

const AquaHomeComponent = () => {
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

  return (
    <>
      <AquaLayout seo={SeoData}>
        <div className="container">
          <div className="mb-5 text-center">
            <h1 className="underline-animation display-1">Aquakart</h1>
            <h2 className="index-second display-3">
              "Transform your water from 'rock concert' to 'smooth jazz' with
              our water softeners!"
            </h2>
          </div>
        </div>
        <div className="index-section1 mb-3">
          <div className="container p-3">
            <div className="row">
              <div className="col-md-6 col-lg-6">
                <p className="index-section1-p">
                  Putting the humor aside, we're here to guide you to the
                  perfect water softener tailored to your home's needs and
                  preferences.
                </p>
              </div>
              <div className="col-md-6 col-lg-6 image-div-adjust">
                <AquaCategoryHolder />
              </div>
            </div>
          </div>
        </div>

        {/* <AquaSubCategoryHolder /> */}
        {/* <AquaProductHolder /> */}
      </AquaLayout>
    </>
  );
};
export default AquaHomeComponent;
