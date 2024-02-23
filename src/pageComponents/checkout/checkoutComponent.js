import AquaLayout from "@/Layout/Layout";
import { useSelector } from "react-redux";
import AquaCartPageCard from "@/components/cards/cartPageCard";
import ProductFunctions from "@/reusableUtils/poroductFunctions";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import AquaCurrencyFormat from "@/reusables/currencyFormatter";

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

                <div>
                  {cartCount.length > 0 ? (
                    <>
                      <div className=" container row">
                        <div className="col form-check mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={deleteAll}
                            onChange={() => setDeleteAll(!deleteAll)}
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          >
                            Select All
                          </label>
                        </div>
                        <div className="col text-end">
                          {deleteAll ? (
                            <button className="btn btn-dark">
                              <FaTrash size={20} />
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      {cartCount.map((r) => (
                        <>
                          <div>
                            <AquaCartPageCard data={r} />
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
            <div className="card shadow-lg rounded">
              <div className="card-body">
                <ul className="conatiner list-group list-group-flush">
                  {cartCount.map((r) => (
                    <>
                      <div className="mb-2" key={r}>
                        <a
                          href="#"
                          className="list-group-item list-group-item-action rounded"
                          aria-current="true"
                        >
                          <div className="d-flex w-100 justify-content-between">
                            <h6 className="">{r.title}</h6>
                            <h6 className="cart-text-price">
                              <AquaCurrencyFormat amount={r.price} /> *{" "}
                              {r.quantity} ={" "}
                              <AquaCurrencyFormat
                                amount={r.price * r.quantity}
                              />
                            </h6>
                          </div>
                        </a>
                      </div>
                    </>
                  ))}
                </ul>

                <div class="d-flex">
                  <div class="p-2 flex-fill">
                    <h4>Total</h4>
                  </div>
                  <div class="p-2 flex-fill text-end text-success">
                    <h4>
                      <AquaCurrencyFormat amount={total} adjust={true} />
                    </h4>
                  </div>
                </div>

                <div class="row">
                  <Link href="/shop" className="btn col m-2 btn btn-light">
                    Continue To Shop
                  </Link>

                  <button class="col m-2 btn btn-dark" type="button">
                    Proceed to Pay
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
export default AquaCheckoutComponent;
