import UserLayout from "@/Layout/dashboardLayout/userLayout";
import UserForm from "@/components/forms/userUpdateForm";
import UserPasswordForm from "@/components/forms/userpasswordForm";
import { useState } from "react";

const userDashBoard = () => {
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
        
        <hr/>
        <div>
        {detailsStatus ? <UserForm /> : ""}
        {NewPasswordStatus ? <UserPasswordForm /> : ""}
        </div>
      </UserLayout>
    </>
  );
};
export default userDashBoard;
