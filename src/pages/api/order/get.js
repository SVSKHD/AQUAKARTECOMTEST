import { createRouter } from "next-connect";
import db from "@/utils/db";
import AquaOrder from "@/Backend/models/orders";
import AquaEcomUser from "@/Backend/models/user";
import sendEmail from "@/utils/emailTemplates/sendEmail";
import orderEmail from "@/utils/emailTemplates/orderEmail";

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

    const order = await AquaOrder.findOne(query).sort({ createdAt: -1 });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "No orders found for the provided criteria",
      });
    }

    const user = await AquaEcomUser.findById(order.user);

    if (order.paymentStatus === "Paid") {
      const emailContent = orderEmail(
        user.email,
        order.items,
        order.paymentStatus,
        order.estimatedDelivery
      ); // This function should return the HTML content of the email
      await sendEmail({
        email: user.email,
        subject: `Thank You for Your Order!  - Aquakart`,
        message: "Happy Shopping",
        content: emailContent,
      });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Error fetching orders:", error);
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
