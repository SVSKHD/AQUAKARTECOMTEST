import React from "react";

const AquaCurrencyFormat = ({ amount, adjust }) => {
  // Assuming you want to subtract 1 from the amount before formatting
  let adjustedAmount;

  if (adjust) {
    adjustedAmount = amount - 1;
  }else if(!amount || amount===0){
    adjustedAmount
  } 
  else {
    adjustedAmount = amount;
  }

  // Use the Intl.NumberFormat to format the currency without the currency symbol
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0, // Assuming you don't want decimal places
  }).format(adjustedAmount);

  return <span>₹{formattedAmount}/-</span>;
};

export default AquaCurrencyFormat;
