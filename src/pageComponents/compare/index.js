import AquaLayout from "@/Layout/Layout";
import AquaHeading from "@/reusables/heading";
import AquaTabs from "@/reusables/tabs";
import { useState } from "react";

const AquaComparePageComponent = () => {
  const [products, setProducts] = useState([]);
  const SeoData = {
    title: "Aquakart | Compare",
  };
  const compareTabs = [
    {
      title: "Wishlist",
      component: <h1>wishlist</h1>,
    },
    {
      title: "Cart",
      component: <h1>Cart</h1>,
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
