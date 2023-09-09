import {Button} from "react-bootstrap";

const AquaButton = (props) =>{
    return(
       <Button className="custom-button m-1" {...props}>{props.children}</Button>
    )
}
export default  AquaButton
