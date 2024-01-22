import AquaInput from "@/reusables/input";
import { useState } from "react";
const AquaSignin = ({ onDataChanged }) => {
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
        name="email"
        placeholder="please enter your email"
        value={data.email}
        handleChange={handleChange}
      />
      <AquaInput
        label="Password"
        size="lg"
        name="password"
        type="password"
        placeholder="please enter your password"
        value={data.password}
        handleChange={handleChange}
      />
    </>
  );
};
export default AquaSignin;
