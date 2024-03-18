import UserLayout from "@/Layout/dashboardLayout/userLayout";
import UserOperations from "@/Services/user";
import UserForm from "@/components/forms/userUpdateForm";
import UserPasswordForm from "@/components/forms/userpasswordForm";
import { useState, useEffect , useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";

const UserDashBoard = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch()
  const { userGetData } = UserOperations()


  const getDataAndManipulateStore = useCallback(() => {
    if (user?.user?._id) {
      userGetData(user.user._id)
        .then((res) => {
          console.log("data", res.data);
          dispatch({ type: "LOGGED_IN_USER", payload: res.data });
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [user?.user?._id, userGetData, dispatch]);

  useEffect(() => {
    getDataAndManipulateStore();
  }, [getDataAndManipulateStore]);


  const initialState = {
    phoneNo: "",
    addresses: [
      {
        street: "",
        city: "",
        state: "",
        postalCode: "",
      }
    ],
    gstDetails: {
      gstEmail: "",
      gstNo: "",
      gstPhone: "",
      gstAddress: "",
    }
  };

  const [formData, setFormData] = useState(initialState);
  const [detailsStatus, setDetailStatus] = useState(false);
  const [NewPasswordStatus, setNewPasswordStatus] = useState(false);
  return (
    <>
      <UserLayout>
        <div className="row">
          <div className="col">
            <div class="d-grid gap-2">
              <button
                className="btn btn-dark btn-block"
                onClick={() => setDetailStatus(!detailsStatus)}
              >
                Update Details
              </button>
            </div>
          </div>
          <div className="col">
            <div class="d-grid gap-2">
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
          {detailsStatus ? <UserForm data={formData} /> : ""}
          {NewPasswordStatus ? <UserPasswordForm /> : ""}
        </div>
      </UserLayout>
    </>
  );
};
export default UserDashBoard;
