import AquaCategoryOperations from "@/Services/category";
import AquaSubCategoryOperations from "@/Services/subCategory";
import AquaAccordian from "@/reusables/accrodian";
import AquaHeading from "@/reusables/heading";
import { useEffect, useState } from "react";

const AquaShopFilters = () => {
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [range, setRange] = useState();

  return (
    <>
      <label for="customRange1" class="form-label">
        Price Range
      </label>
      <input type="range" class="form-range" id="customRange1"></input>
      <AquaAccordian
        title={<AquaHeading level={5} content={"Categories"}/>}
      ></AquaAccordian>
      <AquaAccordian
        title={<AquaHeading level={5} content={"Sub-Categories"}/>}
      ></AquaAccordian>
    </>
  );
};
export default AquaShopFilters;
