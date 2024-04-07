import AquaCategoryOperations from "@/Services/category";
import AquaSubCategoryOperations from "@/Services/subCategory";
import AquaAccordian from "@/reusables/accrodian";
import AquaHeading from "@/reusables/heading";
import { useCallback, useEffect, useState } from "react";

const AquaShopFilters = () => {
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [range, setRange] = useState({ min: 0, max: 1000, value: 100 });
  const { getCategories } = AquaCategoryOperations();
  const { getSubCategories } = AquaSubCategoryOperations();

  const handleRangeChange = (event) => {
    const newValue = event.target.value;
    setRange((prevRange) => {
      const updatedRange = { ...prevRange, value: newValue };
      onRangeChange(updatedRange); // Call the prop function with the new range value
      return updatedRange;
    });
  };

  const loadCategories = useCallback(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch(() => {
        AquaToast("something went wrong", "error");
      });
  }, [getCategories, setCategories]);

  const loadSubCategories = useCallback(() => {
    getSubCategories()
      .then((res) => {
        setSubs(res.data);
      })
      .catch(() => {
        AquaToast("something went wrong", "error");
      });
  }, [getSubCategories, setSubs]);

  return (
    <>
      <div className="mb-3">
        <label htmlFor="customRange1" className="form-label">
          Price Range
        </label>
        <input
          type="range"
          className="form-range"
          id="customRange1"
          min={range.min}
          max={range.max}
          value={range.value}
          onChange={handleRangeChange}
        />
        <div className="d-flex justify-content-between">
          <span>{range.min}</span>
          <span>{range.max}</span>
        </div>
      </div>
      <div>
        <AquaAccordian title={<AquaHeading level={5} content={"Categories"} />}>
          <ol>
            {categories.map((c, i) => (
              <li
                key={i}
                onClick={() => console.log(`Selected category: ${c.title}`)}
                style={{ cursor: "pointer" }}
              >
                {c.title}
              </li>
            ))}
          </ol>
        </AquaAccordian>
      </div>

      <div>
        <AquaAccordian
          title={<AquaHeading level={5} content={"Sub-Categories"} />}
        >
          <ol>
            {subs.map((c, i) => (
              <li
                key={i}
                onClick={() => console.log(`Selected sub-category: ${c.title}`)}
                style={{ cursor: "pointer" }}
              >
                {c.title}
              </li>
            ))}
          </ol>
        </AquaAccordian>
      </div>
    </>
  );
};
export default AquaShopFilters;
