import UserLayout from "@/Layout/dashboardLayout/userLayout";
import UserForm from "@/components/forms/userUpdateForm";
import { useState } from "react";

const userDashBoard = () => {
  const [detailsStatus , setDetailStatus] = useState(false)
  return (
    <>
      <UserLayout>
        <button className="btn btn-dark" onClick={()=>setDetailStatus(!detailsStatus)}>Update Details</button>
        <button className="btn btn-dark" onClick={()=>setDetailStatus(!detailsStatus)}>Update Password</button>
        {detailsStatus ? (
          <UserForm/>        ) : ""}
      </UserLayout>
    </>
  );
};
export default userDashBoard;
