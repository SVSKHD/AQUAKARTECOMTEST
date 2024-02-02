const AquaTextAreaInput = ({
  label,
  placeholder,
  handleChange,
  type,
  value,
}) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          {label}
        </label>
        <textarea
          type={type}
          value={value}
          className="form-control"
          id="exampleFormControlInput1"
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};
export default AquaTextAreaInput;
