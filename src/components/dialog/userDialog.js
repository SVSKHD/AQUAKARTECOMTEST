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
    if (signupStatus === true) {
      UserSignup(signupData)
        .then((res) => {
          AquaToast("succefully signed you up", "success");
          setStatus((prevStatus) => ({
            ...prevStatus,
            loading: false,
            success: true,
            successMessage: "Signup successful!",
          }));
          dispatch({
            type: "SET_AUTH_STATUS_VISIBLE",
            payload: false,
          });
        })
        .catch((err) => {
          AquaToast(err.message, "error");
          setStatus((prevStatus) => ({
            ...prevStatus,
            loading: false,
            error: true,
            errorMessage: "Signup failed!",
          }));
        });
    } else {
      UserLogin(signinData)
        .then((res) => {
          AquaToast("succefully logged in", "success");
          setStatus((prevStatus) => ({
            ...prevStatus,
            loading: false,
            success: true,
            successMessage: "Signin successful!",
          }));
          console.log(res.data);
          dispatch({
            type: "LOGGED_IN_USER",
            payload: res.data,
          });
          dispatch({
            type: "SET_AUTH_DIALOG_VISIBLE",
            payload: false,
          });
        })
        .catch(() => {
          AquaToast("Please try again", "error");
          setStatus((prevStatus) => ({
            ...prevStatus,
            loading: false,
            error: true,
            errorMessage: "Signin failed!",
          }));
        });
    }
  };
  return (
    <>
      <AquaDialog
        className="aqua-auth-dialog"
        show={authDialog}
        handleClose={() =>
          dispatch({
            type: "SET_AUTH_DIALOG_VISIBLE",
            payload: false,
          })
        }
        center={true}
        title={
          <AquaHeading center={true} level={3}>
            {signupStatus ? "Signup" : "Signin"}
          </AquaHeading>
        }
        footerButtons={
          <AquaButton onClick={handleSubmit}>
            {status.loading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              <>{signupStatus ? "Signup" : "Signin"}</>
            )}
          </AquaButton>
        }
      >
        <div className="text-center">
          <Image src={LOGO} alt="Aquakart" height="80" width="80" />
        </div>
        <div className="padd-inner-content">
          {signupStatus ? (
            <AquaSignup onDataChanged={handleSignupDataChange} />
          ) : (
            <AquaSignin onDataChanged={handleSigninDataChanged} />
          )}
          <span
            className="text-center text-primary"
            onClick={() => {
              dispatch({
                type: "SET_AUTH_STATUS_VISIBLE",
                payload: !signupStatus,
              });
              // eslint-disable-next-line react/no-unescaped-entities
            }}
          >
            {signupStatus ? (
              <AquaHeading level={6}>
                Already Have An Account..? Signin
              </AquaHeading>
            ) : (
              <AquaHeading level={6}>Don't Have Account..? Signup</AquaHeading>
            )}
          </span>
        </div>
      </AquaDialog>
    </>
  );
};
export default AquaUserDialog;
