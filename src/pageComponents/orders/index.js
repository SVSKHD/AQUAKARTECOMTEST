import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import AquaLayout from "@/Layout/Layout";
import AquaToast from "@/reusables/js/toast";
import AquaCurrencyFormat from "@/reusables/currencyFormatter";
import moment from "moment";
import Link from "next/link";

const AquaOrdersComponent = ({ initialOrder }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialOrder) {
      dispatch({ type: "EMPTY_CART" });
    }
  }, [initialOrder, dispatch]);

  const handleCLickInvoice = (order) => {
    // Logic to handle invoice download
  };

  const seoData = {
    title: "Aquakart | Order Confirmations",
  };

  return (
    <AquaLayout container={true} seo={seoData}>
      {initialOrder?.paymentStatus === "Paid" ? (
        <div className="card mb-2">
          <div className="card-header bg-success text-white p-3">
            <h4>Successfully Order Placed - {initialOrder?.orderId}</h4>
          </div>
          <div className="card-body">
            <h4>
              Estimated Delivery Date:{" "}
              {initialOrder?.estimatedDelivery
                ? moment(initialOrder?.estimatedDelivery).format("YYYY-MM-DD")
                : "N/A"}
              {initialOrder?.estimatedDelivery &&
              moment(initialOrder.estimatedDelivery).isAfter(moment())
                ? " (In the future)"
                : " (Not in the future)"}
            </h4>
            <h5>Ordered Items</h5>
            {initialOrder?.items?.map((r, i) => (
              <div key={i}>{r.name}</div>
            ))}
            <div className="row">
              <div className="col">
                <h6>
                  Ordered Amount:{" "}
                  <span className="text-success">
                    <AquaCurrencyFormat amount={initialOrder?.totalAmount} />
                  </span>
                </h6>
              </div>
            </div>
            <div className="justify-content-center mt-4">
              <Link href="/dashboard/orders" className="btn btn-dark rounded-pill">
                Dashboard
              </Link>
              <button
                className="ms-2 btn btn-outline-dark rounded-pill"
                onClick={() => handleCLickInvoice(initialOrder)}
              >
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card mb-3">
          <div className="card-header bg-danger display-2 text-white">
            Payment Failed - {initialOrder?.orderId}
          </div>
          <div className="card-body">
            <button className="btn btn-dark rounded-pill">Proceed to Pay</button>
            <button className="btn btn-dark ms-2 rounded-pill">Cash On Delivery</button>
          </div>
        </div>
      )}
    </AquaLayout>
  );
};

export default AquaOrdersComponent;
