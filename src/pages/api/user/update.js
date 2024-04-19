import { createRouter } from "next-connect";
import db from "@/utils/db";
import AquaEcomUser from "@/Backend/models/user";

const router = createRouter();

router.put(async (req, res) => {
  await db.connectDb();

  const { id } = req.query;
  const {
    addresses,
    email,
    alternativeEmail,
    phoneNo,
    gstDetails,
    selectedAddress,
  } = req.body;
  try {
    const updated = await AquaEcomUser.findById(id);
    const updatedUser = await AquaEcomUser.findByIdAndUpdate(
      id,
      {
        $set: {
          addresses,
          email,
          alternativeEmail,
          phoneNo,
          gstDetails,
          selectedAddress,
        },
      },
      { new: true }, // Return the updated document
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: updatedUser });
    db.disconnectDb();
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    db.disconnectDb();
  }
});

export default router.handler();
