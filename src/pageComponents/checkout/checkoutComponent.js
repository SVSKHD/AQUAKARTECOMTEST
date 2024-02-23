import AquaLayout from "@/Layout/Layout";
import { useSelector } from "react-redux";
import AquaCartPageCard from "@/components/cards/cartPageCard";
import ProductFunctions from "@/reusableUtils/poroductFunctions";
import { useState, useEffect } from "react";

const AquaCheckoutComponent = () => {
  const seo = { title: "Aquakart | Checkout" };
  const [deleteAll, setDeleteAll] = useState(false);
  const { favCount, cartCount } = useSelector((state) => ({ ...state }));

  const { cartTotal } = ProductFunctions();
  const total = cartTotal(cartCount);

  return (
    <>
      <AquaLayout seo={seo}>
        <div className="row mb-3">
          <div className="col-md-7 col-md-7 col-xs-12 col-sm-12">
            <div className="card shadow-lg">
              <div className="card-body">
                <h3>Cart</h3>
                <hr />
                <div>
                  {cartCount.length > 0 ? (
                    <>
                      <div>
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={deleteAll}
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          >
                            Select All
                          </label>
                        </div>
                      </div>
                      {cartCount.map((r) => (
                        <>
                          <div>
                            <AquaCartPageCard data={r} />
                            <hr />
                          </div>
                        </>
                      ))}
                    </>
                  ) : (
                    <h5>No Products yet in cart</h5>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 col-lg-5 col-xs-12 col-sm-12">
            <div className="card shadow-lg">
              <div className="card-body">
                <ul className="conatiner list-group list-group-flush">
                  {cartCount.map((r) => (
                    <>
                      <div key={r}>
                        <a
                          href="#"
                          className="list-group-item list-group-item-action"
                          aria-current="true"
                        >
                          <div className="d-flex w-100 justify-content-between">
                            <h6 className="">{r.title}</h6>
                            <h6 className="cart-text-price">
                              ₹{r.price} * {r.quantity} = ₹
                              {r.price * r.quantity}
                            </h6>
                          </div>
                        </a>
                      </div>
                    </>
                  ))}
                </ul>
                <hr />
                <div class="d-flex">
                  <div class="p-2 flex-fill">
                    <h4>Total</h4>
                  </div>
                  <div class="p-2 flex-fill text-end text-success">
                    <h4>₹{total}</h4>
                  </div>
                </div>

                <hr />
              </div>
            </div>
          </div>
        </div>
      </AquaLayout>
    </>
  );
};
export default AquaCheckoutComponent;
