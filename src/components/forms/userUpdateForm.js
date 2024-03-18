import AquaHeading from "@/reusables/heading";
import AquaInput from "@/reusables/input";
import { useState } from "react";

const UserForm = ({ data, onUpdate }) => {
  const [formData, setFormData] = useState(data);
  const [editIndex, setEditIndex] = useState(null); // To track which address is being edited

  const handleChange = (e, index, field) => {
    if (index !== undefined && field) {
      // Update nested address fields
      const updatedAddresses = [...formData.addresses];
      updatedAddresses[index] = {
        ...updatedAddresses[index],
        [field]: e.target.value,
      };
      setFormData({ ...formData, addresses: updatedAddresses });
    } else {
      // Update top-level fields like phoneNo and alternativeEmail
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index); // Set the index of the address being edited
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {JSON.stringify(data)}
        <div className="row">
          <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
            <AquaHeading level={4}>Contact Details</AquaHeading>
            <AquaInput
              label="Alternative Email"
              name="alternativeEmail"
              value={formData.alternativeEmail}
              onChange={handleChange}
            />
            <AquaInput
              label="Phone No"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
            <AquaHeading level={4}>Addresses</AquaHeading>
            {formData?.addresses?.map((address, i) => (
              <div key={i} className="mb-3">
                {editIndex === i ? (
                  <>
                    <AquaInput
                      label="Street"
                      name="street"
                      value={address.street}
                      onChange={(e) => handleChange(e, i, "street")}
                    />
                    <AquaInput
                      label="City"
                      name="city"
                      value={address.city}
                      onChange={(e) => handleChange(e, i, "city")}
                    />
                    <AquaInput
                      label="State"
                      name="state"
                      value={address.state}
                      onChange={(e) => handleChange(e, i, "state")}
                    />
                    <AquaInput
                      label="Postal Code"
                      name="postalCode"
                      value={address.postalCode}
                      onChange={(e) => handleChange(e, i, "postalCode")}
                    />
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditIndex(null)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  // If not being edited, display address and show an Edit button
                  <div>
                    <p>{`${address.street}, ${address.city}, ${address.state}, ${address.postalCode}`}</p>
                    <button
                      type="button"
                      className="btn btn-info btn-sm"
                      onClick={() => handleEditClick(i)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button type="submit" className="btn btn-primary">
            Update Details
          </button>
        </div>
      </form>
    </>
  );
};

export default UserForm;
