import { createRouter } from "next-connect";
import axios from "axios";
import { SHA256 } from "crypto-js";
import AquaOrder from "@/Backend/models/orders"; // Adjust the import path as necessary
import db from "@/utils/db";

const router = createRouter();

// Function to extract userId from transactionId
function getUserIdFromTransactionId(transactionId) {
  const parts = transactionId.split('-');
  return parts[1]; // Adjust this based on your actual transactionId format
}

// Mock function to retrieve product details, replace with your actual logic
async function getProductDetails() {
  // This function should retrieve product details,
  // for example, from a shopping cart stored in the session or database
  return [
    { productId: "123", name: "Product 1", price: 100, quantity: 1 },
    { productId: "456", name: "Product 2", price: 200, quantity: 2 },
    // More products as necessary
  ];
}

router.post(async (req, res) => {
  await db.connectDb()
  const data = req.body;
  const transactionId = data.transactionId;
  const userId = getUserIdFromTransactionId(transactionId);

  // Retrieve product details for the order
 

  const options = {
    method: 'GET',
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${data.merchantId}/${transactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": `${SHA256(`/pg/v1/status/${data.merchantId}/${transactionId}` + process.env.NEXT_PUBLIC_SALT_KEY).toString()}###${process.env.NEXT_PUBLIC_SALT_INDEX}`,
      "X-MERCHANT-ID": data.merchantId,
    },
  };

  axios.request(options)
    .then(async (apiResponse) => {
      console.log("PhonePe API Response:", apiResponse.data);
      const response = apiResponse.data;

      if (response.success && response.code === 'PAYMENT_SUCCESS') {
        const orderData = {
          user: userId,
          totalAmount: response.data.amount / 100,
          transactionId: response.data.transactionId,
          paymentStatus: 'Paid',
          paymentInstrument: response.data.paymentInstrument,
        };

        const newOrder = new AquaOrder(orderData);
        await newOrder.save();

        res.writeHead(302, { Location: `/order/${newOrder._id}` });
        res.end();
      } else {
        res.status(400).json({ error: "Payment not successful" });
      }
    })
    .catch((error) => {
      console.error("Error calling PhonePe API:", error.message);
      // res.status(500).json({ error: "Failed to check transaction status" });
      res.writeHead(302, { Location: `/order/${transactionId}?info="FAILURE"` });
      res.end();
    });
    await db.disconnectDb()
});


router.put(async(req,res)=>{
  const {id} = req.query
  const order = AquaOrder.findById(id)
  
})



export default router.handler();
