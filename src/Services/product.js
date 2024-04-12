import axios from "axios";

const getProducts = async () => await axios.get(`/api/product/get`);

const getProductById = async (query) =>
  await axios.get(`/api/product/get?id=${query}`);

const getProductByCategory = async (query) =>
  await axios.get(`/api/product/get?categoryId=${query}`);

const AquaProductOperations = () => {
  return {
    getProducts,
    getProductById,
    getProductByCategory,
  };
};

export default AquaProductOperations;
