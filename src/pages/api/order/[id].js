import { createRouter } from "next-connect";
import axios from "axios";
import { SHA256 } from "crypto-js";
import AquaOrder from "@/Backend/models/orders";
import db from "@/utils/db";

const router = createRouter();

function getUserIdFromTransactionId(transactionId) {
  const parts = transactionId.split("-");
  return parts[1];
}

router.post(async (req, res) => {
  console.log("req", req.body)
  res.json({success:true , data:req.body})
  // try {
  //   await db.connectDb();
  //   const data = req.body;
  //   const allowedOrigins = [
  //     "https://www.aquakart.co.in",
  //     "http://localhost:3000",
  //   ];
  //   const origin = req.headers.origin;

  //   // If the request's origin is in our list of allowed origins, set the header.
  //   if (allowedOrigins.includes(origin)) {
  //     res.setHeader("Access-Control-Allow-Origin", origin);
  //   }

  //   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  //   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  //   console.log("req", data);
  //   const transactionId = data.transactionId;
  //   const userId = getUserIdFromTransactionId(transactionId);

  //   const options = {
  //     method: "GET",
  //     url: `https://api-preprod.phonepe.com/apis/pg/v1/status/${data.merchantId}/${transactionId}`,
  //     headers: {
  //       accept: "application/json",
  //       "Content-Type": "application/json",
  //       "X-VERIFY": `${SHA256(
  //         `/pg/v1/status/${data.merchantId}/${transactionId}` +
  //           process.env.NEXT_PUBLIC_SALT_KEY,
  //       ).toString()}###${process.env.NEXT_PUBLIC_SALT_INDEX}`,
  //       "X-MERCHANT-ID": data.merchantId,
  //     },
  //   };

  //   const apiResponse = await axios.request(options);
  //   console.log("PhonePe API Response:", apiResponse.data);
  //   const response = apiResponse.data;

  //   if (response.success) {
  //     const orderData = {
  //       user: userId,
  //       totalAmount: response.data.amount / 100,
  //       transactionId: response.data.transactionId,
  //       paymentStatus: "Paid",
  //       paymentInstrument: response.data.paymentInstrument,
  //       orderType: "Payment Method",
  //       transactionId: transactionId,
  //     };

  //     const newOrder = new AquaOrder(orderData);

  //     await newOrder.save();
  //     console.log(newOrder.user);
  //     res.writeHead(302, { Location: `/order/${newOrder.transactionId}` });
  //     res.end();
  //   } else {
  //     res.status(400).json({ error: "Payment not successful" });
  //   }
  // } catch (error) {
  //   console.error("Error calling PhonePe API:", error.message);
  //   res.writeHead(302, {
  //     Location: `/order/${transactionId}?info="FAILURE"`,
  //   });
  //   res.end();
  // } finally {
  //   await db.disconnectDb();
  // }
});


router.put(async (req, res) => {
  await db.connectDb(); // Ensure the database connection is open

  const { id } = req.query; // This is transactionId based on your setup
  try {
    const { products } = req.body; // Assuming you're sending a 'products' array in the body
    console.log();
    // Transform incoming products to match the schema requirements for 'items'
    const updatedItems = products.map((product) => ({
      productId: product._id, // Assuming product._id is the productId you want to reference
      name: product.name, // Use 'name' from the product
      price: product.price, // Use 'price' from the product
      quantity: product.quantity, // Use 'quantity' from the product
    }));

    // Find the order by transactionId and update its items
    const updatedOrder = await AquaOrder.findOneAndUpdate(
      { transactionId: id }, // Use the transactionId to find the order
      { $set: { items: updatedItems } }, // Update the 'items' field
      { new: true, runValidators: true }, // Return the updated document and run schema validators
    );

    if (!updatedOrder) {
      return res.status(404).json({
        error: "Order not found with the given transaction ID",
      });
    }

    // Send back the updated order as a response
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Failed to update order" });
  } finally {
    await db.disconnectDb(); // Close the database connection
  }
});

router.get(async (req, res) => {
  try {
    await db.connectDb(); // Ensure database connection is established

    const { id } = req.query; // Correctly extract the 'id' from request parameters
    console.log("id", id);
    const order = await AquaOrder.findOne({transactionId:id}); // Await the async operation to get the order

    // Check if order exists
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // If order is found, send it in response
    res.json({ success: true, order: order });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  } finally {
    await db.disconnectDb(); // Disconnect the database in finally block to ensure it always executes
  }
});

export default router.handler();
