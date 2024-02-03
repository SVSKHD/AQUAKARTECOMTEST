import AquaNavBar from "@/Layout/Header";
import AquaPageWrapper from "@/Layout/transition/pageWrapper";
import AquaFooter from "./Footer";
import AquaCartDrawer from "@/components/drawers/cartDrawer";
import AquaUserDialog from "@/components/dialog/userDialog";
import AquaSeo from "./seo/seo";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const AquaLayout = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (!user) {
      setTimeout(
        () =>
          dispatch({
            type: "SET_AUTH_DIALOG_VISIBLE",
            payload: true,
          }),
        3000,
      );
    }
  }, [user, dispatch]);
  return (
    <>
      <AquaNavBar />
      <AquaCartDrawer />
      <AquaUserDialog />
      <AquaPageWrapper>
        <AquaSeo seo={props.seo} />
        {props.children}
      </AquaPageWrapper>
      <AquaFooter />
    </>
  );
};
export default AquaLayout;
