import AquaNavBar from "@/Layout/Header";

const AquaLayout = (props) =>{
    return(
        <>
        <AquaNavBar/>
            {props.children}
        </>
    )
}
export default  AquaLayout
