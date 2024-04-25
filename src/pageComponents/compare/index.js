import React, { useState } from "react"; // Ensure React is imported
import AquaLayout from "@/Layout/Layout";
import AquaHeading from "@/reusables/heading";
import AquaTabs from "@/reusables/tabs"; // Ensure this path is correct
import AquaCartComponent from "./cartComponent";
import AquaWishComponent from "./wishListComponent";
import AquaCompareComponent from "./compareComponent";
import { useRouter } from "next/router";

const AquaComparePageComponent = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const SeoData = {
    title: "Aquakart | Compare Products",
    canonical: `${process.env.apiKey}${router.asPath}`,
    image:
      "https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-384x384_ijvo24.png",
  };

  const compareTabs = [
    {
      title: "Wishlist",
      component: <AquaWishComponent />,
    },
    {
      title: "Cart",
      component: <AquaCartComponent />,
    },
  ];

  return (
    <>
      <AquaLayout seo={SeoData} container={true}>
        <AquaTabs tabs={compareTabs} />
      </AquaLayout>
    </>
  );
};

export default AquaComparePageComponent;
