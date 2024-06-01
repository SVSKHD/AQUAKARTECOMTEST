import axios from "axios";

const getBlogs = async () => await axios.get(`/api/blog/getAll`);

const getAllProducts = async (type, filterId) =>
  await axios.get(`/api/product/shop?${type}=${filterId}`);

const getProductById = async (query) =>
  await axios.get(`/api/product/getAll?id=${query}`);

const getProductByCategory = async (query) =>
  await axios.get(`/api/product/getAll?categoryId=${query}`);

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
