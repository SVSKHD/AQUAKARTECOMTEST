import { createRouter } from "next-connect";
import AquaEcomUser from "@/Backend/models/user";
import AquaSubscribers from "@/Backend/models/subscribers";

const router = createRouter();

router.post(async (req, res) => {
  const { email } = req.body;
  const sanitizedUserEmail = email.toLowerCase(); // Removed extra semicolon
  try {
    const user = await AquaEcomUser.findOne({ email: sanitizedUserEmail }); // Changed to findOne and added await
    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }

    const Subscriber = new AquaSubscribers({ email: sanitizedUserEmail }); // Consistent email casing
    await Subscriber.save();
    res.status(200).json({ message: "Successfully subscribed" });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

export default router.handler();
