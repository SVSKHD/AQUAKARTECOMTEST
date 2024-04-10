import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import AquaLayout from "@/Layout/Layout";
import AquaOrderOperations from "@/Services/order";
import AquaToast from "@/reusables/js/toast";
import AquaHeading from "@/reusables/heading";
import { FaCheck } from "react-icons/fa";
import AquaCurrencyFormat from "@/reusables/currencyFormatter";

const AquaOrdersComponent = () => {
  const { user, cartCount } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  const { id } = router.query;
  const { UpdateOrder, getOrderByTrasactionId } = AquaOrderOperations();

  const updateOrder = useCallback(async () => {
    try {
      const updateRes = await UpdateOrder(id, { products: cartCount });
      if (updateRes.data.paymentStatus === "Paid") {
        AquaToast("Order Created", "success");

        try {
          const productRes = await getOrderByTrasactionId(id);
          setProduct(productRes.data);
        } catch (err) {
          AquaToast("Failed to load order details, please try again", "error");
        }

      } else {
        AquaToast("Order update failed, please try again", "error");
      }
    } catch (err) {
      AquaToast("Failed to update order, please try again", "error");
    } finally {
      setLoading(false);
    }
  }, [UpdateOrder, id, cartCount, getOrderByTrasactionId]);

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
                customclass={"text-success"}
                content={`Order Details-${product.order.paymentStatus==="Paid"?"Order Placed":"Awaiting Confirmation"}`}
                level={3}
              /> 
              <div class="card border-success mb-3" style={{maxWidth: "18rem;"}}>
                <div class="card-body">
                 
                  <h5 class="card-title text-success">{product.order?.paymentStatus} - <AquaCurrencyFormat amount={product.order.totalAmount} /></h5>
                  <h6>Order-Status:-{product.order.orderStatus}</h6>
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
          <button className="btn btn-dark rounded-pill">
            Dashboard 
          </button>
          <button className="ms-2 btn btn-outline-dark rounded-pill">
            Download Invoice
          </button>
        </div>
      </div>
    </AquaLayout>
  );
};

export default AquaOrdersComponent;
