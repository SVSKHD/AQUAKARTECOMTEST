import { useEffect, useState } from "react";
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
import AquaInput from "@/reusables/input";

const AquaUserDialog = () => {
  const dispatch = useDispatch();
  const { UserLogin, UserSignup , ForgotPassword , VerifyData} = UserOperations();
  const { authDialog, signupStatus } = useSelector((state) => ({ ...state }));
  const [signupData, setSignupData] = useState({ email: "", password: "" });
  const [signinData, setSigninData] = useState({ email: "", password: "" });
  const [forgotPassword, setForgotPassword] = useState({
    email: false,
    otp:false,
    submit: false,
    disable:false
  });
  const [forgotpasswordData , setForgotPasswordData] = useState({email:"", otp :"" , password:"" , passwordConfirm:""})

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
        const message = signupStatus
          ? "succesfully signed you up"
          : "succesfully logged in";
        AquaToast(message, "success");
        setStatus((prevStatus) => ({
          ...prevStatus,
          loading: false,
          success: true,
          successMessage: signupStatus
            ? "Signup successful!"
            : "Signin successful!",
        }));
        dispatch({
          type: signupStatus ? "SET_AUTH_STATUS_VISIBLE" : "LOGGED_IN_USER",
          payload: signupStatus ? false : res.data,
        });
        dispatch({
          type: "SET_AUTH_STATUS_VISIBLE",
          payload: !signupStatus,
        });
      })
      .catch((err) => {
        const errorMessage =
          err.response.data.message ||
          (signupStatus ? "Signup failed!" : "Signin failed!");
        AquaToast(errorMessage, "error");
        setStatus((prevStatus) => ({
          ...prevStatus,
          loading: false,
          error: true,
          errorMessage: errorMessage,
        }));
      });
  };

  const handleForgotPasswordSubmit = () =>{
    console.log("load" , forgotpasswordData)
    if(forgotPassword.email===true && !forgotPassword.otp){
      ForgotPassword({email:forgotpasswordData.email}).then((res)=>{
        console.log("res", res.data.emailSent)
        if(res.data.emailSent===true){
          AquaToast("Otp has sent to email" , "success")
          setForgotPassword({...forgotPassword, disable:true , otp:true})
        }
      })
    }else if(forgotPassword.email && forgotPassword.otp===true){
   
      const sanitizedPayload = {
        email:forgotpasswordData.email,
        otp:forgotpasswordData.otp,
        newPassword:forgotpasswordData.password
      }
      VerifyData(sanitizedPayload).then((res)=>{
        AquaToast("Password has been changed successfully" , "success")
        setForgotPassword({
          email:false,
          otp:false,
          submit:false,
          disable:false
        })
        dispatch({
          type: "SET_AUTH_STATUS_VISIBLE",
          payload: !signupStatus,
        })
      })
    }
  }
  
  const handleForgotPasswordChange = (event) => {
    const { name, value } = event.target;
  
    // Update the forgotPasswordData state first
    setForgotPasswordData(prevData => {
      // Calculate the new data first
      const newData = { ...prevData, [name]: value };
  
      // Check if the passwords match
      const passwordsMatch = newData.password === newData.passwordConfirm;
  
      // Then update the forgotPassword state based on the new data
      setForgotPassword(prevState => ({
        ...prevState,
        disable: !passwordsMatch  
      }));
  
      // Return the new data to update forgotPasswordData
      return newData;
    });
  };
  
  
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <>
      <AquaDialog
        className="aqua-auth-dialog"
        show={authDialog}
        handleClose={() =>
          dispatch({ type: "SET_AUTH_DIALOG_VISIBLE", payload: false })
        }
        center={true}
        title={
          <AquaHeading center={true} level={3}>
            {signupStatus ? "Signup" : "Signin"}
          </AquaHeading>
        }
        footerButtons={
          <>
            {forgotPassword.email ? (
              <>
                <span
                  className="text-primary"
                  onClick={(forgotPassword) =>
                    setForgotPassword({ ...forgotPassword, email: false })
                  }
                >
                  Remember the password
                </span>
              </>
            ) : (
              <>
                <div className="signup-status text-center">
                  <span
                    className="text-primary clickable-text"
                    onClick={() =>
                      dispatch({
                        type: "SET_AUTH_STATUS_VISIBLE",
                        payload: !signupStatus,
                      })
                    }
                  >
                    {signupStatus
                      ? "Already have an account? Sign In"
                      : "Don't have an account? Sign Up"}
                  </span>
                </div>
              </>
            )}
          </>
        }
      >
        <div className="text-center" onKeyDownCapture={handleKeyDown}>
          <Image src={LOGO} alt="Aquakart" height="80" width="80" />
        </div>
        {forgotPassword.email ? (
          <>
            <div className="padd-inner-content">
              <AquaInput
                label="email"
                placeholder={"fill your email id"}
                size="lg"
                name="email"
                value={forgotpasswordData.email}
                handleChange={handleForgotPasswordChange}
              />
              {forgotPassword.otp && (
                <>
                <AquaInput
                size="lg"
                label="otp"
                name="otp"
                placeholder="enter otp"
                value={forgotpasswordData.otp}
                handleChange={handleForgotPasswordChange}
                />
                <AquaInput
                size="lg"
                label="Enter your desired password"
                name="password"
                placeholder="enter password"
                value={forgotpasswordData.password}
                handleChange={handleForgotPasswordChange}
                />
                <AquaInput
                size="lg"
                label="ReEnter the password"
                name="passwordConfirm"
                placeholder="Re enter the password"
                value={forgotpasswordData.passwordConfirm}
                handleChange={handleForgotPasswordChange}
                />
                </>
              ) }
              <div class="d-grid gap-2">
              <button
                onClick={handleForgotPasswordSubmit}
                class="btn btn-lg btn-primary"
                type="button"
                disabled={forgotPassword.disable}
              >
                Submit you Email
              </button>
            </div>
            </div>
          </>
        ) : (
          <div className="padd-inner-content" onKeyDown={handleKeyDown}>
            {signupStatus ? (
              <AquaSignup onDataChanged={handleSignupDataChange} />
            ) : (
              <AquaSignin onDataChanged={handleSigninDataChanged} />
            )}

            <div className="row">
              <div className="col"></div>
              <div className="col">
                <span
                  className="ms-4 text-primary"
                  onClick={(forgotPassword) =>
                    setForgotPassword({ ...forgotPassword, email: true })
                  }
                >
                  Forgot Password
                </span>
              </div>
            </div>
            <hr />
            <div class="d-grid gap-2">
              <button
                onClick={handleSubmit}
                class="btn btn-lg btn-primary"
                type="button"
              >
                {status.loading ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  <>{signupStatus ? "Signup" : "Signin"}</>
                )}
              </button>
            </div>
            <br />
          </div>
        )}
      </AquaDialog>
    </>
  );
};

export default AquaUserDialog;
