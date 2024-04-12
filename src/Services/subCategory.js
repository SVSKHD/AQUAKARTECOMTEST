import axios from "axios";

const getSubCategories = async () => await axios.get(`/api/subcategory/get`);

const getSubCategoryById = async (query) =>
  await axios.get(`/api/subcategory/get?id=${query}`);

const getSubCategoryByTitle = async (query) =>
  await axios.get(`/api/subcategory/get?title=${query}`);

const AquaSubCategoryOperations = () => {
  return {
    getSubCategories,
    getSubCategoryById,
    getSubCategoryByTitle,
  };
};

export default AquaSubCategoryOperations;
