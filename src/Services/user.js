import axios from "axios";

const UserLogin = (data) => axios.post("admin/crm/api/user/register", data);

const UserSignup = (data) => axios.post("/admin/crm/api/user/login", data);

const ForgotPassword = () => {};

const UserOperations = () => {
  return {
    UserLogin,
    UserSignup,
    ForgotPassword,
  };
};
export default UserOperations;
