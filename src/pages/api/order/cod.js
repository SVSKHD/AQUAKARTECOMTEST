import { createRouter } from "next-connect";
import AquaOrder from "@/Backend/models/orders";
import db from "@/utils/db";

const router = createRouter();

router.post(async (req, res) => {
  console.log("Request Body:", req.body); // It's good to log incoming requests for debugging
  try {
    await db.connectDb(); // Make sure to await the database connection
    const cashOnOrder = new AquaOrder(req.body); // Create a new order instance
    const savedOrder = await cashOnOrder.save(); // Await the save operation

    if (!savedOrder) {
      return res
        .status(400)
        .json({ success: false, message: "Please try again" });
    }
    res.status(200).json({ success: true, newOrder: savedOrder }); // Respond with the saved order
  } catch (error) {
    console.error("Server Error:", error); // Log the error to the server console
    res.status(500).json({
      success: false,
      message: "There is a problem on the server side, please try again later.",
      error: error.message, // It's helpful to send back a specific error message
    });
  }
});

export default router.handler();