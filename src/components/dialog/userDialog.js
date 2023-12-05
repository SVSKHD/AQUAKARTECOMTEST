import AquaDialog from "@/reusables/dialog";
import AquaHeading from "@/reusables/heading";
import { useSelector, useDispatch } from "react-redux";
import AquaSignup from "../Auth/Signup";
import AquaSignin from "../Auth/Signin";
import LOGO from "../../assests/logo.png";
import Image from "next/image";
import AquaButton from "@/reusables/button";

const AquaUserDialog = () => {
  const dispatch = useDispatch();
  const { authDialog, signupStatus } = useSelector((state) => ({ ...state }));
  const handleSubmit = () => {
    if (signupStatus === true) {
      console.log("signup-status", signupStatus);
    } else if (signupStatus === false) {
      console.log("signup status", signupStatus);
    }
  };
  return (
    <>
      <AquaDialog
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
            {signupStatus ? "Signup" : "Singin"}
          </AquaHeading>
        }
        footerButtons={
          <AquaButton onClick={handleSubmit}>
            {signupStatus ? "Signup" : "Signin"}
          </AquaButton>
        }
      >
        <div className="text-center">
          <Image src={LOGO} alt="Aquakart" height="80" width="80" />
        </div>
        <div className="padd-inner-content">
          {signupStatus ? <AquaSignup /> : <AquaSignin />}
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
