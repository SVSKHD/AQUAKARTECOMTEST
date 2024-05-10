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
        <h3
          className={
            order.paymentStatus === "Paid" ? "text-success" : "text-danger"
          }
        >
          {order.paymentStatus === "Paid" ? order.paymentStatus : "COD"}
        </h3>
        <h5 className="text-success">
          <AquaCurrencyFormat amount={order.totalAmount} />
        </h5>
        <hr />
        <p>
          <strong>Transaction ID:</strong> {order.transactionId}
        </p>
        <p>
          <strong>Order ID:</strong> {order.orderId}
        </p>
        {renderPaymentInstrument(order.paymentInstrument)}
        <hr />
        <ul>
          {order.items.map((item) => (
            <li key={item._id}>
              {item.name} - Quantity: {item.quantity}, Price per item:{" "}
              <AquaCurrencyFormat amount={item.price} />
            </li>
          ))}
        </ul>
        <button
          className="btn btn-primary mt-2"
          onClick={handleDownloadInvoice}
        >
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default OrderDashboardCard;
