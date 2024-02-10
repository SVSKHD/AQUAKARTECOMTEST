import AquaLayout from "@/Layout/Layout";
import AquaHeading from "@/reusables/heading";
import AquaTabs from "@/reusables/tabs";

const AquaComparePageComponent = () => {
  const SeoData = {
    title: "Aquakart | Compare",
  };
  const compareTabs = [
    {
      title: "Wishlist",
      component: <h1>wishlist</h1>,
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
