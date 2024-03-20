// pages/api/order/[id].js
import { createRouter } from "next-connect";
import mongoose from "mongoose";
import db from "@/utils/db"; // Adjust the path according to your project structure
import AquaOrder from "@/Backend/models/orders"; // Adjust the path according to your project structure

const handler = createRouter();

handler.get(async (req, res) => {
  await db.connectDb();
  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid order ID" });
  }

  try {
    const order = await AquaOrder.findById(id)
      .populate("user")
      .populate("items.productId");
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
});

export default router.handler();
