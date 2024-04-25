import axios from "axios";

const baseUrl = process.env.apiKey;

const UserLogin = (data) => axios.post(`/api/user/login`, data);

const UserSignup = (data) => axios.post(`/api/user/signup`, data);

const userDataUpdate = (id, data) =>
  axios.put(`/api/user/update?id=${id}`, data);

const userGetData = (id) => axios.get(`/api/user/get?id=${id}`);

const ForgotPassword = (email) =>
  axios.post(`/api/user/forgot-password`, email);

const VerifyData = (data) => axios.post(`/api/user/verify-otp`, data);

const UserOperations = () => {
  return {
    UserLogin,
    UserSignup,
    ForgotPassword,
    userDataUpdate,
    userGetData,
    VerifyData,
  };
};
export default UserOperations;
