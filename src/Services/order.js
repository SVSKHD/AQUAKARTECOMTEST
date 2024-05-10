import axios from "axios";

const CreateOrder = (data) => axios.post(`/api/order/create`, data);
const CreateCodOrder = (data) => axios.post(`/api/order/cod`, data);
const UpdateOrder = (id, data) => axios.put(`/api/order/${id}`, data);
const getOrderById = (id) => axios.get(`/api/order/get?orderId=${id}`);
const getOrderByUserId = (id) => axios.get(`/api/order/get?userId=${id}`);
const getOrderByTrasactionId = (id) => axios.get(`/api/order/get?transactionId=${id}`);

const AquaOrderOperatrions = () => {
  return {
    CreateOrder,
    CreateCodOrder,
    UpdateOrder,
    getOrderById,
    getOrderByUserId,
    getOrderByTrasactionId,
  };
};

export default AquaOrderOperatrions;
