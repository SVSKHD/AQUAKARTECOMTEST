import AquaCategoryOperations from "@/Services/category";
import AquaSubCategoryOperations from "@/Services/subCategory";
import AquaAccordian from "@/reusables/accrodian";
import AquaHeading from "@/reusables/heading";
import { useEffect, useState } from "react";



const AquaShopFilters = () => {
  const [categories , setCategories] = useState([])
  const [subs , setSubs] = useState([])
  const [range , setRange] = useState()
  
  return (
    <>
      <AquaAccordian
        title={<AquaHeading level={4}>hello</AquaHeading>}
      ></AquaAccordian>
    </>
  );
};
export default AquaShopFilters;
