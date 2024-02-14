import axios from "axios";

const baseUrl = process.env.apiKey;
const UserLogin = (data) =>
  axios.post(`${baseUrl}/admin/crm/api/user/login`, data);

const UserSignup = (data) =>
  axios.post(`${baseUrl}/admin/crm/api/user/signup`, data);

const ForgotPassword = () => {};

const UserOperations = () => {
  return {
    UserLogin,
    UserSignup,
    ForgotPassword,
  };
};
export default UserOperations;
