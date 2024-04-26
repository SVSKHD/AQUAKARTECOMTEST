import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserLayout from "@/Layout/dashboardLayout/userLayout";
import UserOperations from "@/Services/user";
import UserForm from "@/components/forms/userUpdateForm";
import UserPasswordForm from "@/components/forms/userpasswordForm";
import { FaTrash, FaPen } from "react-icons/fa";
import AquaHeading from "@/reusables/heading";
import AquaAddressDialog from "@/components/dialog/addressDialog";

const initialState = {
  phoneNo: "",
  addresses: [
    {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
  ],
  gstDetails: {
    gstEmail: "",
    gstNo: "",
    gstPhone: "",
    gstAddress: "",
  },
};

const UserDashBoard = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const { userGetData, userDataUpdate } = UserOperations();
  const [formData, setFormData] = useState(initialState);
  const [detailsStatus, setDetailStatus] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [NewPasswordStatus, setNewPasswordStatus] = useState(false);
  const [addressAdd, setAddressAdd] = useState(false);
  const [addressEdit , setAddressEdit] = useState(false)
  const [addressAddPass, setAddressAddPass] = useState({});
  const [AddressEditPass , setAddressEditPass] = useState({})

  const getDataAndManipulateStore = useCallback(async () => {
    if (user?.user?._id) {
      await userGetData(user.user._id)
        .then((res) => {
          console.log("user", res.data.data, user);
          // dispatch({ type: "LOGGED_IN_USER", payload: res?.data?.data });
          dispatch({ type: "UPDATE_USER_DETAILS", payload: res?.data?.data });
          setFormData((data) => ({
            ...data,
            addresses: res.data.data.addresses || [],
          }));
        })
        .catch((err) => {
          console.log("err", err);
          dispatch({ type: "LOGGED_IN_USER", payload: null });
        });
    }
  }, [userGetData, user, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isDataFetched && user?.user?._id) {
        await getDataAndManipulateStore();
        setIsDataFetched(true);
      }
    };

    fetchData();
  }, [getDataAndManipulateStore, isDataFetched, user?.user?._id]);

  const handleAddressAddDialog = () => {
    setAddressAdd(true);
  };

  const handleAddressEditDialog = (r) =>{
    setAddressEdit(true)
    setAddressEditPass(r)
  }

  const handleAddressSave = async (address) => {
    await userDataUpdate(user.user._id, { addresses: [address] })
      .then((res) => {
        console.log("address", res.data.data.addresses);
        const addressData = res.data.data.addresses;
        dispatch({
          type: "UPDATE_USER_ADDRESSES",
          payload: { addresses: addressData },
        });
        AquaToast("Addresses Added Successfully", "success");
        setAddressAdd(false);
      })
      .catch(() => {
        AquaToast("Sorry Please Try again", "error");
      });
  };
  const handleAddressEditSave = () =>{

  }
  return (
    <>
      <UserLayout>
        <div className="card-body mb-2">
          <AquaHeading level={3} decorate={true} content={"Address"} />
          {user.user.addresses?.length === 0 ? (
            <button className="btn btn-dark" onClick={handleAddressAddDialog}>
              Add Address
            </button>
          ) : (
            <div className="row">
              {user?.user?.addresses?.map((r, i) => (
                <div key={i} className="col">
                  <div>
                    <div class="card rounded-4 mb-3" style={{ width: "21rem" }}>
                      <div class="card-body">
                        <span>
                          {" "}
                          <input
                            type="radio"
                            value={i}
                            name="addressSelection" // All radio buttons share the same 'name' to group them
                            checked={
                              user?.user?.selectedAddress?._id === r?._id
                            }
                            onChange={() => handleAddressSelect(i)}
                          />{" "}
                          - Address-{i + 1}{" "}
                        </span>
                        <hr />
                        <h5 class="card-title">{r.city}</h5>
                        <h6 className="card-description">{r.state}</h6>
                        <p class="text-muted">
                          {r.street} {r.city}-{r.postalCode}
                        </p>
                        <div
                          class="btn-group mr-2"
                          role="group"
                          aria-label="Second group"
                        >
                          <button
                            type="button"
                            class="btn btn-base"
                            onClick={() => handleAddressEditDialog(r)}
                          >
                            <FaPen size={15} />
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger"
                            onClick={() => handleDeleteAddress(i)}
                          >
                            <FaTrash size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

       <button className="btn btn-primary" onClick={handleAddressAddDialog}>Add Address</button>
        <div>
          {detailsStatus ? <UserForm data={formData} /> : null}
          {NewPasswordStatus ? <UserPasswordForm /> : null}
        </div>
        <AquaAddressDialog
          show={addressAdd}
          hide={() => setAddressAdd(false)}
          address={addressAddPass}
          onSave={handleAddressSave}
        />
        <AquaAddressDialog
        show={addressEdit}
        hide={()=>setAddressEdit(false)}
        address={AddressEditPass}
        onSave={handleAddressEditSave}
        />
      </UserLayout>
    </>
  );
};

export default UserDashBoard;
