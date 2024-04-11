import React from "react";

const AquaCurrencyFormat = ({ amount, adjust }) => {
  // Default the amount to 0 if it's not provided
  let adjustedAmount = amount || 0;

  // Subtract 1 from the amount if adjust is true
  if (adjust) {
    adjustedAmount -= 1;
  }

  // Use the Intl.NumberFormat to format the currency
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0, // Assuming you don't want decimal places
  }).format(adjustedAmount);

  return <span>₹{formattedAmount}/-</span>;
};

export default AquaCurrencyFormat;
