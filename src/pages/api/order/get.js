// pages/api/order/get.js
import { createRouter } from "next-connect";
import db from "@/utils/db"; // Adjust the path according to your project structure
import AquaOrder from "@/Backend/models/order"; // Adjust the path according to your project structure

const router = createRouter();

handler.get(async (req, res) => {
  await db.connectDb();
  try {
    const orders = await AquaOrder.find({})
      .populate("user")
      .populate("items.productId");
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
