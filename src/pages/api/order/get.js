import { createRouter } from "next-connect";
import db from "@/utils/db"; // Adjust the path according to your project structure
import AquaOrder from "@/Backend/models/orders"; // Adjust the path according to your project structure

const router = createRouter();

router.get(async (req, res) => {
  await db.connectDb();

  // Extract userId from query parameters
  const { userId } = req.query;

  try {
    // If userId is not provided, return an error
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "No userId provided",
      });
    }

    // Find orders that match the provided userId
    const orders = await AquaOrder.find({ user: userId }) 
    // If no orders are found for the given userId, return a message
    if (orders.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No orders found for this user",
      });
    }

    // Return the found orders
    res.status(200).json({ success: true, data: orders });
    await db.disconnectDb()
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
    await db.disconnectDb()
  }
});

export default router.handler();
