import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const getProducts = async () =>
  await axios.get(`${baseUrl}/admin/crm/api/category/get`);

const getProductById = async (query) =>
  await axios.get(`${baseUrl}/admin/crm/api/category/get?id=${query}`);

const AquaProductOperations = () => {
  return {
    getProducts,
    getProductById,
  };
};

export default AquaProductOperations;
