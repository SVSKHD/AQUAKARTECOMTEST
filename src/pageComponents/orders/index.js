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
    if (!toastShown) { // Only proceed if the toast has not been shown yet
      try {
        const res = await UpdateOrder(id, { products: cartCount });
        if (res.data.paymentStatus === "Paid") {
          AquaToast("Order Created", "success");
          setOrderUpdated(true); // Set to true to trigger the next useEffect to fetch order details
          setToastShown(true); // Update state to indicate toast has been shown
        } else {
          AquaToast("Awaiting confirmation", "error");
          setToastShown(true); // Update state to indicate toast has been shown
        }
      } catch (error) {
        if (!toastShown) { // Check again in case of error
          AquaToast("Failed to update order, please try again", "error");
          setToastShown(true); // Update state to indicate toast has been shown
        }
      } finally {
        setLoading(false);
      }
    }
  }, [UpdateOrder, id, cartCount, toastShown]);

  useEffect(() => {
    updateOrder();
  }, [updateOrder]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const productRes = await getOrderByTrasactionId(id);
        setProduct(productRes.data);
      } catch (err) {
        if (!toastShown) { // Check again in case of fetching error
          AquaToast("Failed to load order details, please try again", "error");
          setToastShown(true); // Update state to indicate toast has been shown
        }
      }
    };

    if (orderUpdated) {
      fetchOrderDetails();
      dispatch({type:"EMPTY_CART"})
    }
  }, [orderUpdated, getOrderByTrasactionId, id, toastShown , dispatch]);
  const seo = {
    title: "Aquakart | Order Confirmation",
  };

  return (
    <AquaLayout seo={seo} container={true}>
      <div className="card rounded-4 mb-3">
        <div className="card-body">
          {loading ? (
            <>
              <div class="spinner-border text-dark" role="status" />
            </>
          ) : (
            <>
           
              <AquaHeading
                decorate={true}
                customclass={"text-success"}
                content={`Order Details-${product.order?.paymentStatus==="Paid"?"Order Placed":"Awaiting Confirmation"}`}
                level={3}
              /> 
              <div class="card border-success mb-3" style={{maxWidth: "18rem;"}}>
                <div class="card-body">
                 
                  <h5 class="card-title text-success">{product.order?.paymentStatus} - <AquaCurrencyFormat amount={product.order?.totalAmount} /></h5>
                  <h6>Order-Status:-{product.order?.orderStatus}</h6>
                  <AquaHeading level={5} decorate={true} content={"Ordered Items"}/>
                  {product.order?.items.map((r,i)=>(
                    <p key={i}>{r.name}</p>
                  ))}
                  <p class="card-text">
                    
                  </p>
                </div>
                </div>
            </>
          )}
          <Link href="/dashboard/orders" className="btn btn-dark rounded-pill">
            Dashboard 
          </Link>
          <button className="ms-2 btn btn-outline-dark rounded-pill">
            Download Invoice
          </button>
        </div>
      </div>
    </AquaLayout>
  );
};

export default AquaOrdersComponent;
