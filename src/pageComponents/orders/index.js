import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import AquaLayout from "@/Layout/Layout";
import AquaOrderOperations from "@/Services/order";
import AquaToast from "@/reusables/js/toast";
import AquaHeading from "@/reusables/heading";
import { FaCheck } from "react-icons/fa";

const AquaOrdersComponent = () => {
  const { user, cartCount } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(true);
  const [toastShown, setToastShown] = useState(false); // State to track if toast has been shown
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  const { id } = router.query;
  const { UpdateOrder, getOrderByTrasactionId } = AquaOrderOperations();

  const updateOrder = useCallback(() => {
    if (!toastShown) {
      // Only proceed if toast has not been shown yet
      UpdateOrder(id, { products: cartCount })
        .then((res) => {
          if (res.data.paymentStatus === "Paid") {
            AquaToast("Order Created", "success");
            setToastShown(true); // Update state to indicate toast has been shown
            setLoading(false);
            dispatch({
              type: "EMPTY_CART",
            });
            getOrderByTrasactionId(id)
              .then((res) => {
                setProduct(res.data);
              })
              .catch(() => {
                AquaToast("please try again", "error");
              });
          }
        })
        .catch(() => {
          if (!toastShown) {
            // Check again in case of error
            AquaToast("please try again", "error");
            setToastShown(true); // Update state to indicate toast has been shown
          }
          setLoading(false);
        });
    }
  }, [
    UpdateOrder,
    id,
    cartCount,
    dispatch,
    toastShown,
    getOrderByTrasactionId,
  ]);

  useEffect(() => {
    updateOrder();
  }, [updateOrder]);

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
                content={"Order Details"}
                level={3}
              />
              <div class="card border-success mb-3" style={{maxWidth: "18rem;"}}>
                <div class="card-body">
                  <h5 class="card-title text-success">{product.order.paymentStatus}</h5>
                  <AquaHeading level={5} decorate={true} content={"Ordered Items"}/>
                  {product.order.items.map((r,i)=>(
                    <p key={i}>{r.title}</p>
                  ))}
                  <p class="card-text">
                    
                  </p>
                </div>
                </div>
              {JSON.stringify(product)}
            </>
          )}
          <button className="btn btn-dark">
            Dashboard 
          </button>
          <button className="btn btn-outline-dark">
            Download Invoice
          </button>
        </div>
      </div>
    </AquaLayout>
  );
};

export default AquaOrdersComponent;
