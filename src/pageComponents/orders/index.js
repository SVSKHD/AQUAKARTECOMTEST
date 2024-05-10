import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import AquaLayout from "@/Layout/Layout";
import AquaOrderOperations from "@/Services/order";
import AquaToast from "@/reusables/js/toast";
import AquaCurrencyFormat from "@/reusables/currencyFormatter";

const AquaOrdersComponent = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const {getOrderByTrasactionId} = AquaOrderOperations();

  const seoData = {
    title:"Aquakart | Order Confirmations"
  }

  useEffect(()=>{
    getOrderByTrasactionId(id).then((res)=>{
      console.log("res", res.data)
      setProducts(res.data)
    })
    .catch((err)=>{
      console.log("res", err)
    })
  },[id,getOrderByTrasactionId])

  const renderOrderCard = (order) => {
    const cardClass = order.paymentStatus === 'Paid' ? 'bg-success' : 'bg-warning';
    return (
      <div className={`card text-white ${cardClass} mb-3`} key={order._id}>
        <div className="card-header">Order ID: {order.orderId}</div>
        <div className="card-body">
          <h5 className="card-title">Transaction ID: {order.transactionId}</h5>
          <p className="card-text">Payment Status: {order.paymentStatus}</p>
          <p className="card-text">Total Amount: <AquaCurrencyFormat amount={order.totalAmount} /></p>
          {/* Additional order details can be added here */}
        </div>
      </div>
    );
  };

  // if (loading) return <div>Loading...</div>;

  return (
    <AquaLayout container={true} seo={seoData}>
      {JSON.stringify(products)}
      <h1>Order Confirmation</h1>
      {products.data.length > 0 ? (
        products.data.map(order => renderOrderCard(order))
      ) : (
        <p>No orders found.</p>
      )}
    </AquaLayout>
  );
};

export default AquaOrdersComponent;
