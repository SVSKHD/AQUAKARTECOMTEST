import axios from "axios";

const baseUrl = process.env.apiKey;

const UserLogin = (data) => axios.post(`/api/user/login`, data);

const UserSignup = (data) => axios.post(`/api/user/signup`, data);

const userDataUpdate = (id, data) =>
  axios.put(`/api/user/update?id=${id}`, data);

const userGetData = (id) => axios.get(`/api/user/get?id=${id}`);

const ForgotPassword = () => {};

const UserOperations = () => {
  return {
    UserLogin,
    UserSignup,
    ForgotPassword,
    userDataUpdate,
    userGetData,
  };
};
export default UserOperations;
