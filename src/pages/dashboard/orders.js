import UserLayout from "@/Layout/dashboardLayout/userLayout";
import AquaOrderOperatrions from "@/Services/order";
import OrderDashboardCard from "@/components/cards/orderDashboardCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const UserOrder = () => {
  const [orders , setOrders] = useState({})
  const {getOrderById} = AquaOrderOperatrions()
  const {user} = useSelector((state)=>({...state}))
  const userId = user.user._id
  useEffect(()=>{
     getOrderById(userId).then((res)=>{
       setOrders(res.data.data)
     })
     .catch((err)=>{
      console.log("err", err)
     })
  },[userId , getOrderById])
  return (
    <>
      <UserLayout>
        <h1>orders</h1>
        <div className="row">
        {orders.map((r,i)=>(
          <div key={i} className="col">
           <OrderDashboardCard data={r}/>
          </div>
        ))}
        </div>
      </UserLayout>
    </>
  );
};
export default UserOrder;
