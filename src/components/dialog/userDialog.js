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
                title={<AquaHeading level={3}>{signupStatus ? "Signin" : "Singup"}</AquaHeading>}
                Buttons={<AquaButton>{signupStatus ? "Signin" : "Signup"}</AquaButton>}
            >
                <div className="text-center">
                    <Image src={LOGO} alt="Aquakart" height="80" width="80" />
                </div>
                {signupStatus ? <AquaSignup /> : <AquaSignin />}
            </AquaDialog>
        </>
    );
};
export default AquaUserDialog;
