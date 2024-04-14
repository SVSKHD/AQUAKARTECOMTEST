import AquaLayout from "@/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import AquaCartPageCard from "@/components/cards/cartPageCard";
import ProductFunctions from "@/reusableUtils/poroductFunctions";
import { useState, useEffect } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import Link from "next/link";
import AquaCurrencyFormat from "@/reusables/currencyFormatter";
import { useRouter } from "next/router";
import axios from "axios";
import sha256 from "crypto-js/sha256";
import { v4 as uuidv4 } from "uuid";
import AquaToast from "@/reusables/js/toast";
import AquaHeading from "@/reusables/heading";
import AquaButton from "@/reusables/button";
import { FaUser } from "react-icons/fa";
import UserOperations from "@/Services/user";
import AquaOrderOperatrions from "@/Services/order";
import AquaAddressDialog from "@/components/dialog/addressDialog";

const AquaCheckoutComponent = () => {
  const { favCount, cartCount, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const seo = { title: "Aquakart | Checkout" };
  const [selectedAddress, setSelectedAddress] = useState(false);
  const [checkedStates, setCheckedStates] = useState(
    user?.user?.addresses?.map(() => false),
  );
  const [deleteAll, setDeleteAll] = useState(false);
  const [addressFill, setAddressFill] = useState(false);
  const [addressEdit, setAddressEdit] = useState(false);

  const [cod, setCod] = useState({});
  const { cartTotal } = ProductFunctions();
  const { userDataUpdate } = UserOperations();
  const { CreateCodOrder } = AquaOrderOperatrions();
  const router = useRouter();

  const handleAddressSelect = (selectedAddressIndex) => {
    const selectedAddress = user.user.addresses[selectedAddressIndex];
    setSelectedAddress(true);
    dispatch({
      type: "UPDATE_SELECTED_ADDRESS",
      payload: { selectedAddress },
    });
    userDataUpdate(user.user._id, {
      selectedAddress: selectedAddress,
    })
      .then((res) => {
        AquaToast("Updated the Selected Address", "success");
      })
      .catch(() => {
        AquaToast("Please Try again", "error");
      });
  };

  useEffect(() => {
    if (router.pathname === "/checkout") {
      dispatch({
        type: "SET_CART_DRAWER_VISIBLE",
        payload: false,
      });
    }
  }, [router, dispatch]);

  const total = cartTotal(cartCount);

  const handleDeleteAll = () => {
    dispatch({
      type: "EMPTY_CART",
    });
  };

  const items = cartCount.map((item) => ({
    productId: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    // Include any other necessary fields required by PhonePe or your backend
  }));

  const initiatePhonePePayment = async () => {
    const transactionId = `AQTr-${user.user._id}-${uuidv4()
      .toString(36)
      .slice(-6)}`;
    const merchantUserId = "MUID-" + uuidv4().toString(36).slice(-6);

    const payload = {
      merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: merchantUserId,
      amount: (total - 1) * 100, // Example amount in paise
      redirectUrl: `https://aquakart.co.in/api/order/${transactionId}`,
      redirectMode: "POST",
      callbackUrl: `https://aquakart.co.in/api/order/${transactionId}`,
      mobileNumber: "9999999999", // Example mobile number
      paymentInstrument: {
        type: "PAY_PAGE",
      },
      items: items,
    };

    const dataPayload = JSON.stringify(payload);
    const dataBase64 = Buffer.from(dataPayload).toString("base64");

    const fullURL =
      dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
    const dataSha256 = sha256(fullURL).toString();

    const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;

    const UAT_PAY_API_URL =
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    try {
      const response = await axios.post(
        UAT_PAY_API_URL,
        {
          request: dataBase64,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
          },
        },
      );

      if (response) {
        const redirect = response.data.data.instrumentResponse.redirectInfo.url;
        router.push(redirect); // Redirect user to PhonePe payment page
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  const handleCashOnDelivery = () => {
    const calculatedTotal = cartTotal(cartCount); // Assuming cartTotal correctly computes the total

    const newOrder = {
      user: user?.user?._id, // Safe access and also make sure user exists
      orderType: "Cash On Delivery",
      items: cartCount.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: calculatedTotal,
      paymentMethod: "Cash On Delivery",
      paymentStatus: "Pending",
      currency: "INR",
      billingAddress: user?.user?.selectedAddress, // Ensure this is correctly assigned using safe access
      shippingAddress: user?.user?.selectedAddress, // Ensure this is correctly assigned using safe access
      shippingMethod: "Standard",
      shippingCost: 50, // Example fixed cost
      estimatedDelivery: new Date(
        new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
      ).toISOString(), // Adding 7 days for delivery
      orderStatus: "Processing",
    };

    // Since we need to use `newOrder` immediately, we use it directly instead of `cod`
    CreateCodOrder(newOrder) // Use newOrder directly here
      .then((res) => {
        console.log(res.data);
        setCod(newOrder); // Update state after successful API call
        AquaToast("successfully created COD order", "success");
      })
      .catch((error) => {
        console.error("Error creating COD order:", error);
        AquaToast("please try again", "error");
      });
  };

  const handlePayment = (event) => {
    event.preventDefault();
    if (!user) {
      dispatch({
        type: "SET_AUTH_DIALOG_VISIBLE",
        payload: true,
      });
    } else if (!selectedAddress) {
      AquaToast("please Select Address", "error");
    } else {
      initiatePhonePePayment();
    }
  };

  const handleAddressFillDialog = () => {
    setAddressFill(true);
  };

  const handleAddressSave = () => {};

  const handleAddressEdit = (i) => {
    console.log("i", i);
    setAddressEdit(true);
  };
  return (
    <>
      <AquaLayout seo={seo} container={true}>
        {!user ? (
          <div className="text-center mb-5">
            <button
              className="btn btn-outline-dark"
              onClick={() =>
                dispatch({ type: "SET_AUTH_DIALOG_VISIBLE", payload: true })
              }
            >
              Please Login To access cart
            </button>
          </div>
        ) : (
          <>
            <div className="row mb-3">
              <div className="col-md-7 col-md-7 col-xs-12 col-sm-12">
                {!user ? (
                  <>
                    <AquaButton
                      variant={"normal"}
                      onClick={() =>
                        dispatch({
                          type: "SET_AUTH_DIALOG_VISIBLE",
                          payload: true,
                        })
                      }
                    >
                      <FaUser size={25} />
                    </AquaButton>
                  </>
                ) : (
                  <div className="card rounded-4 mb-2">
                    <div className="card-body">
                      <AquaHeading
                        level={3}
                        decorate={true}
                        content={"Address"}
                      />
                      {user.user.addresses.length === 0 ? (
                        <button
                          className="btn btn-dark"
                          onClick={handleAddressFillDialog}
                        >
                          Add Address
                        </button>
                      ) : (
                        <div className="row">
                          {user.user.addresses.map((r, i) => (
                            <div key={i} className="col">
                              <div>
                                <div
                                  class="card rounded-4 mb-3"
                                  style={{ width: "18rem" }}
                                >
                                  <div class="card-body">
                                    <span>
                                      {" "}
                                      <input
                                        type="radio"
                                        value={i}
                                        name="addressSelection" // All radio buttons share the same 'name' to group them
                                        checked={
                                          user?.user?.selectedAddress?._id ===
                                          r?._id
                                        }
                                        onChange={() => handleAddressSelect(i)}
                                      />{" "}
                                      - Address-{i + 1}{" "}
                                    </span>
                                    <hr />
                                    <h5 class="card-title">{r.city}</h5>
                                    <h6 className="card-description">
                                      {r.state}
                                    </h6>
                                    <p class="text-muted">
                                      {r.street} {r.city}-{r.postalCode}
                                    </p>
                                    <button
                                      className="btn btn-base"
                                      onClick={handleAddressEdit}
                                    >
                                      <FaPen size={15} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="card rounded-4 ">
                  <div className="card-body">
                    <AquaHeading content={"Cart"} level={3} />
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
                            <div className="col text-end p-0 ">
                              {deleteAll ? (
                                <button
                                  className="btn btn-dark"
                                  onClick={handleDeleteAll}
                                >
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
                <div className="card rounded-4">
                  <div className="card-body">
                    <div className="mb-2">
                      <AquaHeading level={3} content={"Summary"} />
                    </div>
                    <ul className="conatiner list-group list-group-flush">
                      {cartCount.map((r) => (
                        <>
                          <div className="mb-2" key={r}>
                            <a
                              href={`/product/${r._id}`}
                              className="list-group-item list-group-item-action rounded"
                              aria-current="true"
                            >
                              <div className="d-flex w-100 justify-content-between">
                                <p className="card-subtitle">{r.title}</p>
                                <p className="cart-text-price text-bold">
                                  <AquaCurrencyFormat amount={r.price} /> *{" "}
                                  {r.quantity} ={" "}
                                  <AquaCurrencyFormat
                                    amount={r.price * r.quantity}
                                  />
                                </p>
                              </div>
                            </a>
                          </div>
                        </>
                      ))}
                    </ul>

                    {cartCount.length > 0 ? (
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
                    ) : (
                      <h4 className="text-center">Add items to cart </h4>
                    )}

                    <div class="row m-1">
                      <button
                        className="col m-2 btn btn-outline-secondary"
                        onClick={handleCashOnDelivery}
                      >
                        Cash on Delivery
                      </button>
                      <button
                        onClick={handlePayment}
                        class="col m-2 btn btn-dark"
                        type="button"
                      >
                        Proceed to Pay
                      </button>
                    </div>
                    <div class="d-grid checkout-margin">
                      <Link
                        class="btn btn-outline-dark"
                        href="/shop"
                        type="button"
                      >
                        Continue to Shop
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AquaAddressDialog
              show={addressFill}
              hide={() => setAddressFill(false)}
            />
            <AquaAddressDialog
              show={addressEdit}
              hide={() => setAddressEdit(false)}
            />
          </>
        )}
      </AquaLayout>
    </>
  );
};
export default AquaCheckoutComponent;
