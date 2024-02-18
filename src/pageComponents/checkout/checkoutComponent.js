import AquaLayout from "@/Layout/Layout";
import { useSelector } from "react-redux";
import AquaCartPageCard from "@/components/cards/cartPageCard";
import ProductFunctions from "@/reusableUtils/poroductFunctions";

const AquaCheckoutComponent = () => {
  const seo = { title: "Aquakart | Checkout" };
  const { favCount, cartCount } = useSelector((state) => ({ ...state }));
  const { cartTotal } = ProductFunctions();
  const total = cartCount.reduce((a, r) => a + Number(r.price * r.quantit), 0);

  return (
    <>
      <AquaLayout seo={seo}>
        <div className="row mb-3">
          <div className="col-md-8 col-md-8 col-xs-12 col-sm-12">
            <div className="card shadow-lg">
              <div className="card-body">
                <h3>Cart</h3>
                <hr />
                <div>
                  {cartCount.length > 0 ? (
                    <>
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
          <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
            <div className="card shadow-lg">
              <div className="card-body">
                <div class="d-flex">
                  <div class="p-2 flex-fill">
                    <h3>Total</h3>
                  </div>
                  <div class="p-2 flex-fill text-end text-success">
                    <h3>₹{cartTotal()}</h3>
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
