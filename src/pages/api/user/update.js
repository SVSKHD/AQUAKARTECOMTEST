import { createRouter } from "next-connect";
import db from "@/utils/db";
import AquaEcomUser from "@/Backend/models/user";

const router = createRouter()

router.put(async (req, res) => {
    await db.connectDb()

    const { id } = req.query; // Get the user ID from the request query
    const { addresses, email, alternativeEmail, phoneNo , gstDetails} = req.body; // Destructure the fields you want to update from the request body
    console.log(id, req.body)
    try {
        const updated = await AquaEcomUser.findById(id)
        console.log("user", updated)
      // Find the user by ID and update the specified fields
      const updatedUser = await AquaEcomUser.findByIdAndUpdate(
        id,
        {
          $set: {
            addresses,
            email,
            alternativeEmail,
            phoneNo,
            gstDetails
          },
        },
        { new: true } // Return the updated document
      );

      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.status(200).json({ success: true, data: updatedUser });
      db.disconnectDb()
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
      db.disconnectDb()
    }
})


export default router.handler()