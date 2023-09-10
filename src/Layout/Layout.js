import AquaNavBar from "@/Layout/Header";
import AquaPageWrapper from "@/Layout/transition/pageWrapper";

const AquaLayout = (props) =>{
    return(
        <>
        <AquaNavBar/>
            <AquaPageWrapper>
                {props.children}
            </AquaPageWrapper>
        </>
    )
}
export default  AquaLayout
