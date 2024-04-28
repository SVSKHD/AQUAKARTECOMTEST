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
import { nanoid } from "nanoid";
import moment from "moment";
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
  const [addressAdd, setAddressAdd] = useState(false);
  const [addressAddPass, setAddressAddPass] = useState({});
  const [addressEdit, setAddressEdit] = useState(false);
  const [passAddress, setPassAddress] = useState({});
  const [loadingStatus, setLoadingStatus] = useState({
    codStatus: false,
    phonepeGateway: false,
  });
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

  const handlePhonePeGateway = () => {
    const transactionId = `AQTR-${nanoid(5).toUpperCase()}D${moment(
      new Date(),
    ).format("DDMMYYYY")}`;
    const calculatedTotal = cartTotal(cartCount);
    const newOrder = {
      user: user?.user?._id, // Safe access and also make sure user exists
      transactionId: transactionId,
      orderType: "OTHER THAN CASH",
      items: cartCount.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: calculatedTotal,
      paymentMethod: "OTHER THAN CASH",
      paymentStatus: "Pending",
      currency: "INR",
      billingAddress: user?.user?.selectedAddress, // Ensure this is correctly assigned using safe access
      shippingAddress: user?.user?.selectedAddress, // Ensure this is correctly assigned using safe access
      shippingMethod: "Standard",
      shippingCost: 50, // Example fixed cost
      estimatedDelivery: new Date(
        new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
      ).toISOString(), // Adding 7 days
    };
    console.log("phonepe", newOrder);
    axios
      .post("/api/pg/phonepe", newOrder)
      .then((res) => {
        console.log("res", res.data);
        window.location.href = res.data;
      })
      .catch(() => {
        AquaToast("please Try again", "error");
      });
  };

  const handleCashOnDelivery = () => {
    setLoadingStatus({ phonepeGateway: false, codStatus: true });
    if (!selectedAddress) {
      AquaToast("Please Select the Address", "error");
    } else {
      const calculatedTotal = cartTotal(cartCount); // Assuming cartTotal correctly computes the total

      const newOrder = {
        user: user?.user?._id, // Safe access and also make sure user exists
        orderType: "Cash On Delivery",
        items: cartCount.map((item) => ({
          productId: item._id,
          name: item.title,
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
      CreateCodOrder(newOrder) // Use newOrder directly here
        .then((res) => {
          console.log(res.data);
          setCod(newOrder); // Update state after successful API call
          AquaToast("successfully created COD order", "success");
          setLoadingStatus({ codStatus: false, phonepeGateway: false });
          router.push(`/order/${res.data.newOrder._id}`);
        })
        .catch((error) => {
          setLoadingStatus({ cod: false, phonepeGateway: false });
          console.error("Error creating COD order:", error);
          AquaToast("please try again", "error");
        });
    }
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
      handlePhonePeGateway();
    }
  };

  const handleAddressAddDialog = () => {
    setAddressAdd(true);
  };

  const handleAddressSave = async (address) => {
    const updatedAddresses = [...user?.user?.addresses, address];
    await userDataUpdate(user.user._id, { addresses: updatedAddresses })
      .then((res) => {
        console.log("address", res.data.data.addresses);
        const addressData = res.data.data.addresses;
        dispatch({
          type: "UPDATE_USER_ADDRESSES",
          payload: { addresses: addressData },
        });
        AquaToast("Addresses Added Successfully", "success");
        setAddressAdd(false);
      })
      .catch(() => {
        AquaToast("Sorry Please Try again", "error");
      });
  };

  const handleAddressEdit = (data) => {
    setAddressEdit(true);
    setPassAddress(data);
  };

  const handleAddressEditSave = async (editedAddress) => {
    const updatedAddresses = user?.user?.addresses.map((addr) =>
      addr._id === editedAddress._id ? editedAddress : addr,
    );
    await userDataUpdate(user.user._id, { addresses: updatedAddresses })
      .then((res) => {
        console.log("address", res.data.data.addresses);
        dispatch({
          type: "UPDATE_USER_ADDRESSES",
          payload: { addresses: res.data.data.addresses },
        });
        AquaToast("Address Added Successfully", "success");
        setAddressEdit(false);
      })
      .catch(() => {
        AquaToast("Sorry, please try again", "error");
      });
  };

  const handleDeleteAddress = async (index) => {
    // Create a new array excluding the address at the specified index
    const updatedAddresses = user.user.addresses.filter(
      (_, idx) => idx !== index,
    );
    await userDataUpdate(user.user._id, { addresses: updatedAddresses })
      .then(() => {
        dispatch({
          type: "UPDATE_USER_ADDRESSES",
          payload: { addresses: updatedAddresses },
        });
        AquaToast("Addresses Updated Successfully", "success");
      })
      .catch(() => {
        AquaToast("!failed, Please Try again", "error");
      });
  };

  useEffect(() => {
    if (user?.user?.selectedAddress) {
      const isSelectedAddress = user.user.addresses.some(
        (address) => address._id === user.user.selectedAddress._id,
      );
      setSelectedAddress(isSelectedAddress);
    }
  }, [user]);

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
                      {user.user.addresses?.length === 0 ? (
                        <button
                          className="btn btn-dark"
                          onClick={handleAddressAddDialog}
                        >
                          Add Address
                        </button>
                      ) : (
                        <>
                          <div className="row">
                            {user?.user?.addresses?.map((r, i) => (
                              <div key={i} className="col">
                                <div
                                  className="card rounded-4 mb-3"
                                  style={{ width: "21rem" }}
                                >
                                  <div className="card-body">
                                    <input
                                      type="radio"
                                      value={i}
                                      name="addressSelection"
                                      checked={
                                        user?.user?.selectedAddress?._id ===
                                        r?._id
                                      }
                                      onChange={() => handleAddressSelect(i)}
                                    />{" "}
                                    - Address-{i + 1}
                                    <hr />
                                    <h5 className="card-title">{r.city}</h5>
                                    <h6 className="card-description">
                                      {r.state}
                                    </h6>
                                    <p className="text-muted">
                                      {r.street} {r.city}-{r.postalCode}
                                    </p>
                                    <div
                                      className="btn-group mr-2"
                                      role="group"
                                      aria-label="Second group"
                                    >
                                      <button
                                        type="button"
                                        className="btn btn-base"
                                        onClick={() => handleAddressEdit(r)}
                                      >
                                        <FaPen size={15} />
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteAddress(i)}
                                      >
                                        <FaTrash size={15} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <button
                            className="btn btn-dark"
                            onClick={handleAddressAddDialog}
                          >
                            Add Address
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className="card rounded-4 ">
                  <div className="card-body">
                    <AquaHeading content={"Cart"} decorate={true} level={3} />
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
                                  className="btn btn-base"
                                  onClick={handleDeleteAll}
                                >
                                  <FaTrash size={25} className="text-danger" />
                                </button>
                              ) : (
                                ""
                              )}
                            </div>
                            <hr />
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
                        {loadingStatus.codStatus ? (
                          <div
                            class="spinner-border text-light"
                            role="status"
                          />
                          
                        ) : (
                          "Cash on Delivery"
                        )}
                      </button>
                      <button
                        onClick={handlePayment}
                        class="col m-2 btn btn-dark"
                        type="button"
                      >{loadingStatus.phonepeGateway ? ( <div
                            class="spinner-border text-light"
                            role="status"
                          />) : "Proceed to Pay"}
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
              show={addressAdd}
              hide={() => setAddressAdd(false)}
              address={addressAddPass}
              onSave={handleAddressSave}
            />
            <AquaAddressDialog
              show={addressEdit}
              hide={() => setAddressEdit(false)}
              address={passAddress}
              onSave={handleAddressEditSave}
            />
          </>
        )}
      </AquaLayout>
    </>
  );
};
export default AquaCheckoutComponent;
