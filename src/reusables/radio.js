import React from "react";
import { Form } from "react-bootstrap";

const AquaRadio = ({ handleChange, name, value, checked, label, type }) => {
  return (
    <Form.Check
      type={type}
      name={name} // Name of the radio group, important for grouping radios together
      value={value} // Value of this radio button
      checked={checked} // Determines if this radio button is selected
      onChange={handleChange} // Function to call when the radio button value changes
      label={label} // Text label for the radio button
      id={`radio-${value}`} // Unique ID for the input element
    />
  );
};

export default AquaRadio;
