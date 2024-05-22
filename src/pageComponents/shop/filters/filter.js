import AquaCategoryOperations from "@/Services/category";
import AquaSubCategoryOperations from "@/Services/subCategory";
import AquaCurrencyFormat from "@/reusables/currencyFormatter";
import AquaHeading from "@/reusables/heading";
import AquaToast from "@/reusables/js/toast";
import { useCallback, useEffect, useState } from "react";

const AquaShopFilters = ({ onSelectionChange, onClear }) => {
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [range, setRange] = useState({ min: 0, max: 100000, value: 100 });
  const [displayedRangeValue, setDisplayedRangeValue] = useState(100);

  const { getCategories } = AquaCategoryOperations();
  const { getSubCategories } = AquaSubCategoryOperations();

  const handleRangeChange = (event) => {
    const newValue = event.target.value;
    setRange((prevRange) => {
      const updatedRange = { ...prevRange, value: newValue };
      onSelectionChange({ ...updatedRange, selectedCategory, selectedSubs });
      return updatedRange;
    });
    setDisplayedRangeValue(newValue);
  };

  const isFilterApplied = () => {
    return (
      selectedCategory !== null ||
      selectedSubs.length > 0 ||
      range.value !== 100
    );
  };

  const toggleCategorySelection = (category) => {
    const newSelectedCategory =
      selectedCategory && selectedCategory._id === category._id
        ? null
        : category;
    setSelectedCategory(newSelectedCategory);
    onSelectionChange({
      range,
      selectedCategory: newSelectedCategory,
      selectedSubs,
    });
  };

  const toggleSubCategorySelection = (subcategory) => {
    const subCategoryId = subcategory._id;
    const currentIndex = selectedSubs.indexOf(subCategoryId);
    const newSelected = [...selectedSubs];

    if (currentIndex === -1) {
      newSelected.push(subCategoryId);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelectedSubs(newSelected);
    onSelectionChange({ range, selectedCategory, selectedSubs: newSelected });
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubs([]);
    setRange({ min: 0, max: 100000, value: 100 });
    setDisplayedRangeValue(100);
    onSelectionChange({
      min: 0,
      max: 100000,
      value: 100,
      selectedCategory: null,
      selectedSubs: [],
    });
    if (onClear) {
      onClear();
    }
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
      <div className="mb-3">
        <label htmlFor="customRange1" className="form-label">
          Price Range:{" "}
          <span className="text-success">
            <AquaCurrencyFormat amount={displayedRangeValue} />
          </span>
        </label>
        <input
          type="range"
          className="form-range"
          id="customHandleRangeChange1"
          min={range.min}
          max={range.max}
          value={range.value}
          onChange={handleRangeChange}
        />
        <div className="d-flex justify-content-between">
          <span className="text-success">
            {<AquaCurrencyFormat amount={range.min} />}
          </span>
          <span className="text-success">
            {<AquaCurrencyFormat amount={range.max} />}
          </span>
        </div>
      </div>
      <div>
        {/* <AquaAccordian
          eventKey="0"
          title={<AquaHeading level={5} content={"Categories"} />}
          content={
            <div className="list-group">
              {categories.map((category, index) => (
                <label className="list-group-item" key={index}>
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    checked={
                      selectedCategory && selectedCategory._id === category._id
                    }
                    onChange={() => toggleCategorySelection(category)}
                  />
                  {category.title}
                </label>
              ))}
            </div>
          }
        /> */}
      </div>
      {/* will apply this soon in next phase */}
      {/* <div>
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
      </div> */}
      {isFilterApplied() && (
        <button className="btn btn-secondary mt-3" onClick={clearFilters}>
          Clear Filters
        </button>
      )}
    </>
  );
};

export default AquaShopFilters;
