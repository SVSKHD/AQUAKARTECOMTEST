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
  const [activeIndex, setActiveIndex] = useState(null);
  const [toastShown, setToastShown] = useState(false); // State to track if the toast has been shown
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { UpdateOrder, getOrderByTrasactionId } = AquaOrderOperations();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const productRes = await getOrderByTrasactionId(id);
        setProduct(productRes.data);
        console.log("product", productRes.data);
        // dispatch({ type: "EMPTY_CART" }); // Empty cart only if order is updated
        setLoading(false);
      } catch (err) {
        AquaToast("Failed to load order details, please try again", "error");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderUpdated, getOrderByTrasactionId, id, dispatch]);

  const handleCLickInvoice = (data) => {
    console.log("invoice");
  };
  const seo = {
    title: "Aquakart | Order Confirmation",
  };

  return (
    <AquaLayout seo={seo} container={true}>
      {/* <div className="card rounded-4 mb-3">
        <div className="card-body">
          {loading ? (
            <div className="spinner-border text-dark" role="status" />
          ) : (
            <>
              <AquaHeading
                decorate={true}
                customclass={"text-success"}
                content={`Order Details-${product.order?.orderStatus}-${product.order.paymentMethod}`}
                level={3}
              />
              {product.order.paymentMethod === "Cash On Delivery" ? (
                <>
                  <h6 className="text-muted">
                    Ordered Items -{" "}
                    <span className="text-success">
                      Total Amount -
                      {
                        <AquaCurrencyFormat
                          amount={product.order.totalAmount}
                        />
                      }
                    </span>
                  </h6>

                  <div className="list-group">
                    {product.order?.items.map((item, index) => (
                      <a
                        key={index} // It's important to use `key` here for React list rendering
                        onMouseEnter={() => setActiveIndex(index)} // Set active index on mouse enter
                        onMouseLeave={() => setActiveIndex(null)} // Remove active index on mouse leave
                        href={`/product/${item.productId}`}
                        className={`list-group-item list-group-item-action mb-3 ${activeIndex === index ? "active" : ""}`} // Apply 'active' class conditionally
                        aria-current={activeIndex === index ? "true" : "false"}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <div
                  className="card border-success mb-3"
                  style={{ maxWidth: "18rem;" }}
                >
                  <div className="card-body">
                    <h5 className="card-title text-success">
                      {product.order?.paymentStatus} -{" "}
                      <AquaCurrencyFormat amount={product.order?.totalAmount} />
                    </h5>
                    <AquaHeading
                      level={5}
                      decorate={true}
                      content={"Ordered Items"}
                    />
                    {product.order?.items.map((item, index) => (
                      <p key={index}>{item.name}</p>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          <Link href="/dashboard/orders" className="btn btn-dark rounded-pill">
            Dashboard
          </Link>
          <button
            className="ms-2 btn btn-outline-dark rounded-pill"
            onClick={() => handleCLickInvoice(r)}
          >
            Download Invoice
          </button>
        </div>
      </div> */}
      {/* <div>{JSON.stringify(product)}</div> */}
      <h1>ordered</h1>
    </AquaLayout>
  );
};

export default AquaOrdersComponent;
