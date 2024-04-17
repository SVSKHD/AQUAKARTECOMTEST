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
  requiredMessage
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isTouched, setIsTouched] = useState(false);  // Track if the input has been touched

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle blur event
  const handleBlur = () => {
    setIsTouched(true);
  };

  // Determine if the input should show an error
  const showError = required && isTouched && !value;

  return (
    <>
      {type === "password" ? (
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            {label}
          </label>
          <div className="form-group position-relative">
            <input
              type={showPassword ? "text" : type}
              className={`form-control form-control-${size === "lg" ? "lg" : "sm"} ${showError ? 'is-invalid' : ''}`}
              value={value}
              name={name}
              aria-label={placeholder}
              placeholder={placeholder}
              onChange={handleChange}
              onBlur={handleBlur}  // Add blur event handler
              required={required}
            />
            <span
              className="viewpass"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
            </span>
            {showError && <div className="invalid-feedback">{requiredMessage}</div>}
          </div>
        </div>
      ) : (
        <div className="mb-3">
          <label htmlFor="validationCustom03" className="form-label">
            {label}
          </label>
          <input
            type={type}
            className={`form-control form-control-${size === "lg" ? "lg" : "sm"} ${showError ? 'is-invalid' : ''}`}
            size={size}
            name={name}
            aria-label={placeholder}
            id="exampleFormControlInput1"
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}  // Add blur event handler
            required={required}
          />
          {showError && <div className="invalid-feedback">{requiredMessage ? requiredMessage : "Field is Empty"}</div>}
        </div>
      )}
    </>
  );
};

export default AquaInput;
