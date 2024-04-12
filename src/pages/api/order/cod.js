import { createRouter } from "next-connect";
import AquaOrder from "@/Backend/models/orders";
import db from "@/utils/db";

const router = createRouter();

router.post(async (req, res) => {
  try {
    db.connectDb();
    console.log("order", req.body);
    const cashOnOrder = new AquaOrder(req.boy).save();
    const savedOrder = await cashOnOrder.save();
    if (!savedOrder) {
      res.status(422).json({ success: false, message: "Please try again" });
    }
    res.status(200).json({ success: true, newOrder: cashOnOrder });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There is a problem on the server side, please try again later.",
    });
  }
});
export default router.handler();
