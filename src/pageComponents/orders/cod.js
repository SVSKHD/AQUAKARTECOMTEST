import AquaLayout from "@/Layout/Layout";
import AquaToast from "@/reusables/js/toast";
import AquaOrderOperatrions from "@/Services/order";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import Link from "next/link";

const AquaCodPageComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [order, setOrder] = useState({});
  const seoData = {
    title: "Aquakart | COD - Orders",
  };
  const { getOrderByTrasactionId } = AquaOrderOperatrions();
  const { id } = router.query;

  useEffect(() => {
    getOrderByTrasactionId(id)
      .then((res) => {
        setOrder(res.data.data);
        dispatch({ type: "EMPTY_CART" });
      })
      .catch((err) => {
        AquaToast("sorry please try again", "error");
      });
  }, [id, getOrderByTrasactionId, dispatch]);

  return (
    <>
      <AquaLayout seo={seoData}>
        <div className="container mb-4">
          <div className="justify-content-center">
            <div className="card rounded-3 shadow-md rounded-4">
              <div class="card-header bg-success">
                <h1 className="display-2 text-white">COD</h1>
              </div>
              <div className="card-body text-center">
                <h2>Order Details & Status</h2>
                <hr />
                <h5>
                  Order Id : <span>{order?.orderId}</span>
                </h5>
                <h5>
                  Estimated Delivery Date :{" "}
                  <span>
                    {order?.estimatedDelivery
                      ? moment(order.estimatedDelivery).format("YYYY-MM-DD")
                      : "N/A"}
                    {/* Check if the date is in the future */}
                    {order?.estimatedDelivery &&
                    moment(order.estimatedDelivery).isAfter(moment())
                      ? " (In the future)"
                      : " (Not in the future)"}
                  </span>
                </h5>
                <div className="row">
                  <div className="col text-end">Ordered Items :</div>
                  <div className="col text-start">
                    {order?.items?.map((r, i) => (
                      <>
                        <div className="card shadow-md">
                          <div className="card-body">
                            <a
                              href={`/product/${r.productId}`}
                              className="text-dark"
                            >
                              {r.name}
                            </a>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <div className="justify-content-center mt-4">
                  <Link
                    href="/dashboard/orders"
                    className="btn btn-dark rounded-pill"
                  >
                    Dashboard
                  </Link>
                  <button
                    className="ms-2 btn btn-outline-dark rounded-pill"
                    onClick={() => handleCLickInvoice(r)}
                  >
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AquaLayout>
    </>
  );
};
export default AquaCodPageComponent;
