import React from "react";
import AquaCurrencyFormat from "@/reusables/currencyFormatter";

const OrderDashboardCard = ({ order }) => {
  const renderPaymentInstrument = (instrument) => {
    if (!instrument) return <p>No payment instrument details available.</p>;

    return (
      <div>
        <p>Payment Type: {instrument.type}</p>
        {instrument.type === "CARD" && (
          <>
            <p>Card Type: {instrument.cardType}</p>
            <p>ARN: {instrument.arn}</p>
            <p>BRN: {instrument.brn}</p>
          </>
        )}
        {instrument.utr && <p>UTR: {instrument.utr}</p>}
        {instrument.cardNetwork && (
          <p>Card Network: {instrument.cardNetwork}</p>
        )}
        {instrument.accountType && (
          <p>Account Type: {instrument.accountType}</p>
        )}
      </div>
    );
  };

  const handleDownloadInvoice = () => {
    console.log("Invoice Downloaded for Order:", order);
    // Additional logic to handle the download process can be added here
  };

  return (
    <div className="card rounded-4 mb-3">
      <div className="card-body">
        <div class="d-flex justify-content-between">
          <p>
            <strong>Order ID:</strong> {order.orderId}
          </p>
          <h5 className="text-success">
            <AquaCurrencyFormat amount={order.totalAmount} />
          </h5>
          <span>
            <span
              className={
                order.paymentStatus === "Paid"
                  ? "badge text-bg-success px-3"
                  : "badge text-bg-warning px-3"
              }
            >
              {order.paymentStatus === "Paid" ? order.paymentStatus : "COD"}
            </span>
          </span>
        </div>
        {/* <p>
          <strong>Transaction ID:</strong> {order.transactionId}
        </p> */}

        {/* {renderPaymentInstrument(order.paymentInstrument)} */}
        <div className="d-flex justify-content-between">
          <ol className="ps-3 mb-0 small text-body-secondary">
            {order.items.map((item) => (
              <li key={item._id}>
                {item.name} - Quantity: {item.quantity}, Price per item:{" "}
                <AquaCurrencyFormat amount={item.price} />
              </li>
            ))}
          </ol>
          <span>
            <button
              className="btn btn-secondary btn-sm rounded-pill"
              onClick={handleDownloadInvoice}
            >
              Download Invoice
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDashboardCard;
