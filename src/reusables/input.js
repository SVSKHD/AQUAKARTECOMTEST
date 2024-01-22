import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const AquaInput = ({
  label,
  placeholder,
  handleChange,
  type,
  value,
  size,
  name,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      {type === "password" ? (
        <div className="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            {label}
          </label>
          <div class="form-group position-relative">
            <input
              type={showPassword ? "text" : type}
              className={`form-control form-control-${
                size === "lg" ? "lg" : "sm"
              }`}
              value={value}
              name={name}
              aria-label={placeholder}
              placeholder={placeholder}
              onChange={handleChange}
            />
            <span
              class="viewpass"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? (
                <FaEyeSlash size={25} /> // Font Awesome closed eye icon
              ) : (
                <FaEye size={25} /> // Font Awesome open eye icon
              )}
            </span>
          </div>
        </div>
      ) : (
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            {label}
          </label>
          <input
            type={type}
            className={`form-control form-control-${
              size === "lg" ? "lg" : "sm"
            }`}
            size={size}
            name={name}
            aria-label={placeholder}
            id="exampleFormControlInput1"
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
          />
        </div>
      )}
    </>
  );
};
export default AquaInput;
