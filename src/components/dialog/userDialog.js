import { useState } from "react";
import AquaDialog from "@/reusables/dialog";
import AquaHeading from "@/reusables/heading";
import { useSelector, useDispatch } from "react-redux";
import AquaSignup from "../Auth/Signup";
import AquaSignin from "../Auth/Signin";
import LOGO from "../../assests/logo.png";
import Image from "next/image";
import AquaButton from "@/reusables/button";
import { Spinner } from "react-bootstrap";
import UserOperations from "@/Services/user";
import AquaToast from "@/reusables/js/toast";

const AquaUserDialog = () => {
  const dispatch = useDispatch();
  const { UserLogin, UserSignup } = UserOperations();
  const { authDialog, signupStatus } = useSelector((state) => ({ ...state }));
  const [signupData, setSignupData] = useState({ email: "", password: "" });
  const [signinData, setSigninData] = useState({ email: "", password: "" });

  const handleSignupDataChange = (data) => {
    setSignupData(data);
  };

  const handleSigninDataChanged = (data) => {
    setSigninData(data);
  };

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    successMessage: "",
    errorMessage: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, loading: true }));

    const formData = signupStatus ? signupData : signinData;
    const operation = signupStatus ? UserSignup : UserLogin;

    operation(formData)
      .then((res) => {
        const message = signupStatus ? "succefully signed you up" : "succefully logged in";
        AquaToast(message, "success");
        setStatus((prevStatus) => ({
          ...prevStatus,
          loading: false,
          success: true,
          successMessage: signupStatus ? "Signup successful!" : "Signin successful!",
        }));
        dispatch({
          type: signupStatus ? "SET_AUTH_STATUS_VISIBLE" : "LOGGED_IN_USER",
          payload: signupStatus ? false : res.data,
        });
        console.log("user" , res.data)
        dispatch({
          type: "SET_AUTH_DIALOG_VISIBLE",
          payload: false,
        });
      })
      .catch((err) => {
        const errorMessage = err.message || (signupStatus ? "Signup failed!" : "Signin failed!");
        AquaToast(errorMessage, "error");
        setStatus((prevStatus) => ({
          ...prevStatus,
          loading: false,
          error: true,
          errorMessage: errorMessage,
        }));
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <>
      <AquaDialog
        className="aqua-auth-dialog"
        show={authDialog}
        handleClose={() => dispatch({ type: "SET_AUTH_DIALOG_VISIBLE", payload: false })}
        center={true}
        title={<AquaHeading center={true} level={3}>{signupStatus ? "Signup" : "Signin"}</AquaHeading>}
        footerButtons={
          <AquaButton onClick={handleSubmit}>
            {status.loading ? <Spinner animation="border" variant="light" /> : <>{signupStatus ? "Signup" : "Signin"}</>}
          </AquaButton>
        }
      >
        <div className="text-center" onKeyDownCapture={handleKeyDown}>
          <Image src={LOGO} alt="Aquakart" height="80" width="80" />
        </div>
        <div className="padd-inner-content" onKeyDown={handleKeyDown}>
          {signupStatus ? (
            <AquaSignup onDataChanged={handleSignupDataChange} />
          ) : (
            <AquaSignin onDataChanged={handleSigninDataChanged} />
          )}
          <span
            className="text-center text-primary"
            onClick={() => dispatch({ type: "SET_AUTH_STATUS_VISIBLE", payload: !signupStatus })}
          >
            {signupStatus ? "Already Have An Account..? Signin" : "Don't Have Account..? Signup"}
          </span>
        </div>
      </AquaDialog>
    </>
  );
};

export default AquaUserDialog;
