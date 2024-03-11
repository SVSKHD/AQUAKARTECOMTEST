import AquaLayout from "@/Layout/Layout";
import AquaHeading from "@/reusables/heading";
import AquaTabs from "@/reusables/tabs";
import AquaCartComponent from "./cartComponent";
import { useState } from "react";
import { useRouter } from "next/router";

const AquaComparePageComponent = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const SeoData = {
    title: "Aquakart | Compare",
    canonical: `${process.env.apiKey}${router.asPath}`,
    image:
      "https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-384x384_ijvo24.png",
  };
  const compareTabs = [
    {
      title: "Wishlist",
      component: <h1>wishlist</h1>,
    },
    {
      title: "Cart",
      component: <AquaCartComponent />,
    },
    {
      title: "Compare",
      component: <h1>Compare</h1>,
    },
  ];
  return (
    <>
      <AquaLayout seo={SeoData}>
        <AquaHeading level={1}>Hello Aquakart Compare</AquaHeading>
        <AquaTabs tabs={compareTabs} />
      </AquaLayout>
    </>
  );
};
export default AquaComparePageComponent;
