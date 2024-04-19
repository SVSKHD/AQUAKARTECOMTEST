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
      await db.disconnectDb(); // Ensure database connection is closed on error
      return res.status(400).json({
        success: false,
        message: "No userId provided",
      });
    }

    // Find orders that match the provided userId and sort them by createdAt in descending order
    const orders = await AquaOrder.find({ user: userId }).sort({
      createdAt: -1,
    });

    // If no orders are found for the given userId, return a message
    if (orders.length === 0) {
      await db.disconnectDb(); // Ensure database connection is closed if no data found
      return res.status(404).json({
        success: true,
        message: "No orders found for this user",
      });
    }

    // Return the found orders
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  } finally {
    // Always disconnect the database connection in a finally block to ensure it closes
    await db.disconnectDb();
  }
});

export default router.handler();
