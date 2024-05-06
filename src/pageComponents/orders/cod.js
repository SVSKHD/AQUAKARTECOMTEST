import AquaLayout from "@/Layout/Layout";
import AquaToast from "@/reusables/js/toast";
import AquaOrderOperatrions from "@/Services/order";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";

const AquaCodPageComponent = () => {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const seoData = {
    title: "Aquakart | COD - Orders",
  };
  const { getOrderById } = AquaOrderOperatrions();
  const { id } = router.query;

  useEffect(() => {
    getOrderById(id)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        AquaToast("sorry please try again", "error");
      });
  }, [id, getOrderById]);
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
                  Order Id : <span>{product?.orderId}</span>
                </h5>
                <h5>
                  Estimated Delivery Date :{" "}
                  <span>
                    {moment(product?.estimatedDelivery).format("DD-MM-YY")}
                  </span>
                </h5>
                <div className="row">
                  <div className="col text-end">Ordered Items :</div>
                  <div className="col text-start">
                    {product?.items?.map((r, i) => (
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
              </div>
            </div>
          </div>
        </div>
      </AquaLayout>
    </>
  );
};
export default AquaCodPageComponent;
