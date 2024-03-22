import { createRouter } from "next-connect";
import axios from "axios";
import { SHA256 } from "crypto-js";
import AquaOrder from "@/Backend/models/orders"; // Adjust the import path as necessary

const router = createRouter();

function getUserIdFromTransactionId(transactionId) {
  const parts = transactionId.split('-');
  const userId = parts[1]; // Adjust this based on your actual transactionId format
  return userId;
}



router.post(async (req, res) => {
  const data = req.body;
  const merchantId = data.merchantId;
  const transactionId = data.transactionId;

  const urlencode = SHA256(`/pg/v1/status/${merchantId}/${transactionId}` + process.env.NEXT_PUBLIC_SALT_KEY).toString();
  const checksum = `${urlencode}###${process.env.NEXT_PUBLIC_SALT_INDEX}`;

  const options = {
    method: 'GET',
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": merchantId,
    },
  };

  axios.request(options)
    .then(async (apiResponse) => {
      console.log("PhonePe API Response:", apiResponse.data);
      const response = apiResponse.data;

      if (response.success && response.code === 'PAYMENT_SUCCESS') {
        // Extracting necessary data from the response
        const orderData = {
          user: getUserIdFromTransactionId(transactionId), // Replace with actual user ID
          items: "OrderItemsHere", // Replace with actual order items
          totalAmount: response.data.amount/100,
          paymentMethod: 'UPI', // Set based on your logic
          transactionId: response.data.transactionId,
          paymentStatus: 'Paid',
          paymentInstrument: {
            type: response.data.paymentInstrument.type,
            utr: response.data.paymentInstrument.utr,
            upiTransactionId: response.data.paymentInstrument.upiTransactionId,
            accountHolderName: response.data.paymentInstrument.accountHolderName,
            cardNetwork: response.data.paymentInstrument.cardNetwork,
            accountType: response.data.paymentInstrument.accountType,
          },
          // Include other fields as necessary
        };

        // Creating and saving the new order
        const newOrder = new AquaOrder(orderData);
        await newOrder.save();

        // Redirect to the order details page
        res.writeHead(302, { Location: `/order/${transactionId}` });
        res.end();
      } else {
        // Handle cases where payment is not successful
        res.status(400).json({ error: "Payment not successful" });
      }
    })
    .catch((error) => {
      console.error("Error calling PhonePe API:", error.message);
      res.status(500).json({ error: "Failed to check transaction status" });
    });
});

export default router.handler();
