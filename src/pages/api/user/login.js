import AquaEcomUser from "@/Backend/models/user"; // Adjust the path as necessary
import { createRouter } from "next-connect";
import bcrypt from "bcryptjs";
import db from "@/utils/db";
import jwt from "jsonwebtoken";

const router = createRouter();

router.post(async (req, res) => {
  const { email, password } = req.body;

  // Normalize the email address to handle case sensitivity
  const normalizedEmail = email.toLowerCase();

  await db.connectDb();

  try {
    // Find the user by normalized email and select the password field for comparison
    const userWithPassword = await AquaEcomUser.findOne({
      email: normalizedEmail,
    }).select("+password");
    if (!userWithPassword) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided password matches the hashed password
    const isMatch = await bcrypt.compare(password, userWithPassword.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: userWithPassword._id },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      {
        expiresIn: process.env.NEXT_JWT_EXPIRES_IN, // e.g., "1d" for 1 day
      },
    );

    // Exclude password from the user object before sending it in the response
    const user = userWithPassword.toObject();
    delete user.password;

    // Return the user object without the password and include the JWT token
    res
      .status(200)
      .json({ message: "User signed in successfully", user, token });
  } catch (error) {
    res.status(500).json({ message: "Error signing in", error: error.message });
  } finally {
    await db.disconnectDb();
  }
});

export default router.handler();
