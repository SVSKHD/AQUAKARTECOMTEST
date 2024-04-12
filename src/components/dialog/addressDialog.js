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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(localAddress);
    hide();
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
        onChange={handleChange}
      />
      <AquaInput
        name="city"
        label="City"
        value={localAddress.city}
        onChange={handleChange}
      />
      <AquaInput
        name="state"
        label="State"
        value={localAddress.state}
        onChange={handleChange}
      />
      <AquaInput
        name="postalCode"
        label="Postal Code"
        value={localAddress.postalCode}
        onChange={handleChange}
      />
      <button className="btn btn-primary" onClick={handleSave}>
        Save Address
      </button>
    </AquaDialog>
  );
};
export default AquaAddressDialog;
