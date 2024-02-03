import axios from "axios";

const baseUrl = process.env.apiKey;

const getProducts = async () =>
  await axios.get(`${baseUrl}/admin/crm/api/product/get`);

const getProductById = async (query) =>
  await axios.get(`${baseUrl}/admin/crm/api/product/get?id=${query}`);

const AquaProductOperations = () => {
  return {
    getProducts,
    getProductById,
  };
};

export default AquaProductOperations;
