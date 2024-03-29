import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserLayout from "@/Layout/dashboardLayout/userLayout";
import UserOperations from "@/Services/user";
import UserForm from "@/components/forms/userUpdateForm";
import UserPasswordForm from "@/components/forms/userpasswordForm";

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
  const { userGetData } = UserOperations();
  const [formData, setFormData] = useState(initialState);
  const [detailsStatus, setDetailStatus] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [NewPasswordStatus, setNewPasswordStatus] = useState(false);

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
          console.log(res.data.data.addresses);
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

  return (
    <>
      <UserLayout>
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              <button
                className="btn btn-dark btn-block"
                onClick={() => setDetailStatus(!detailsStatus)}
              >
                Update Details
              </button>
            </div>
          </div>
          <div className="col">
            <div className="d-grid gap-2">
              <button
                className="btn btn-dark btn-block"
                onClick={() => setNewPasswordStatus(!NewPasswordStatus)}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>

        <hr />
        <div>
          {detailsStatus ? <UserForm data={formData} /> : null}
          {NewPasswordStatus ? <UserPasswordForm /> : null}
        </div>
      </UserLayout>
    </>
  );
};

export default UserDashBoard;
