import AquaInput from "@/reusables/input";
import { useState } from "react";
const AquaSignup = ({ onDataChanged }) => {
  const [data, setData] = useState({ email: "", password: "" , firstName:"" , phone:"" });
  const handleChange = (e) => {
    const updatedData = { ...data, [e.target.name]: e.target.value };
    setData(updatedData);
    if (onDataChanged) {
      onDataChanged(updatedData);
    }
  };
  return (
    <>
      <AquaInput
        label="Email"
        size="lg"
        placeholder="please enter your email"
        name="email"
        value={data.email}
        handleChange={handleChange}
        required={true}
        requiredMessage={"Please Enter Email"}
      />
      <AquaInput
        label="First Name"
        size="lg"
        placeholder="please enter your first name"
        name="firstName"
        value={data.firstName}
        handleChange={handleChange}
        required={true}
        requiredMessage={"Please Enter Your First Name"}
      />
      <AquaInput
        type="phone"
        label="Phone"
        size="lg"
        placeholder="please enter your phone:no"
        name="firstName"
        value={data.phone}
        handleChange={handleChange}
        required={true}
        requiredMessage={"Please Enter Your Phone No"}
      />
      <AquaInput
        label="Password"
        size="lg"
        type="password"
        name="password"
        placeholder="please enter your password"
        value={data.password}
        handleChange={handleChange}
        required={true}
        requiredMessage={"Please Enter Password"}
      />
    </>
  );
};
export default AquaSignup;
