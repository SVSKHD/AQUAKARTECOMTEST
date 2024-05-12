import axios from "axios";

const getProducts = async () => await axios.get(`/api/product/get`);

const getAllProducts = async (type, filterId) =>
  await axios.get(`/api/product/shop?${type}=${filterId}`);

const getProductById = async (query) =>
  await axios.get(`/api/product/get?id=${query}`);

const getProductByCategory = async (query) =>
  await axios.get(`/api/product/get?categoryId=${query}`);

const getProductsByFIlter = async (type, query) =>
  await axios.get(`/api/product/get?${type}=${query}`);

const AquaProductOperations = () => {
  return {
    getProducts,
    getAllProducts,
    getProductById,
    getProductByCategory,
    getProductsByFIlter,
  };
};

export default AquaProductOperations;
