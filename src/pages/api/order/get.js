import { createRouter } from "next-connect";
import db from "@/utils/db";
import AquaOrder from "@/Backend/models/orders";

const router = createRouter();

router.get(async (req, res) => {
  const allowedOrigins = [
    "https://www.aquakart.co.in",
    "http://localhost:3000",
  ];
  const origin = req.headers.origin;

  // Set CORS headers if the origin is allowed
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  await db.connectDb();

  const { userId, orderId, transactionId } = req.query;

  try {
    let query = {};

    if (userId) {
      query.user = userId;
    }

    if (orderId) {
      query._id = orderId;
    }

    if (transactionId) {
      query.transactionId = transactionId;
     }

    const orders = await AquaOrder.findOne(query).sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No orders found for the provided criteria",
      });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  } finally {
    await db.disconnectDb();
  }
});

export default router.handler();
