import { createRouter } from "next-connect";
import AquaOrder from "@/Backend/models/orders";
import db from "@/utils/db";
import sendEmail from "@/utils/emailTemplates/sendEmail";
import orderEmail from "@/utils/emailTemplates/orderEmail";
import AquaEcomUser from "@/Backend/models/user";

const router = createRouter();

router.post(async (req, res) => {
  console.log("Request Body:", req.body); // It's good to log incoming requests for debugging
  try {
    await db.connectDb(); // Make sure to await the database connection
    const cashOnOrder = new AquaOrder(req.body); // Create a new order instance
    const savedOrder = await cashOnOrder.save(); // Await the save operation
    const user = await AquaEcomUser.findById(req.body.user);
    if (!savedOrder) {
      return res
        .status(400)
        .json({ success: false, message: "Please try again" });
    }
    console.log(user.email);
    // Send email
    const emailContent = orderEmail(
      user.email,
      savedOrder.items,
      savedOrder.orderType,
      savedOrder.estimatedDelivery
    ); // This function should return the HTML content of the email
    const emailResult = await sendEmail({
      email: user.email,
      subject: `Thank You for Your Order!  - Aquakart`,
      message: "Happy Shopping",
      content: emailContent,
    });
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
