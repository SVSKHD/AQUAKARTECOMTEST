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


router.put(async (req, res) => {
  await db.connectDb(); // Ensure the database connection is open

  const {id , userId} = req.query

  try {
    // Find the order by orderId and userId to ensure the user has the right to update this order
    const order = await AquaOrder.findOne({ _id: id, user: userId });

    // Check if the order exists and belongs to the user
    if (!order) {
      return res.status(404).json({ error: "Order not found or you don't have permission to update this order" });
    }

    // Assuming the updated order items are sent in the request body
    const { items } = req.body;
   

    // Transform incoming items to match the schema requirements
    const updatedItems = items.map(item => ({
      productId: item._id, // Assuming item._id is the productId you want to reference
      name: item.title,
      price: item.price,
      quantity: item.quantity
    }));

    // Update the order's items with the new items
    order.items = updatedItems;

    // Save the updated order
    await order.save();

    // Send back the updated order as a response
    res.json(order);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Failed to update order" });
  } finally {
    await db.disconnectDb(); // Close the database connection
  }
});




export default router.handler();
