import React, { useState } from "react"; // Ensure React is imported
import AquaLayout from "@/Layout/Layout";
import AquaHeading from "@/reusables/heading";
import AquaTabs from "@/reusables/tabs"; // Ensure this path is correct
import AquaCartComponent from "./cartComponent";
import AquaWishComponent from "./wishListComponent";
import { useRouter } from "next/router";

const AquaComparePageComponent = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const SeoData = {
    title: "Aquakart | Compare",
    canonical: `${process.env.apiKey}${router.asPath}`,
    image: "https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-384x384_ijvo24.png",
  };
  
  const compareTabs = [
    {
      title: "Wishlist",
      component: <h1>hello wish</h1>,
    },
    {
      title: "Cart",
      component: <h1>hello cart</h1>,
    }
  ];

  return (
    <>
      <AquaLayout seo={SeoData} container={true}>
       <h1>Compare</h1>
      </AquaLayout>
    </>
  );
};

export default AquaComparePageComponent;
