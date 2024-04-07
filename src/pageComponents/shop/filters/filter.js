import AquaCategoryOperations from "@/Services/category";
import AquaSubCategoryOperations from "@/Services/subCategory";
import AquaAccordian from "@/reusables/accrodian";
import AquaHeading from "@/reusables/heading";
import AquaToast from "@/reusables/js/toast"; // Ensure this import is correct
import { useCallback, useEffect, useState } from "react";

const AquaShopFilters = ({ onRangeChange }) => { // Assuming onRangeChange is passed as a prop
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [range, setRange] = useState({ min: 0, max: 1000, value: 100 });
  const { getCategories } = AquaCategoryOperations();
  const { getSubCategories } = AquaSubCategoryOperations();

  const handleRangeChange = (event) => {
    const newValue = event.target.value;
    setRange((prevRange) => {
      const updatedRange = { ...prevRange, value: newValue };
      onRangeChange(updatedRange); // Make sure this function is passed as a prop
      return updatedRange;
    });
  };

  const loadCategories = useCallback(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error(err); // Using console.error for simplicity
        AquaToast("something went wrong", "error");
      });
  }, [getCategories]);

  const loadSubCategories = useCallback(() => {
    getSubCategories()
      .then((res) => {
        setSubs(res.data);
      })
      .catch((err) => {
        console.error(err); // Using console.error for simplicity
        AquaToast("something went wrong", "error");
      });
  }, [getSubCategories]);

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, [loadCategories, loadSubCategories]); // Removed categories and subs from the dependency array

  return (
    <>
      <div className="mb-3">
        {/* Price Range Input and Labels */}
      </div>
      <div>
  <AquaAccordian
    eventKey="0" // Unique key for this accordion item
    title={<AquaHeading level={5} content={"Categories"} />}
    content={
      <ol>
        {categories.map((c, i) => (
          <li key={i} onClick={() => console.log(`Selected category: ${c.title}`)} style={{ cursor: "pointer" }}>
            {c.title}
          </li>
        ))}
      </ol>
    }
  />
</div>
<div>
  <AquaAccordian
    eventKey="1" // Ensure this key is unique and different from the above
    title={<AquaHeading level={5} content={"Sub-Categories"} />}
    content={
      <ol>
        {subs.map((c, i) => (
          <li key={i} onClick={() => console.log(`Selected sub-category: ${c.title}`)} style={{ cursor: "pointer" }}>
            {c.title}
          </li>
        ))}
      </ol>
    }
  />
</div>
    </>
  );
};

export default AquaShopFilters;
