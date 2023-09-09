import {Container, Button} from "react-bootstrap"
import {useState} from "react"
import AquaInput from "@/reusables/input";
import AquaPlaceHolderInput from "@/reusables/placeHolderInput";
import AquaHeading from "@/reusables/heading";
import AquaLargeTitle from "@/reusables/largeTitle";
import AquaTextAreaInput from "@/reusables/textarea";
import AquaDrawer from "@/reusables/drawer";
import AquaButton from "@/reusables/button";
const UIPage = () =>{
const drawerPositions = ['start', 'end', 'top', 'bottom']
    const [drawer , setDrawer] = useState(false)
    const [drawerPositon , setDrawerPositon] = useState("")

    const DrawerLoop = ({name}) =>{
    return(
        <>

        </>
    )
    }

    const handleDrawerOpen = (position) =>{
        setDrawer(true)
        setDrawerPositon(position)
    }
    const handleDrawerClose = (position) =>{
        setDrawer(false)
    }
    return(
        <>
        <Container>
            <div className="mb-3"/>
            <AquaHeading level={1}>Hello UI</AquaHeading>
            <hr/>
            <AquaHeading level={1}>Inputs</AquaHeading>
            <hr/>
            <AquaInput label={"label-input"} placeholder={"label-placeholder"}/>
            <AquaPlaceHolderInput placeholder={"placeholder input"}/>
            <AquaTextAreaInput placeholder={"place holder text area"} label={"label for text area"}/>
            <hr/>
            <AquaHeading level={1}>Headings</AquaHeading>
            <hr/>
            <AquaHeading level={1}>Hello there titles can be pass as levels here.</AquaHeading>
            <AquaHeading level={2}>Hello there titles can be pass as levels here.</AquaHeading>
            <AquaHeading level={3}>Hello there titles can be pass as levels here.</AquaHeading>
            <AquaHeading level={4}>Hello there titles can be pass as levels here.</AquaHeading>
            <AquaHeading level={5}>Hello there titles can be pass as levels here.</AquaHeading>
            <AquaHeading level={6}>Hello there titles can be pass as levels here.</AquaHeading>
            <hr/>
            <AquaHeading level={1}>Large title</AquaHeading>
            <hr/>
            <AquaLargeTitle display={1}>Hello large title 1</AquaLargeTitle>
            <AquaLargeTitle display={2}>Hello large title 2</AquaLargeTitle>
            <AquaLargeTitle display={3}>Hello large title 3</AquaLargeTitle>
            <hr/>
            <AquaHeading level={1}>Drawer</AquaHeading>
            <hr/>
            {drawerPositions.map((r,i)=>(
                <AquaButton key={i} variant="primary" onClick={()=>handleDrawerOpen(r)}>{r}</AquaButton>
            ))}
            <AquaDrawer show={drawer} handleClose={handleDrawerClose} title={drawerPositon} position={drawerPositon}/>
            <hr/>
            <AquaHeading level={1}>Dialog</AquaHeading>
            <hr/>
        </Container>
        </>
    )
}
export default  UIPage
