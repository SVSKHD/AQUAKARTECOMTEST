import React, { useState, useEffect } from "react";
import AquaDialog from "@/reusables/dialog";
import AquaHeading from "@/reusables/heading";
import AquaInput from "@/reusables/input"; // Assuming you have an input component

const AquaAddressDialog = ({ show, hide, onSave, address }) => {
  const [localAddress, setLocalAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  useEffect(() => {
    if (address) setLocalAddress(address);
  }, [address]);

  useEffect(() => {
    if (show === false) {
      setLocalAddress({
        street: "",
        city: "",
        state: "",
        postalCode: "",
      });
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(localAddress);
  };

  return (
    <AquaDialog
      title={
        <AquaHeading decorate={true} content={"Manage Address"} level={2} />
      }
      show={show}
      handleClose={hide}
    >
      <AquaInput
        name="street"
        label="Street or Apartment"
        value={localAddress.street}
        handleChange={handleChange}
        required={true}
        requiredMessage={"Please fill street or Appartment full address"}
      />
      <AquaInput
        name="city"
        label="City"
        value={localAddress.city}
        handleChange={handleChange}
        required={true}
        requiredMessage={"Please fill your city-name"}
      />
      <AquaInput
        name="state"
        label="State"
        value={localAddress.state}
        handleChange={handleChange}
        required={true}
        requiredMessage={"Please fill your state-name"}
      />
      <AquaInput
        name="postalCode"
        label="Postal Code"
        value={localAddress.postalCode}
        handleChange={handleChange}
        required={true}
        requiredMessage={"please fill your postal-code"}
      />
      <button className="btn btn-primary" onClick={handleSave}>
        Save Address
      </button>
    </AquaDialog>
  );
};
export default AquaAddressDialog;
