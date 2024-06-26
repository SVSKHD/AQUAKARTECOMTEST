import UserLayout from "@/Layout/dashboardLayout/userLayout";
import AquaOrderOperatrions from "@/Services/order";
import OrderDashboardCard from "@/components/cards/orderDashboardCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AquaHeading from "@/reusables/heading";

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const { getOrderByUserId, getAllOrdersByUserId } = AquaOrderOperatrions();
  const { user } = useSelector((state) => ({ ...state }));
  const userId = user?.user?._id;
  useEffect(() => {
    getAllOrdersByUserId(userId)
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [userId, getAllOrdersByUserId]);
  return (
    <>
      <UserLayout>
        <AquaHeading content={"Your Orders"} level={3} />
        <div className="row">
          {orders?.map((r, i) => (
            <div key={i} className="col-md-12">
              <OrderDashboardCard order={r} />
            </div>
          ))}
        </div>
      </UserLayout>
    </>
  );
};
export default UserOrder;
