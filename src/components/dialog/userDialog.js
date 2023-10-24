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
                title={<AquaHeading center={true} level={3}>{signupStatus ? "Signup" : "Singin"}</AquaHeading>}
                footerButtons={<AquaButton>{signupStatus ? "Signup" : "Signin"}</AquaButton>}
            >
                <div className="text-center">
                    <Image src={LOGO} alt="Aquakart" height="80" width="80" />
                </div>
                <div className="padd-inner-content">
                    {signupStatus ? <AquaSignup /> : <AquaSignin />}
                    <span className="text-center text-primary" onClick={() => {
                        dispatch({
                            type: "SET_AUTH_STATUS_VISIBLE",
                            payload: !signupStatus
                        })
                    }}>{signupStatus ? <AquaHeading level={6}>Already Have An Account..? Signin</AquaHeading> : <AquaHeading level={6}>Don't Have Account..? Signup</AquaHeading>}</span>
                </div>
            </AquaDialog>
        </>
    );
};
export default AquaUserDialog;
