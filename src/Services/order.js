import axios from "axios";

const CreateOrder = (data) => axios.post(`/api/order/create`, data);
const UpdateOrder = (id, userid, data) =>
  axios.put(`/api/order/${id}?userId=${userid}`, data);
const getOrderById = (id) => axios.get(`/api/order/get?userId=${id}`);
const getOrderByUserId = (id) => axios.get(`/api/order/${id}`);

const AquaOrderOperatrions = () => {
  return {
    CreateOrder,
    UpdateOrder,
    getOrderById,
    getOrderByUserId,
  };
};

export default AquaOrderOperatrions;
