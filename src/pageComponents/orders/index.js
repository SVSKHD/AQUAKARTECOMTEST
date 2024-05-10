import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import AquaLayout from "@/Layout/Layout";
import AquaOrderOperations from "@/Services/order";
import AquaToast from "@/reusables/js/toast";
import AquaCurrencyFormat from "@/reusables/currencyFormatter";
import moment from "moment";

const AquaOrdersComponent = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { getOrderByTrasactionId } = AquaOrderOperations();

  const seoData = {
    title: "Aquakart | Order Confirmations",
  };

  useEffect(() => {
    getOrderByTrasactionId(id)
      .then((res) => {
        setProducts(res.data);
        dispatch({ type: "EMPTY_CART" });
      })
      .catch((err) => {
        console.log("res", err);
      });
  }, [id, getOrderByTrasactionId, dispatch]);

  const renderOrderCard = (order) => {
    const cardClass =
      order.paymentStatus === "Paid" ? "bg-success" : "bg-warning";
    return (
      <div className={`card text-white ${cardClass} mb-3`} key={order._id}>
        <div className="card-header">Order ID: {order.orderId}</div>
        <div className="card-body">
          <h5 className="card-title">Transaction ID: {order.transactionId}</h5>
          <p className="card-text">Payment Status: {order.paymentStatus}</p>
          <p className="card-text">
            Total Amount: <AquaCurrencyFormat amount={order.totalAmount} />
          </p>
          {/* Additional order details can be added here */}
        </div>
      </div>
    );
  };

  return (
    <AquaLayout container={true} seo={seoData}>
      {products.data ? (
        <>
          <div className="card mb-2">
            <div className="card-header bg-success text-white p-3">
              <h4>Successfully Order Placed - {products?.data[0]?.orderId}</h4>
            </div>
            <div className="card-body">
              <h4>
                Estimated Delivery Date:{" "}
                {products?.data[0]?.estimatedDelivery
                  ? moment(products.data[0].estimatedDelivery).format(
                      "YYYY-MM-DD",
                    )
                  : "N/A"}
                {/* Check if the date is in the future */}
                {products?.data[0]?.estimatedDelivery &&
                moment(products.data[0].estimatedDelivery).isAfter(moment())
                  ? " (In the future)"
                  : " (Not in the future)"}
              </h4>
              <h5>Ordered Items</h5>
              {products?.data[0]?.items?.map((r, i) => (
                <div key={i}>{r.name}</div>
              ))}
              <div className="row">
                <div className="col">
                  <h6>
                    Ordered Amount :{" "}
                    <span className="text-success">
                      <AquaCurrencyFormat
                        amount={products?.data[0]?.totalAmount}
                      />
                    </span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Processing Your Order</h1>
        </>
      )}
    </AquaLayout>
  );
};

export default AquaOrdersComponent;
