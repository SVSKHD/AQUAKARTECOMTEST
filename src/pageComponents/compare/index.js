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
    description:"Aquakart's product comparison tool empowers shoppers to make informed decisions by offering side-by-side comparisons of features, prices, and customer reviews. Easily evaluate multiple products, discover the best deals, and find the perfect fit for your needs.",
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
    {
      title:"Compare",
      component:<AquaCompareComponent/>
    }
  ];

  return (
    <>
     
        <AquaTabs tabs={compareTabs}/>
    
    </>
  );
};

export default AquaComparePageComponent;
