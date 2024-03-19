import React, { useState, useEffect } from "react";
import AquaHeading from "@/reusables/heading";
import AquaInput from "@/reusables/input";

const UserForm = ({ data, onUpdate }) => {
  const [formData, setFormData] = useState(data);
  const [editIndex, setEditIndex] = useState(null); // To track which address is being edited
  const [showAddressInputs, setShowAddressInputs] = useState(false); // To show/hide new address inputs
  const [newAddress, setNewAddress] = useState({ street: "", city: "", state: "", postalCode: "" }); // State for a new address

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e, index, field) => {
    if (index !== undefined && field) {
      const updatedAddresses = [...formData.addresses];
      updatedAddresses[index] = { ...updatedAddresses[index], [field]: e.target.value };
      setFormData({ ...formData, addresses: updatedAddresses });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleNewAddressChange = (e, field) => {
    setNewAddress({ ...newAddress, [field]: e.target.value });
  };

  const handleAddNewAddress = () => {
    const updatedAddresses = [...formData.addresses, newAddress];
    setFormData({ ...formData, addresses: updatedAddresses });
    setNewAddress({ street: "", city: "", state: "", postalCode: "" }); // Reset new address
    setShowAddressInputs(false); // Hide new address inputs
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
  };

  const handleSaveEdit = () => {
    setEditIndex(null); // Reset edit index to stop editing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
          <AquaHeading level={4}>Contact Details</AquaHeading>
          <AquaInput label="Alternative Email" name="alternativeEmail" value={formData.alternativeEmail || ""} onChange={handleChange} />
          <AquaInput label="Phone No" name="phoneNo" value={formData.phoneNo || ""} onChange={handleChange} />
        </div>
        <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
          <AquaHeading level={4}>Addresses</AquaHeading>
          {formData.addresses.map((address, i) => (
            <div key={i} className="mb-3">
              {editIndex === i ? (
                <>
                  <AquaInput label="Street" name="street" value={address.street} onChange={(e) => handleChange(e, i, "street")} />
                  <AquaInput label="City" name="city" value={address.city} onChange={(e) => handleChange(e, i, "city")} />
                  <AquaInput label="State" name="state" value={address.state} onChange={(e) => handleChange(e, i, "state")} />
                  <AquaInput label="Postal Code" name="postalCode" value={address.postalCode} onChange={(e) => handleChange(e, i, "postalCode")} />
                  <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleSaveEdit}>
                    Save
                  </button>
                </>
              ) : (
                <div>
                  <p>{`${address.street}, ${address.city}, ${address.state}, ${address.postalCode}`}</p>
                  <button type="button" className="btn btn-info btn-sm" onClick={() => handleEditClick(i)}>
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
          {showAddressInputs && (
            <div>
              <AquaInput label="Street" name="street" value={newAddress.street} onChange={(e) => handleNewAddressChange(e, "street")} />
              <AquaInput label="City" name="city" value={newAddress.city} onChange={(e) => handleNewAddressChange(e, "city")} />
              <AquaInput label="State" name="state" value={newAddress.state} onChange={(e) => handleNewAddressChange(e, "state")} />
              <AquaInput label="Postal Code" name="postalCode" value={newAddress.postalCode} onChange={(e) => handleNewAddressChange(e, "postalCode")} />
              <button type="button" className="btn btn-primary btn-sm" onClick={handleAddNewAddress}>
                Add Address
              </button>
            </div>
          )}
          {!showAddressInputs && (
            <button type="button" className="btn btn-dark" onClick={() => setShowAddressInputs(true)}>
              {formData.addresses.length > 0 ? "Add Another Address" : "Add Address"}
            </button>
          )}
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Update Details
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
