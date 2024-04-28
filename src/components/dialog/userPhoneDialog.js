import AquaDialog from "@/reusables/dialog";
import AquaHeading from "@/reusables/heading";
import { useSelector, useDispatch } from "react-redux";
import AquaInput from "@/reusables/input";
import { useState } from "react";
import UserOperations from "@/Services/user";
import AquaToast from "@/reusables/js/toast";

const AquaUserPhoneDialogUpdate = () => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { userDataUpdate } = UserOperations();
  const { userPhone, user } = useSelector((state) => ({ ...state }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    userDataUpdate(user?.user?._id, { phone: phone })
      .then((res) => {
        console.log("user", res.data.data.phone);
        const phone = res.data.data.phone;
        if (res) {
          AquaToast("Successfully Updated data", "success");
          dispatch({
            type: "UPDATE_USER_PHONE",
            payload: { phone: phone },
          });
            dispatch({ type: "SET_USER_PHONE_DIALOG_VISIBLE", payload: false });
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
    console.log("phone", phone);
  };
  return (
    <>
      <AquaDialog
        show={userPhone}
        handleClose={() =>
          dispatch({ type: "SET_USER_PHONE_DIALOG_VISIBLE", payload: false })
        }
        title={<AquaHeading content="Fill your point of contact" />}
      >
        <AquaInput
          type="phone"
          label="Enter Your Phone No"
          value={phone}
          handleChange={(e) => setPhone(e.target.value)}
          name="phone"
          required={true}
          requiredMessage={"Phone No must be 10 digits"}
        />
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSubmit}
          >
            {loading ? (
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </AquaDialog>
    </>
  );
};
export default AquaUserPhoneDialogUpdate;
