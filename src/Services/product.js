import axios from "axios";

const baseUrl = process.env.apiKey;

const getProducts = async () =>
  await axios.get(`${baseUrl}/admin/crm/api/product/get`);

const getProductById = async (query) =>
  await axios.get(`${baseUrl}/admin/crm/api/product/get?id=${query}`);

const getProductByCategory = async(query) => (await axios.get(`${baseUrl}/admin/crm/api/product/get?categoryId=${query}`))

const AquaProductOperations = () => {
  return {
    getProducts,
    getProductById,
    getProductByCategory
  };
};

export default AquaProductOperations;
