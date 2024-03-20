import axios from "axios";



const CreateOrder = (data) => axios.post(`api/order/create`,data)
const getOrderById = (id) => axios.get(`api/order/${id}`)
const getOrderByUserId = (id) => axios.get(`api/order/${id}`)

const AquaOrderOperatrions = () =>{
    return{
CreateOrder,
getOrderById,
getOrderByUserId
    }
}

export default AquaOrderOperatrions