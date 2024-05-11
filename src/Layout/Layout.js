import AquaNavBar from "@/Layout/Header";
import AquaPageWrapper from "@/Layout/transition/pageWrapper";
import AquaFooter from "./Footer";
import AquaCartDrawer from "@/components/drawers/cartDrawer";
import AquaFavDrawer from "@/components/drawers/favDrawer";
import AquaUserDialog from "@/components/dialog/userDialog";
import AquaSeo from "./seo/seo";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import AquaUserPhoneDialogUpdate from "@/components/dialog/userPhoneDialog";

const AquaLayout = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const router = useRouter();

  // Introduce a new state to track if the dialog has been shown
  const [hasShownDialog, setHasShownDialog] = useState(false);

  // Check for stored state in localStorage
  useEffect(() => {
    const shownDialog = localStorage.getItem("hasShownDialog") === "true";
    setHasShownDialog(shownDialog);
  }, []);

  useEffect(() => {
    // Ensuring the dialog is shown only on the root path
    const isRootPath = router.pathname === "/";

    if (!user && isRootPath && !hasShownDialog) {
      setTimeout(() => {
        dispatch({
          type: "SET_AUTH_DIALOG_VISIBLE",
          payload: true,
        });
        setHasShownDialog(true); // Update state to reflect the dialog has been shown
        localStorage.setItem("hasShownDialog", "true"); // Store the state in localStorage
      }, 10000); // Adjust the timeout as needed
    } else if (user) {
      dispatch({
        type: "SET_AUTH_DIALOG_VISIBLE",
        payload: false,
      });
      if (user.user.phone === undefined || null) {
        dispatch({
          type: "SET_USER_PHONE_DIALOG_VISIBLE",
          payload: true,
        });
      }
    }
  }, [user, dispatch, router.pathname, hasShownDialog]);

  return (
    <>
      <AquaNavBar />
      <AquaCartDrawer />
      <AquaFavDrawer />
      <AquaUserDialog />
      <AquaUserPhoneDialogUpdate />
      <AquaPageWrapper>
        <AquaSeo seo={props.seo} />
        {props.container ? (
          <Container>{props.children}</Container>
        ) : (
          <>{props.children}</>
        )}
      </AquaPageWrapper>
      <AquaFooter />
    </>
  );
};

export default AquaLayout;
