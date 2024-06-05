import axios from "axios";

const getBlogs = async () => await axios.get(`/api/blog/getAll`);

const getBlogById = async (query) =>
  await axios.get(`/api/blog/getAll?id=${query}`);

const getBlogByCategory = async (query) =>
  await axios.get(`/api/blog/getAll?categoryId=${query}`);

const getBlogByFIlter = async (type, query) =>
  await axios.get(`/api/blog/getAll?${type}=${query}`);

const AquaBlogOperations = () => {
  return {
    getBlogs,
    getBlogById,
    getBlogByCategory,
    getBlogByFIlter,
  };
};

export default AquaBlogOperations;
