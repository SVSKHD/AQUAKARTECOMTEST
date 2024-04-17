import AquaInput from "@/reusables/input";
import { useState } from "react";
const AquaSignup = ({ onDataChanged }) => {
  const [data, setData] = useState({ email: "", password: "" });
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
