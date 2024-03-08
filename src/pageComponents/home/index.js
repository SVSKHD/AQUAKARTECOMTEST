import AquaLayout from "@/Layout/Layout";
import AquaCategoryHolder from "./categoryHolder";
import AquaSubCategoryHolder from "./subCategoryHolder";
import AquaProductHolder from "./productHolder";
import { useRouter } from "next/router";

const AquaHomeComponent = () => {
  const router = useRouter()
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
        <AquaCategoryHolder />
        <AquaSubCategoryHolder />
        <AquaProductHolder />
      </AquaLayout>
    </>
  );
};
export default AquaHomeComponent;
