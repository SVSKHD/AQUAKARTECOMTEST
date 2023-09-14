import AquaNavBar from "@/Layout/Header";
import AquaPageWrapper from "@/Layout/transition/pageWrapper";
import AquaFooter from "./Footer";
import AquaCartDrawer from "@/components/drawers/cartDrawer";
import AquaUserDialog from "@/components/dialog/userDialog";


const AquaLayout = (props) => {
    return (
        <>
            <AquaNavBar />
            <AquaCartDrawer />
            <AquaUserDialog />
            <AquaPageWrapper>
                {props.children}
            </AquaPageWrapper>
            <AquaFooter />
        </>
    )
}
export default AquaLayout
