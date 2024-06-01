import axios from "axios";

const getBlogs = async () => await axios.get(`/api/blog/getAll`);

const getBlogById = async (query) =>
  await axios.get(`/api/product/get?id=${query}`);

const getBlogByCategory = async (query) =>
  await axios.get(`/api/product/get?categoryId=${query}`);

const getBlogByFIlter = async (type, query) =>
  await axios.get(`/api/product/get?${type}=${query}`);

const AquaProductOperations = () => {
  return {
    getBlogs,
    getBlogById,
    getBlogByCategory,
    getBlogByFIlter,
  };
};

export default AquaProductOperations;
