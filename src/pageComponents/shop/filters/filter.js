import AquaCategoryOperations from "@/Services/category";
import AquaSubCategoryOperations from "@/Services/subCategory";
import AquaAccordian from "@/reusables/accrodian";
import AquaHeading from "@/reusables/heading";
import AquaToast from "@/reusables/js/toast";
import { useCallback, useEffect, useState } from "react";

const AquaShopFilters = ({ onSelectionChange }) => {
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [range, setRange] = useState({ min: 0, max: 1000000, value: 100 });
  const { getCategories } = AquaCategoryOperations();
  const { getSubCategories } = AquaSubCategoryOperations();

  const handleRangeChange = (event) => {
    const newValue = event.target.value;
    setRange((prevRange) => {
      const updatedRange = { ...prevRange, value: newValue };
      onSelectionChange({ ...updatedRange, selectedCategories, selectedSubs });
      return updatedRange;
    });
  };

  const toggleCategorySelection = (category) => {
    const currentIndex = selectedCategories.indexOf(category);
    const newSelected = [...selectedCategories];

    if (currentIndex === -1) {
      newSelected.push(category);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelectedCategories(newSelected);
    onSelectionChange({ range, selectedCategories: newSelected, selectedSubs });
  };

  const toggleSubCategorySelection = (subcategory) => {
    const currentIndex = selectedSubs.indexOf(subcategory);
    const newSelected = [...selectedSubs];

    if (currentIndex === -1) {
      newSelected.push(subcategory);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelectedSubs(newSelected);
    onSelectionChange({ range, selectedCategories, selectedSubs: newSelected });
  };

  const loadCategories = useCallback(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error(err);
        AquaToast("something went wrong", "error");
      });
  }, [getCategories]);

  const loadSubCategories = useCallback(() => {
    getSubCategories()
      .then((res) => {
        setSubs(res.data);
      })
      .catch((err) => {
        console.error(err);
        AquaToast("something went wrong", "error");
      });
  }, [getSubCategories]);

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, [loadCategories, loadSubCategories]);

  return (
    <>
      <div>
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
        <AquaAccordian
          eventKey="0"
          title={<AquaHeading level={5} content={"Categories"} />}
          content={
            <div className="list-group">
              {categories.map((category, index) => (
                <label className="list-group-item" key={index}>
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategorySelection(category)}
                  />
                  {category.title}
                </label>
              ))}
            </div>
          }
        />
      </div>
      <div>
        <AquaAccordian
          eventKey="1"
          title={<AquaHeading level={5} content={"Sub-Categories"} />}
          content={
            <div className="list-group">
              {subs.map((sub, index) => (
                <label className="list-group-item" key={index}>
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    checked={selectedSubs.includes(sub)}
                    onChange={() => toggleSubCategorySelection(sub)}
                  />
                  {sub.title}
                </label>
              ))}
            </div>
          }
        />
      </div>
    </>
  );
};

export default AquaShopFilters;
