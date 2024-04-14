import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import AquaLayout from "@/Layout/Layout";
import AquaOrderOperations from "@/Services/order";
import AquaToast from "@/reusables/js/toast";
import AquaHeading from "@/reusables/heading";
import AquaCurrencyFormat from "@/reusables/currencyFormatter";
import Link from "next/link";

const AquaOrdersComponent = () => {
  const { cartCount } = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const [orderUpdated, setOrderUpdated] = useState(false);
  const [toastShown, setToastShown] = useState(false); // State to track if the toast has been shown
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { UpdateOrder, getOrderByTrasactionId } = AquaOrderOperations();

  const updateOrder = useCallback(async () => {
    if (toastShown) return; // Exit if the toast has already been shown

    try {
      const res = await UpdateOrder(id, { products: cartCount });
      if (res.data.paymentStatus === "Paid") {
        AquaToast("Order Created", "success");
        setOrderUpdated(true); // Trigger the next useEffect to fetch order details
      } else if (res.data.paymentStatus === "Pending") {
        setOrderUpdated(false); // Ensure no further actions if pending
        AquaToast("Payment is pending", "info"); // Provide a more specific message
      } else {
        AquaToast("Awaiting confirmation", "error");
      }
    } catch (error) {
      AquaToast("Failed to update order, please try again", "error");
    } finally {
      setToastShown(true); // Update state to indicate toast has been shown
      setLoading(false); // Set loading to false in all cases
    }
  }, [UpdateOrder, id, cartCount, toastShown]);

  useEffect(() => {
    updateOrder();
  }, [updateOrder]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderUpdated) return; // Exit if order is not updated

      try {
        const productRes = await getOrderByTrasactionId(id);
        setProduct(productRes.data);
        dispatch({ type: "EMPTY_CART" }); // Empty cart only if order is updated
      } catch (err) {
        AquaToast("Failed to load order details, please try again", "error");
      }
    };

    fetchOrderDetails();
  }, [orderUpdated, getOrderByTrasactionId, id, dispatch]);

  const seo = {
    title: "Aquakart | Order Confirmation",
  };

  return (
    <AquaLayout seo={seo} container={true}>
      <div className="card rounded-4 mb-3">
        <div className="card-body">
          {loading ? (
            <div className="spinner-border text-dark" role="status" />
          ) : (
            <>
              <AquaHeading
                decorate={true}
                customclass={"text-success"}
                content={`Order Details-${product.order?.paymentStatus === "Paid" ? "Order Placed" : "Awaiting Confirmation"}`}
                level={3}
              />
              {orderUpdated ? (
                <div className="card border-success mb-3" style={{ maxWidth: "18rem;" }}>
                  <div className="card-body">
                    <h5 className="card-title text-success">
                      {product.order?.paymentStatus} - <AquaCurrencyFormat amount={product.order?.totalAmount} />
                    </h5>
                    <h6>Order-Status:-{product.order?.orderStatus}</h6>
                    <AquaHeading level={5} decorate={true} content={"Ordered Items"} />
                    {product.order?.items.map((item, index) => (
                      <p key={index}>{item.name}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <h1>COD</h1>
              )}
            </>
          )}
          <Link href="/dashboard/orders" className="btn btn-dark rounded-pill">Dashboard</Link>
          <button className="ms-2 btn btn-outline-dark rounded-pill">Download Invoice</button>
        </div>
      </div>
    </AquaLayout>
  );
};

export default AquaOrdersComponent;

