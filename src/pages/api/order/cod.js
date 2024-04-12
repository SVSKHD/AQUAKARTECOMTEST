import nextConnect from "next-connect";
import AquaOrder from "@/Backend/models/orders";
import db from "@/utils/db";

const router = nextConnect();

router.post(async (req, res) => {
  try {
    db.connectDb();

    const cashOnOrder = await AquaOrder;
  } catch (error) {}
});
export default router.handler();
