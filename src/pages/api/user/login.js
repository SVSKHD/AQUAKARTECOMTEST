import AquaEcomUser from "@/Backend/models/user"; // Adjust the path as necessary
import { createRouter } from "next-connect";
import db from "@/utils/db";
const jwt = require("jsonwebtoken");

const router = createRouter();

router.post(async (req, res) => {
  await db.connectDb();
  try {
    const { email, password } = req.body;

    // Check for presence of email and password
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Get user from DB
    const user = await AquaEcomUser.findOne({ email }).select("+password");

    // If user not found in DB
    if (!user) {
      return res.status(400).json({ message: "Email or password does not match or exist" });
    }

    // Match the password
    const isPasswordCorrect = await user.isValidatedPassword(password);

    // If password does not match
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Email or password does not match or exist" });
    }

    // If password matches, proceed to generate the JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: process.env.NEXT_JWT_EXPIRES_IN }
    );

    const sanitizedUser = user.toObject();
    delete sanitizedUser.password;

    res.status(200).json({ message: "User signed in successfully", sanitizedUser, token });
  } catch (error) {
    console.error("Error during sign in:", error);
    res.status(500).json({ message: "Error signing in", error: error.message });
  } finally {
    await db.disconnectDb();
  }
});

export default router.handler();
