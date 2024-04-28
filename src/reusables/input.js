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
  required,
  requiredMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isTouched, setIsTouched] = useState(false); // Track if the input has been touched

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  const showError = required && isTouched && !value;

  // Handle phone input change to restrict to 10 digits
  const handlePhoneInputChange = (event) => {
    const inputValue = event.target.value;
    // Only update state if the input is numeric and <= 10 digits
    if (inputValue.length <= 10 && /^\d*$/.test(inputValue)) {
      handleChange(event);
    }
  };

  // Decide which onChange handler to use based on the input type
  const inputChangeHandler =
    type === "phone" ? handlePhoneInputChange : handleChange;

  return (
    <>
      {type === "password" ? (
        <div className="mb-3">
          <label htmlFor={name} className="form-label">
            {label}
          </label>
          <div className="form-group position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control form-control-${size} ${showError ? "is-invalid" : ""}`}
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={handleChange}
              onBlur={handleBlur}
              required={required}
            />
            <span
              className="viewpass"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
            </span>
            {showError && (
              <div className="invalid-feedback">{requiredMessage}</div>
            )}
          </div>
        </div>
      ) : (
        <div className="mb-3">
          <label htmlFor={name} className="form-label">
            {label}
          </label>
          <input
            type={type}
            className={`form-control form-control-${size} ${showError ? "is-invalid" : ""}`}
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={inputChangeHandler}
            onBlur={handleBlur}
            required={required}
          />
          {showError && (
            <div className="invalid-feedback">
              {requiredMessage ? requiredMessage : "Field is Empty"}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AquaInput;
