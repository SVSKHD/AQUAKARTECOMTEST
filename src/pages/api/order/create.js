// pages/api/order/create.js
import nextConnect from "next-connect";
import db from "@/utils/db"; // Adjust the path according to your project structure
import AquaOrder from "@/Backend/models/order"; // Adjust the path according to your project structure

const handler = nextConnect();

handler.post(async (req, res) => {
  await db.connectDb();
  const newOrder = new AquaOrder(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, data: savedOrder });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to create order",
        error: error.message,
      });
  }
});

export default handler;
