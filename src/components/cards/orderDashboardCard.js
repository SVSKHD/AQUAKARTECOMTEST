import AquaCurrencyFormat from "@/reusables/currencyFormatter";

const OrderDashboardCard = ({ data }) => {
  const { paymentStatus, paymentInstrument, totalAmount, items } = data;

  const renderPaymentInstrument = (instrument) => {
    switch (instrument.type) {
      case "CARD":
        return (
          <div>
            <p>Card Type: {instrument.cardType}</p>
            <p>ARN: {instrument.arn}</p>
            <p>BRN: {instrument.brn}</p>
          </div>
        );
      // Add cases for other payment instrument types if needed
      default:
        return <p>Payment Method: {instrument.type}</p>;
    }
  };

  return (
    <div className="card rounded-4 mb-3">
      <div className="card-body">
        <h3
          className={paymentStatus === "Paid" ? "text-success" : "text-danger"}
        >
          {paymentStatus}
        </h3>
        <h5 className="text-success">
          <AquaCurrencyFormat amount={totalAmount} />
        </h5>
        <hr />
        {renderPaymentInstrument(paymentInstrument)}
        <div>
          <h6>Items:</h6>
          {items.map((item) => (
            <div key={item._id} className="text-muted">
              <p>
                {item.name} - {item.quantity} x{" "}
                {<AquaCurrencyFormat amount={item.price} />}
              </p>
            </div>
          ))}
        </div>
        <button className="btn btn-dark rounded-pill">Download Invoice</button>
      </div>
    </div>
  );
};

export default OrderDashboardCard;
