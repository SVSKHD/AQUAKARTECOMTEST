import {useDispatch} from "react-redux"

const dispatch = useDispatch()

const UserLogout = () =>{
dispatch({
    type:"LOGOUT",
    payload:null
})
}

const UserAuthAppOperations = () =>{
    return{
        UserLogout
    }
}
export default UserAuthAppOperations 