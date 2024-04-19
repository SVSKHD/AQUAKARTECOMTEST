import AquaEcomUser from "@/Backend/models/user"; 
import { createRouter } from "next-connect";
import bcrypt from "bcryptjs";
import db from "@/utils/db";
import jwt from "jsonwebtoken";

const router = createRouter();

router.post(async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();

  await db.connectDb();

  try {
    const userWithPassword = await AquaEcomUser.findOne({ email: normalizedEmail })
      .select("+password");

    if (!userWithPassword) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, userWithPassword.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: userWithPassword._id },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: process.env.NEXT_JWT_EXPIRES_IN }
    );

    const user = userWithPassword.toObject();
    delete user.password;

    res.status(200).json({ message: "User signed in successfully", user, token });
  } catch (error) {
    res.status(500).json({ message: "Error signing in", error: error.message });
  } finally {
    await db.disconnectDb();
  }
});

export default router.handler();
