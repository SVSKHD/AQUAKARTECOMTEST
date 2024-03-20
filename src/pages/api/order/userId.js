// pages/api/order/userid.js
import { createRouter } from "next-connect";
import mongoose from "mongoose";
import db from "@/utils/db"; // Adjust the path according to your project structure
import AquaOrder from "@/Backend/models/orders"; // Adjust the path according to your project structure

const router = createRouter();

handler.get(async (req, res) => {
  await db.connectDb();
  const { userid } = req.query;

  if (!mongoose.Types.ObjectId.isValid(userid)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  try {
    const orders = await AquaOrder.find({ user: userid }).populate(
      "items.productId",
    );
    if (!orders) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found for this user" });
    }
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

export default router.handler();
