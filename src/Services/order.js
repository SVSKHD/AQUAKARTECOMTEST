import axios from "axios";

const CreateOrder = (data) => axios.post(`/api/order/create`, data);
const UpdateOrder = (id, data) => axios.put(`/api/order/${id}`, data);
const getOrderById = (id) => axios.get(`/api/order/get?userId=${id}`);
const getOrderByUserId = (id) => axios.get(`/api/order/${id}`);
const getOrderByTrasactionId = (id) => axios.get(`/api/order/${id}`);

const AquaOrderOperatrions = () => {
  return {
    CreateOrder,
    UpdateOrder,
    getOrderById,
    getOrderByUserId,
    getOrderByTrasactionId,
  };
};

export default AquaOrderOperatrions;
